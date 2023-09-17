const router = require("express").Router();
const crypto = require('crypto');

const { User } = require('../models/index.js');

router.get("/users", async (req, res) => {
    const users = await User.findAll();
    res.status(200).json({
        ok: true,
        body: users,
    });
});

router.get("/users/:user_id", async (req, res) => {
    const id = req.params.user_id;
    const users = await User.findOne({
        where: {
            user_id: id,
        },
    });

    const message = users === null ? "User not found" : "User found";

    res.status(200).json({
        body: users,
        ok: true,
        message: message
    });
});

router.post("/users", async (req, res) => {
    const body = req.body;
    const user = {
         user_id: crypto.randomUUID(),
         name: body.name,
         user_name: body.user_name,
         birthday_date: body.birthday_date,
     }
    const users = await User.create(user);

    res.status(201).json({
        message: "Yeah, Created User",
        ok: users,
        body: users
    });
});

router.put("/users/:user_id", async (req, res) => {
    const id = req.params.user_id;
    const body = req.body;
    const userUpdate = await User.update(
        {
            name: body.name,
            user_name: body.user_name,
            birthday_date: body.birthday_date,
        },
        {
            where: {
                user_id: id,
            },
        }
    );
    res.status(200).json({
        status: userUpdate,
        body: userUpdate,
        ok: true,
    });
});

router.delete("/users/:user_id", async (req, res) => {
    const id = req.params.user_id;
    try {
        const userDelete = await User.destroy({
            where: {
                user_id: id,
            },
        });
        if (userDelete) {

            res.status(204).send();
        } else {
            res.status(404).json({
                error: "User not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
});

module.exports = router;