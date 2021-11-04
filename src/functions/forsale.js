const db = require('../../db_us_estate.json');

/*
  Essa função implementa a seguinte mensagem:
  for_sale;PRICE_MIN;PRICE_MAX;BEDS;BATHS;GARAGES\n

  Função responsável por filtrar as propriedade disponíveis para venda
  de acordo com os filtros realizados pelo usuário na aplicação:
  --preço mínimo e máximo de aluguel: PRICE_MIN e PRICE_MAX
  --quantidade mínima de quartos: BEDS
  --quantidade mínima de banheiros: BATHS
  --quantidade mínima de vagas de garagens: GARAGES

  Retorna uma lista de casas filtradas de acordo com os critérios do usuário
*/
function getHousesForSaleList(params) {
  let result = db.data.home_search.results.filter(
    (obj) =>
      obj.status === 'for_sale' &&
      obj.list_price >= Number(params[1]) &&
      obj.list_price <= Number(params[2])
  );

  // quartos
  if (Number(params[3]) === 0) {
    result = result.filter((obj) => obj.description.beds >= 0);
  } else {
    result = result.filter((obj) => obj.description.beds <= Number(params[3]));
  }

  // banheiros
  if (Number(params[4]) === 0) {
    result = result.filter((obj) => obj.description.baths >= 0);
  } else {
    result = result.filter(
      (obj) => obj.description.baths <= Number(params[4])
    );
  }

  // garagem
  if (Number(params[5]) === 0) {
    result = result.filter((obj) => obj.description.garage >= 0);
  } else {
    result = result.filter(
      (obj) => obj.description.garage <= Number(params[5])
    );
  }

  return result;
}

module.exports = getHousesForSaleList;
