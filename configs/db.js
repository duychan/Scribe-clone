const db = require("mongoose");

const connectDB = async() => {
    try {
        await db.connect("mongodb+srv://admin:pbl4@cluster0.rom1l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
        console.log("connected db..");
    } catch (error) {
        console.log("can't connect db !" + error.message);
    }
};
module.exports = {
    connectDB,
};