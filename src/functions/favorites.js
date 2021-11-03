const db = require('../../db_users.json');

function favorites(params) {
    console.log("AAAAAAAAAAAA");
    let data = db;
    //var index = data.findIndex(obj => obj.idUser==1);
    let index=0;
    for (var i = 0; i < data.users.length; ++i) {
      if (data.users[i].idUser == Number(params[8])) {
        console.log("iduser: "+data.users[i].idUser);
        index=i;
      }
    }
    console.log("OOO INDEX: "+index);

    //console.log("o INDEX DO USER É : " + index);
    //console.log("o PROPOSAL DO USER É : " + data.users[index].proposals);

    let newFavorite={
      propertyId: params[9].replace("\n",""),
    }

    data.users[index].favorites.push(newFavorite)
    let json = JSON.stringify(data,null, 2);
    var fs = require('fs');
    const noop = () => {};
    fs.writeFile('../db_users.json', json, 'utf8',noop);
    console.log('USERs  ', json);
    return newFavorite;
  }


  
module.exports = favorites;
