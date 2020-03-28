const hashPwd = require('../../commons/utils/hashPwd');

module.exports = {
  up: async queryInterface => {
    const users = ['job', 'daniel', 'tony', 'admin'];

    const hashPassword = await hashPwd.hash('123456789');

    const payload = users.map(item => ({
      fullName: item,
      username: item,
      hashPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert('Users', payload, {});
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
