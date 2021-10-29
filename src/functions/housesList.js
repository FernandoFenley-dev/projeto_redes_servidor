const db = require('../../db_us_estate.json');

function getHousesList() {
  return db.data.home_search.results;
}

module.exports = getHousesList;
