const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")
const verifyJWT = require("../middleware/verifyJWT")
// router.use(verifyJWT)
router.get("/", userController.getAllUser)
router.get("/:id", userController.getUserById)
router.put("/allRegisters", userController.allRegisters)
router.delete("/", userController.deleteUser)
router.put("/", userController.updateUser)
router.put("/addToShoppingCart", verifyJWT,userController.addToShoppingCart)
router.put("/addTovacationPackage",verifyJWT,userController.addToMyvacationPackage)
router.put("/deleteFromShoppingCart",verifyJWT, userController.deleteFromShoppingCart)
router.put("/deleteFromvacationPackaget",verifyJWT, userController.deleteFromvacationPackaget)
router.put("/keepMeUpdate", verifyJWT,userController.keepMeUpdate)
router.post("/sendEmailTamar", verifyJWT,userController.sendEmailTamar)
router.post("/AddQuestionToTamar", verifyJWT,userController.AddQuestionToTamar)
module.exports = router