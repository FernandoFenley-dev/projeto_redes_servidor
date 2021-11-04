const db = require("../../db_us_estate.json");

/*

Função responsável por implementar a seguinte mensagem:
--Sintaxe: locations_list\n

Mensagem de requisição para envio da localização de todas as propriedades da base de dados, independente de filtros.

*/

function getLocationsList() {
  var locations = [];

  db.data.home_search.results.forEach((obj) => {
    if (obj.location != null) {
      let full_location =
        obj.location.address.city +
        ', ' +
        obj.location.address.state;
      locations.push(full_location);
    }
  });
  return Array.from(new Set(locations));
}

module.exports = getLocationsList;