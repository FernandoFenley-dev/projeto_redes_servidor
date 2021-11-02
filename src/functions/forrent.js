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


  return result;
}

module.exports = getHousesForRentList;
