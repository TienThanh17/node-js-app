const express = require("express");
const accountModel = require("./model/account");

const router = express.Router();

const checkUserExist = (req, res, next) => {
  accountModel
    .findOne({
      username: req.body.username,
    })
    .then((data) => {
      if (data) res.status(400).json("da ton tai");
      else next();
    });
};

router.post("/register", checkUserExist, (req, res) => {
  accountModel
    .create({
      username: req.body.username,
      password: req.body.password,
    })
    .then((data) => res.json("tao thanh cong"))
    .catch((err) => res.status(500));
});

router.post("/login", (req, res) => {
  accountModel
    .findOne({
      username: req.body.username,
      password: req.body.password,
    })
    .then((data) => {
      if (data) res.json("login thanh cong");
      else res.status(400).json("login that bai");
    })
    .catch((err) => res.status(500).json("loi ben server"));
});

router.get("/", (req, res) => {
  accountModel
    .find({})
    .then((data) => {
      if (data) res.json(data);
    })
    .catch((err) => res.status(500).json("loi ben server"));
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const newPassword = req.body.newPassword;

  accountModel
    .findByIdAndUpdate(id, {
      password: newPassword,
    })
    .then((data) => {
      res.json("update thanh cong")
    })
    .catch((err) => res.status(500).json("loi ben server"));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  accountModel
    .findByIdAndDelete(id)
    .then((data) => {
      res.json("delete thanh cong")
    })
    .catch((err) => res.status(500).json("loi ben server"));
});

module.exports = router;
