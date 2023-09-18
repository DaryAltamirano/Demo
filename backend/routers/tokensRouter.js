const router = require("express").Router();
const { Sequelize } = require("sequelize");

const { Token } = require('../models/index.js');

router.get("/tokens/:user_id", async (req, res) => {
    const id = req.params.user_id;

    const tokens = await Token.findAll({
        where: {
            user_id: id,
        },
    });

    const message = tokens === null ? "Tokens not found" : "Tokens found";

    res.status(200).json({
        body: tokens,
        ok: true,
        message: message
    });
});

router.get("/Auth/:user_id/:token", async (req, res) => {
    const user_id = req.params.user_id;
    const token = req.params.token;

    const tokens = await Token.findOne({
        where: {
            user_id,
            token,
            used: false,
            expirate_AT: {
                [Sequelize.Op.gte]: new Date(),
            },
        },
    });

    const ok = tokens === null
    
    if (!ok) {
        Token.update(
            {
                used: true,
            },
            {
                where: {
                    token_id: tokens.token_id,
                },
            }
        );
    }
    const message = ok ? "Token No Valid" : "Token Valid";

    res.status(200).json({
        ok: !ok,
        message: message
    });
});

module.exports = router;