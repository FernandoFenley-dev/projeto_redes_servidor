const db = require('../../db_us_estate.json');


/*
  Essa função implementa a seguinte mensagem:
  --Sintaxe: house_details;HOUSE_ID\n
  
  Função responsável por retornar os dados de uma propriedade de acordo com o seu identificador
*/

function getHouseDetail(property_id) {
  return db.data.home_search.results.find(
    (obj) => obj.property_id === property_id
  );
}

module.exports = getHouseDetail;
