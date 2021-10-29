const db = require("../../db_us_estate.json");

function getHousesForSaleList() {
  var housesForSale = [];

  db.data.home_search.results.forEach(value => {
    if (value.status === 'for_sale') {
      housesForSale.push(value);
    }
  });
  return housesForSale;
}

module.export = getHousesForSaleList;