const db = require("mongoose");
const Schema = db.Schema;

const roomSchema = new Schema({
    code: { type: String, default: "" },
    chat: [{
        messageType: String,
        message: String
    }],
    maxPlayer: {},
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, {
    createAt: "createAt",
    updateAt: "updateAt"
});
roomSchema.index = { code: 1, createAt: 1, updateAt: 1 };
const Room = db.model("Room", roomSchema);
module.exports = Room;