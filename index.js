import { getDatabaseData, writeDatabaseJSON } from "./notion-data.js"

const membersQuery = {
  database_id: "958b2fb7926f4e78ac8284ae209b3794",
  filter: {
    property: 'name',
    rich_text: {
      is_not_empty: true
    }
  },
  filter: {
    property: 'birthday',
    date: {
      is_not_empty: true
    }
  },
}

const groupQuery = {
  database_id: "cebbb00f932d49eb93c1dfd323133706",
}

const roleQuery = {
  database_id: "022f14f316cc4877ab65186b3b0e4c4f",
}

const positionQuery = {
  database_id: "c7050adf0d37497b904013c4b921a54d",
}

const zodiacQuery = {
  database_id: "05a00ed241b54085bca41c0aea5efefc",
}

// writeDatabaseJSON(membersQuery, "members.json")
// writeDatabaseJSON(groupQuery, "groups.json")
// writeDatabaseJSON(roleQuery, "roles.json")
// writeDatabaseJSON(positionQuery, "positions.json")
// // writeDatabaseJSON(hyungQuery, "hyung.json")
// // writeDatabaseJSON(mbtiQuery, "mbti.json")
// // writeDatabaseJSON(bloodQuery, "blood.json")
// writeDatabaseJSON(zodiacQuery, "zodiac.json")