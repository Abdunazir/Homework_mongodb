const { Router } = require("express");
const { loginUser } = require("../controllers/user.controller");

const router = Router();

router.post("/", loginUser);

module.exports = router;
