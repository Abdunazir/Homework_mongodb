const { Router } = require("express");
const {
  addUser,
  getUsers,
  getUserById,
  deleteUserById,
  updateUserById,
  loginUser,
} = require("../controllers/user.controller");

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUserById);
router.put("/:id", updateUserById);
router.post("/", addUser);
router.post("/login", loginUser);

module.exports = router;
