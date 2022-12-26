
const mongoose = require("mongoose")

const ObjectID = mongoose.Schema.Types.ObjectId

const userSchema = new mongoose.Schema(
    {
        name: {

            type: String,
            required: true,
            trim: true

        },
        city: {
            type: ObjectID,
            ref: "city"
        },
        mobile: {
            type: Number

        },
        media_url: {
            type: String
        }
    
    }, { timestamps: true }
)

module.exports = mongoose.model("user", userSchema);