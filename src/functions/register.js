const db = require('../../db_users.json');

/*

Função responsável por registrar um novo usuário na dabatase
--Sintaxe: register;EMAIL;PASSWORD\n

Em que:
EMAIL: parâmetro do tipo string obrigatório indicando o nome de email do usuário;
PASSWORD: parâmetro do tipo string obrigatório indicando a senha do usuário;

*/

function registerUser(params) {
    let data = db;
    let newUserId = (data.users[data.users.length-1].idUser)+1;
    let newUser={
      idUser:newUserId,
      email:params[6],
      password: params[7].replace("\n",""),
      proposals:[],
      favorites:[]
    }
    data.users.push(newUser);
    let json = JSON.stringify(data,null, 2);
    var fs = require('fs');
    const noop = () => {};
    fs.writeFile('../db_users.json', json, 'utf8',noop);
    let result = db.users.filter(
      (obj) =>
        obj.idUser == newUserId
    );

    return result;
  }

module.exports = registerUser;
