const mongoose = require("mongoose")

const citySchema = new mongoose.Schema(
    {
        city: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        }
    }, { timestamps: true }

)

module.exports = mongoose.model("city", citySchema);