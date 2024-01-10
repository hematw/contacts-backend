const { Router } = require("express");
const {registerUser, loginUser, currentUser} = require("../controllers/userController");
const validateTokenHandler = require("../middlewares/validateTokenHandler");


const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateTokenHandler, currentUser);


module.exports = router;