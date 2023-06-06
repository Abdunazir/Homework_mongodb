const { Router } = require("express");

const userRouter = require("./user.routes");

const router = Router();

router.use("/api/user", userRouter);
router.use("/api/login", require("./login.routes"));

module.exports = router;
