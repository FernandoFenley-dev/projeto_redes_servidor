const db = require('../../db_us_estate.json');

function getHousesForRentList(params) {
  let result = db.data.home_search.results.filter(
    (obj) =>
      obj.status === 'for_rent' &&
       obj.list_price_min >= Number(params[1]) &&
       obj.list_price_max <= Number(params[2])
  );

  console.log('Preço das casas', result.length);

  // quartos
  if (Number(params[3]) === 0) {
    result = result.filter((obj) => obj.description.beds >= 0);
  } else {
    result = result.filter((obj) => obj.description.beds <= Number(params[3]));
  }

  console.log('Qtde quartos', result.length);

  // banheiros
  if (Number(params[4]) === 0) {
    result = result.filter((obj) => obj.description.baths >= 0);
  } else {
    result = result.filter(
      (obj) => obj.description.baths <= Number(params[4])
    );
  }

  console.log('Qtdes banheiros', result.length);

  // garagem
  if (Number(params[5]) === 0) {
    result = result.filter((obj) => obj.description.garage >= 0);
  } else {
    result = result.filter(
      (obj) => obj.description.garage <= Number(params[5])
    );
  }

  console.log('Qtde vagas carro', result.length);

  return result;
}

module.exports = getHousesForRentList;
