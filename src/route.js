const { createCity, getCity, updateCity } = require("./controllers/cityController")
const { createUser, getUser, updateUser } = require("./controllers/userController")

const route = require("express").Router()

//cityRoute

route.post("/city", createCity)
route.get("/city", getCity)
route.patch("/city/:cityId", updateCity)

//userRoute
route.post("/user", createUser)
route.get("/user", getUser)
route.patch("/user/:userId", updateUser)





module.exports = route