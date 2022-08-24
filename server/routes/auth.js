const { route } = require("./user")


const router = require("express").Router()


router.get("/auth",require("../controllers/auth"))



module.exports=router