//const mongoose = require("mongoose");
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

// let convo
// export default class Conversation{
//   static async injectDB(conn) {
//     if (items) {
//         return
//     }
//     try {
//         convo = await conn.db(process.env.USERINFO_NS).collection("conversations")
//     } catch (e) {
//         console.error(
//             `Unable to establish a collection handle in itemshopDAO: ${e}`,
//         )
//     }
//   }

// }
 
const ConversationSchema = new mongodb.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
  );

module.exports.default = mongodb.model("Conversation", ConversationSchema);
