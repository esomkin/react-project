module.exports = {

    up: (queryInterface, Sequelize) => {

        return queryInterface.createTable('category', {

            id: {

                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER

            }, text: { 
              
                type: Sequelize.STRING

            }, position: {

                type: Sequelize.INTEGER

            }, display: {

                type: Sequelize.INTEGER(1)
            }
        })
    },
    down: (queryInterface, Sequelize) => {

        return queryInterface.dropTable('category')
    }
}