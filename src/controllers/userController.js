const { isValid } = require("./vaild")

const cityModel = require("../models/cityModel")
const userModel = require("../models/userModel")
const { isValidObjectId } = require("mongoose")


const createUser = async function (req, res) {
    try {

        let data = req.body

        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, msg: "you have to provide user details(name,city mobile[optional],media_url[optional])" })
        }
        const { name, city, mobile, media_url } = data
        if (!isValid(name)) {
            return res.status(400).send({ status: false, msg: "you have to provide name" })
        }
        if (!/^[a-zA-Z]{2,}$/.test(name)) {
            return res.status(400).send({ status: false, msg: "please provide valid name,Name parameter should contain only Alphabets in upper/ small case" })
        }
        if (!isValid(city)) {
            return res.status(400).send({ status: false, msg: "you have to provide city" })
        }
        if (!/^[a-zA-Z]{2,}$/.test(city)) {
            return res.status(400).send({ status: false, msg: "City name should not allow numeric/ special characters" })
        }
        const cityData = await cityModel.findOne({ city })

        if (!cityData) {
            return res.status(404).send({ status: false, msg: "city is not present in our database" })
        }


        if (data.hasOwnProperty("mobile")) {
            if (!/^[0-9]{10,11}$/.test(mobile)) {
                return res.status(400).send({ status: false, msg: "please provide valid mobile no" })
            }
        }
        if (data.hasOwnProperty("media_url")) {
            if (!/^(https)[:]\/\/(www[.])?[a-zA-Z]{2,}(\.[a-z]{3,8})?\.[a-z]{3,8}$/.test(media_url)) {
                return res.status(400).send({ status: false, msg: "please provide valid media_url" })
            }
        }

        const userData = await userModel.create({ name, city: cityData._id, mobile, media_url })

        return res.status(201).send({ status: false, msg: "user created sucessfully", data: userData })



    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

const getUser = async function (req, res) {
    try {

        const allUser = await userModel.find()

        return res.status(200).send({ status: false, data: allUser })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }

}

const updateUser = async function (req, res) {
    try {

        const userId = req.params.userId
        if (userId === ":userId") return res.status(400).send({ status: false, msg: "userId is missing in the params" })

        if (!isValidObjectId(userId.toString())) return res.status(400).send({ status: false, msg: "userId is not in valid formet" })

        const existUser = await userModel.findById(userId)

        if (!existUser) return res.status(404).send({ status: false, msg: "user is not present in database" })

        let data = req.body
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "nothing to update, please provide city" })
        }
        const { name, city, mobile, media_url } = data

        const filter = {}

        if (data.hasOwnProperty("name")) {
            if (!/^[a-zA-Z]{2,}$/.test(name)) {
                return res.status(400).send({ status: false, msg: "please provide valid name" })
            }
            filter.name = name
        }
        if (data.hasOwnProperty("city")) {
            if (!/^[a-zA-Z]{2,}$/.test(city)) {
                return res.status(400).send({ status: false, msg: "please provide valid city" })
            }
            const cityData = await cityModel.findOne({ city })

            if (!cityData) {
                return res.status(404).send({ status: false, msg: "city is not present in our database" })
            }
            filter.city = cityData._id

        }
        if (data.hasOwnProperty("mobile")) {
            if (!/^[0-9]{10,11}$/.test(mobile)) {
                return res.status(400).send({ status: false, msg: "please provide valid mobile no" })
            }
            filter.mobile = mobile
        }
        if (data.hasOwnProperty("media_url")) {
            if (!/^(https)[:]\/\/(www[.])?[a-zA-Z]{2,}(\.[a-z]{3,8})?\.[a-z]{3,8}$/.test(media_url)) {
                return res.status(400).send({ status: false, msg: "please provide valid media_url" })
            }
            filter.media_url = media_url
        }

        const updatedUserData = await userModel.findByIdAndUpdate(userId, filter, { new: true })

        return res.status(200).send({ status: true, msg: "successfully updated", data: updatedUserData })


    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }

}



module.exports = { createUser, getUser, updateUser }