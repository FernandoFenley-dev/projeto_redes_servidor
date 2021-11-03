const db = require("../../db_us_estate.json");

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