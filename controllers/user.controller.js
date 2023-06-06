const { errorHandler } = require("../helpers/error_handler");
const User = require("../models/user");

const addUser = async (req, res) => {
  try {
    //AddUser
    const { name, email, password } = req.body;
    if (name == "" || email == "" || password == "") {
      return res.status(400).send({ message: "Ma'lumotlarni to'liq yuboring" });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).send({ message: "Bunday email mavjud" });
    }
    const newUser = await User({
      name: name,
      email: email,
      password: password,
    });
    await newUser.save();
    res.status(200).send({ message: "Foydalanuvchi qo'shildi" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getUsers = async (req, res) => {
  try {
    //getUsers
    const users = await User.find({});
    if (!users) {
      return res.status(400).send({ message: "Foydalanuvchilar topilmadi" });
    }
    res.json({ users });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getUserById = async (req, res) => {
  try {
    //getUserById
    // const {id} = req.params.id
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).send({ message: "Foydalanuvchilar topilmadi" });
    }
    res.json({ user });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const user = await User.deleteOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).send({ message: "Foydalanuvchilar topilmadi" });
    }
    res.json({ message: "successfully deleted" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateUserById = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.updateOne(
      { _id: req.params.id },
      { name: name, email: email, password: password }
    );
    if (user.modifiedCount == 0) {
      return res.status(400).send({ message: "user yangilanib bo'lgan" });
    }
    res.status(200).send({ message: "successfully updated" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const loginUser = async (req, res) => {
  try {
    //loginUser
    const { email, password } = req.body;
    const user = await User.findOne({ $and: [{ email }, { password }] });
    if (!user) {
      res
        .status(404)
        .send({ message: " Try again Wrong password or email :(" });
    } else {
      res.status(200).send({ message: "Logged in" });
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  addUser,
  getUserById,
  getUsers,
  loginUser,
  deleteUserById,
  updateUserById,
};
