module.exports = (sequelize, Sequelize) => {

    const User = sequelize.define("user", {

        name: {
            type: Sequelize.STRING(100)
        },
        username: {
            type: Sequelize.STRING(100)
        },
        birthday_date: {
            type: Sequelize.DATE
        }
    });
    return User;
};