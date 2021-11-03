const db = require('../../db_users.json');

function registerUser(params) {
    let data = db;
    let newUserId = (data.users[data.users.length-1].idUser)+1;
    console.log(...params);
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
    console.log('USERs  ', json);
    return newUser;
  }

module.exports = registerUser;
