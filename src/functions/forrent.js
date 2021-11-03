const db = require('../../db_us_estate.json');
const dbUsers = require('../../db_users.json');


function getHousesForRentList(params) {
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAA");
  console.log(...params);

  let result = db.data.home_search.results.filter(
    (obj) =>
      obj.status === 'for_rent' &&
       obj.list_price_min >= Number(params[1]) &&
       obj.list_price_max <= Number(params[2])
  );

  console.log('Preço das casas', result.length);

  // quartos
  if (Number(params[3]) === 0) {
    result = result.filter((obj) => obj.description.beds_max >= 0);
  } else {
    result = result.filter((obj) => obj.description.beds_max == Number(params[3]));
  }

  console.log('Qtde quartos', result.length);

  // banheiros
  if (Number(params[4]) === 0) {
    result = result.filter((obj) => obj.description.baths_max >= 0);
  } else {
    result = result.filter(
      (obj) => obj.description.baths_max == Number(params[4])
    );
  }

  console.log('Qtdes banheiros', result.length);

    // garagem
    if (Number(params[5]) === 0) {
      result = result.filter((obj) => obj.description.garage_max >= 0);
    } else {
      result = result.filter(
        (obj) => obj.description.garage_max == Number(params[5])
      );
    }
  
    console.log('garagem casas', result.length);

   
    if(Number(params[8]) > 0){
      let index=0;
      console.log("IDUSER: "+params[8]);
      for (var i = 0; i < dbUsers.users.length; ++i) {
        if (dbUsers.users[i].idUser == Number(params[8])) {
          console.log("iduser: "+dbUsers.users[i].idUser);
          index=i;
        }
      }
      let proposals=dbUsers.users[index].proposals;
      let array=[];
      for (var i = 0; i < proposals.length; ++i) {
        array.push(proposals[i].propertyId);
      }      
      console.log("ARRAY::::::");
      console.log(array);
      console.log(result.length);
      result = result.filter(
        (obj) => array.includes(obj.property_id));
      console.log(result);


    }

  return result;
}

module.exports = getHousesForRentList;
