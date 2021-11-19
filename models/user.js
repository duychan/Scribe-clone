// package
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// structure or schema
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        default: "",
    },
    avatar: {
        type: String,
        default: ""
    },
    UIColor: {
        type: String,
        default: "green"
    },

}, {
    createdAt: "createdAT",
    updateAt: "updateAt"
});

//expose function

userSchema.index = ({
    email: 1,
    createdAt: 1,
    updateAt: 1
});
// export
const User = mongoose.model("User", userSchema);
module.exports = {
    User,
};