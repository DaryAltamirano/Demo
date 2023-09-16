const router = require("express").Router();

const { User, Token } = require('../models/index.js');

router.get("/users", async (req, res) => {
    const users = await User.findAll();
    res.status(200).json({
        ok: true,
        status: 200,
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
    res.status(200).json({
        ok: true,
        status: 200,
        body: users,
    });
});

router.post("/users", async (req, res) => {
    const body = req.body;

    const users = await User.create({
        name: body.name,
        user_name: body.user_name,
        birthday_date: body.birthday_date,
    });
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Yeah, Created User",
    });
});

router.put("/users/:user_id", async (req, res) => {
    const id = req.params.user_id;
    const body= req.body;
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
        ok: true,
        status: 200,
        body: userUpdate,
    });
});

router.delete("/users/:user_id", async (req, res) => {
    const id = req.params.user_id;
    const userDelete = await User.destroy({
        where: {
            user_id: id,
        },
    });
    res.status(200).json({
        ok: true,
        status: 204,
        body: userDelete,
    });
});

module.exports = router;