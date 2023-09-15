module.exports = (sequelize, Sequelize) => {

    const Token = sequelize.define("token", {

        token: {
            type: Sequelize.INTEGER(8)
        },
        expirate_AT: {
            type: Sequelize.DATE
        },
        created_AT: {
            type: Sequelize.DATE
        },
        duration: {
            type: Sequelize.SMALLINT
        }
    });
    return Token;
};