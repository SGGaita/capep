module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('capep_sys_users', {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        userName: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING,
        },
        image: {
            type: Sequelize.STRING
        },
        phone_number: {
            type: Sequelize.STRING,
            allowNull: true
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: true
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    });

    return User;
}