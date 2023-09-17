const router = require("express").Router();

const { Token } = require('../models/index.js');

router.get("/tokens/:user_id", async (req, res) => {
    const users = await User.findAll();
    res.status(200).json({
        ok: true,
        body: users,
    });
});