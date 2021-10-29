const db = require('../../db_us_estate.json');

function getHouseDetail(property_id) {
  return db.data.home_search.results.find(
    (obj) => obj.property_id === property_id
  );
}

module.exports = getHouseDetail;
