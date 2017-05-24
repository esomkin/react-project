module.exports = {

    up: (queryInterface, Sequelize) => {

        /*
        Add altering commands here.
        Return a promise to correctly handle asynchronicity.
        */

        let data = []

        for (let i = 1, count = 50; i <= count; i ++) {

            data.push({

                text: 'category item ' + i,
                position: i,
                display: 1
            })
        }

        return queryInterface.bulkInsert('category', data, {});
    },
    down: (queryInterface, Sequelize) => {

        /*
        Add reverting commands here.
        Return a promise to correctly handle asynchronicity.
        */

        return queryInterface.bulkDelete('category', null, {});
    }
}