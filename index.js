import { Client } from "@notionhq/client"
import { writeFile, write } from 'node:fs';

const notion = new Client({ auth: process.env.NOTION_KEY })

async function getMemberData(pageId) {
  const page = await notion.pages.retrieve({ page_id: pageId });
  // console.log(page);
  let attributes = {}
  for await (const [propertyName, propertyValue] of Object.entries(page.properties)) {
    switch (propertyValue.type) {
      case "select":
        attributes[propertyName] = propertyValue.select ? propertyValue.select.name : null
        break;
      case "date":
        attributes[propertyName] = propertyValue.date.start
        break;
      case "rich_text":
        attributes[propertyName] = propertyValue.rich_text[0].plain_text
        break;
      case "title":
        attributes[propertyName] = propertyValue.title[0].plain_text
        break;
      case "number":
        attributes[propertyName] = propertyValue.number
        break;
      default:
        const relationPageIds = propertyValue.relation.map((x) => x.id)
        // console.log(relationPageIds)
        let relations = []
        for await (const x of relationPageIds) {
          const propertyName = await notion.pages.properties.retrieve({ page_id: x, property_id: "title" });
          relations.push(propertyName.results[0].title.plain_text)
        };
        attributes[propertyName] = relations
    }
  };
  return attributes
}

async function getMembers() {

  const memberDatabaseId = 'ef165c7570454c178e1490e4753db782';
  const memberDatabase = await notion.databases.query({
    database_id: memberDatabaseId,
    filter: {
      property: 'name',
      rich_text: {
        equals: 'Doyoung'
      }
    }
  });

  let membersJSON = {}
  for await (const page of memberDatabase.results) {
    const member = await getMemberData(page.id)
    // console.log(member)
    membersJSON[page.id] = member
  };
  return membersJSON
};

const membersWrite = getMembers();
membersWrite.then((data) => {
  console.log(data);
  writeFile('members.json', JSON.stringify(data, null, 2), (error) => {
    if (error) {
      console.log('An error has occurred ', error);
      return;
    }
    console.log('Data written successfully to disk');
  });
});

