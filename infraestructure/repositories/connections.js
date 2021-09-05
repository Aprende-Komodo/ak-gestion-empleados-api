const db = require('knex')({
    client: 'mysql',
    connection: {
      host : 'compania.c3bnfogag1zx.us-east-1.rds.amazonaws.com',
      port : 3306,
      user : 'admin_dev',
      password : '12345678*',
      database : 'empleados_dev'
    }
  });

module.exports = {
    db
};