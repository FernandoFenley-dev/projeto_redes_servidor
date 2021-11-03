const db = require('../../db_users.json');
function getUser(params) {
  let result = db.users.filter(
    (obj) =>
      obj.email == params[6] &&
      obj.password == params[7].replace("\n","")
  );
  console.log('USER', result);
  return result;
}


module.exports = getUser;
