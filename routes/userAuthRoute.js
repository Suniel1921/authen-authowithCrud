const express = require ("express");
const router = express.Router();
const controller = require ("../controller/userAuthController");
const { requireLoggedIn, isAdmin } = require("../middleware/userAuthMiddleware");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/verifyOTP", controller.verifyOTP);


router.get("/test", requireLoggedIn, controller.test);
router.get("/isAdmin",requireLoggedIn, isAdmin, controller.isAdmin);


router.get('/user-auth', requireLoggedIn,(req ,res)=>{
    res.status(200).send({ok: true})
})


module.exports = router;