module.exports = (sequelize, DataTypes) => {

    return sequelize.define('category', {

        text: DataTypes.STRING,
        position: DataTypes.INTEGER,
        display: DataTypes.INTEGER

    }, {

        timestamps: false,
        underscored: true,
        freezeTableName: true,
        classMethods: {

            associate: (models) => {

            }
        }
    })
}