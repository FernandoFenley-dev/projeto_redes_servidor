const db = require('../../db_us_estate.json');

/*

Função responsável por implementar a seguinte mensagem
--Sintaxe: properties_list\n

Mensagem de requisição para envio dos dados de todas as propriedades da base de dados, independente de filtros.

*/

function getHousesList() {
  return db.data.home_search.results;
}

module.exports = getHousesList;
