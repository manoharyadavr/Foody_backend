const firmController = require("../controllers/FirmController")
const express = require("express")
const verifyToken = require("../middlewares/verifyTokens")

const router = express.Router()

router.post("/addfirm", verifyToken, firmController.addFirm)
router.get("/uploads/:imageName", (req, res)=>{
    const imageName = req.params.imageName

    req.headersSent("Content-Type", "image/jpeg")

    res.sendFile(path.join(__dirname, "..", "uploads", imageName))
})

router.delete("/:firmId", firmController.deleteFirmById)

module.exports = router