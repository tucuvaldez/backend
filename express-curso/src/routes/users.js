const { Router } = require("express");

const router = Router();

router.get("/UserName", (req, res) => {
  res.send("Username route");
});

router.get("/profile", (req, res) => {
  res.send("profile page");
});

module.exports = router;
