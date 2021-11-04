const db = require('../../db_users.json');

function favorites(params) {
    
    let data = db;
    
    let index=0;
    for (var i = 0; i < data.users.length; ++i) {
      if (data.users[i].idUser == Number(params[8])) {
        index=i;
      }
    }
    
    let newFavorite={
      propertyId: params[9].replace("\n",""),
    }

    data.users[index].favorites.push(newFavorite)
    let json = JSON.stringify(data,null, 2);
    var fs = require('fs');
    const noop = () => {};
    fs.writeFile('../db_users.json', json, 'utf8',noop);
    return newFavorite;
  }

module.exports = favorites;
