
const cityModel = require("../models/cityModel")
const {isValidObjectId}= require("mongoose")



const createCity = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "you have to provide city" })
        }
        const { city } = data

        if (!city) {
            return res.status(400).send({ status: false, msg: "you have to provide city" })
        }
        if (!/^[a-zA-Z]{2,}$/.test(city)) {
            return res.status(400).send({ status: false, msg: "City name should not allow numeric/ special characters" })
        }
        const uniqueCity = await cityModel.findOne({ city })

        if (uniqueCity) {
            return res.status(400).send({ status: false, msg: "city is already present in our database" })
        }

        const cityData = await cityModel.create({ city })

        return res.status(201).send({ status: false, msg: "city created sucessfully", data: cityData })




    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }

}

const getCity = async function (req, res) {
    try {

        const allCity = await cityModel.find()
        return res.status(200).send({ status: true, data: allCity })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }

}

const updateCity = async function (req, res) {
    try {
        const cityId = req.params.cityId
        if (cityId === ":cityId") return res.status(400).send({ status: false, msg: "cityId is missing in the params" })

        if (!isValidObjectId(cityId.toString())) return res.status(400).send({ status: false, msg: "cityId is not in valid formet" })

        const existCity = await cityModel.findById(cityId)

        if (!existCity) return res.status(404).send({ status: false, msg: "city is not present in database" })


        let data = req.body
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, msg: "nothing to update, please provide city" })
        }
        const { city } = data

        if (!city) {
            return res.status(400).send({ status: false, msg: "you have to provide city name to update" })
        }
        if (!/^[a-zA-Z]{2,}$/.test(city)) {
            return res.status(400).send({ status: false, msg: "City name should not allow numeric/ special characters" })
        }

        if (existCity.city === city) return res.status(400).send({ status: false, msg: "city name same as before, please provide different city name" })

        const uniqueCity = await cityModel.findOne({ city })

        if (uniqueCity) {
            return res.status(400).send({ status: false, msg: "city is already present in our database" })
        }

        const updatedCity = await cityModel.findByIdAndUpdate(cityId, { city }, { new: true })

        return res.status(200).send({ status: true, msg: " city is updated", data: updatedCity })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }

}

module.exports = { createCity, getCity, updateCity }