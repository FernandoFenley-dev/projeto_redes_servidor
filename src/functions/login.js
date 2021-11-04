const db = require('../../db_users.json');

/*

Função responsável por implementar a mensagem para efetuar o login do usuário no aplicativo
--EMAIL;PASSWORD\n

Em que:
EMAIL: parâmetro do tipo string obrigatório indicando o nome de email do usuário;
PASSWORD: parâmetro do tipo string obrigatório indicando a senha do usuário;

*/
function getUser(params) {
  let result = db.users.filter(
    (obj) =>
      obj.email == params[6] &&
      obj.password == params[7].replace("\n", "")
  );
  return result;
}


module.exports = getUser;
