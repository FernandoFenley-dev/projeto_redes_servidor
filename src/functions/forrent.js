const db = require('../../db_us_estate.json');
const dbUsers = require('../../db_users.json');

/*

  Essa função implementa a seguinte mensagem:
  for_rent;PRICE_MIN;PRICE_MAX;BEDS;BATHS;GARAGES\n

  Função responsável por filtrar as propriedade disponíveis para aluguel
  de acordo com os filtros realizados pelo usuário na aplicação:
  --preço mínimo e máximo de aluguel: PRICE_MIN e PRICE_MAX
  --quantidade mínima de quartos: BEDS
  --quantidade mínima de banheiros: BATHS
  --quantidade mínima de vagas de garagens: GARAGES

  Retorna uma lista de casas filtradas de acordo com os critérios do usuário
*/
function getHousesForRentList(params) {

  let result = db.data.home_search.results.filter(
    (obj) =>
      obj.status === 'for_rent' &&
      obj.list_price_min >= Number(params[1]) &&
      obj.list_price_max <= Number(params[2])
  );

  // quartos
  if (Number(params[3]) === 0) {
    result = result.filter((obj) => obj.description.beds_max >= 0);
  } else {
    result = result.filter((obj) => obj.description.beds_max == Number(params[3]));
  }

  // banheiros
  if (Number(params[4]) === 0) {
    result = result.filter((obj) => obj.description.baths_max >= 0);
  } else {
    result = result.filter(
      (obj) => obj.description.baths_max == Number(params[4])
    );
  }

  // garagem
  if (Number(params[5]) === 0) {
    result = result.filter((obj) => obj.description.garage_max >= 0);
  } else {
    result = result.filter(
      (obj) => obj.description.garage_max == Number(params[5])
    );
  }

  if (String(params[9]).length < 8) {

    if (Number(params[8]) > 0) {
      let index = 0;
      for (var i = 0; i < dbUsers.users.length; ++i) {
        if (dbUsers.users[i].idUser == Number(params[8])) {
          index = i;
        }
      }
      let proposals = dbUsers.users[index].favorites;
      let array = [];
      for (var i = 0; i < proposals.length; ++i) {
        array.push(proposals[i].propertyId);
      }

      result = result.filter(
        (obj) => array.includes(obj.property_id));
    }


  } else {
    if (Number(params[8]) > 0) {
      let index = 0;
      for (var i = 0; i < dbUsers.users.length; ++i) {
        if (dbUsers.users[i].idUser == Number(params[8])) {
          index = i;
        }
      }
      let proposals = dbUsers.users[index].proposals;
      let array = [];
      for (var i = 0; i < proposals.length; ++i) {
        array.push(proposals[i].propertyId);
      }
      result = result.filter(
        (obj) => array.includes(obj.property_id));
    }
  }
  return result;
}

module.exports = getHousesForRentList;
