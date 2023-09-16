const express = require("express");
const router = express.Router();

router.use("/user",require("./user/user-routes"))
router.use("/task",require("./task/task-routes"))

module.exports =router;