const db = require('../../db_users.json');

/*

Função responsável por implementar a mensagem de registro de uma proposta de compra ou aluguel para uma propriedade
--Sintaxe: PRICE_MIN;IDUSER;PROPERTYID\n

Em que:
PRICE_MIN: parâmetro do tipo string obrigatório indicando o preço da proposta;
IDUSER: parâmetro do tipo string obrigatório indicando a o id do usuário em que essa proposta será feita.
PROPERTYID: parâmetro do tipo string obrigatório indicando o Id da propriedade para qual será feita a proposta;

*/

function proposal(params) {
  let data = db;

  let index = 0;

  for (var i = 0; i < data.users.length; ++i) {
    if (data.users[i].idUser == Number(params[8])) {

      index = i;
    }
  }

  let newProposal = {
    propertyId: params[9].replace("\n", ""),
    price: params[1]
  }

  data.users[index].proposals.push(newProposal)
  let json = JSON.stringify(data, null, 2);
  var fs = require('fs');
  const noop = () => { };
  fs.writeFile('../db_users.json', json, 'utf8', noop);
  return newProposal;
}

module.exports = proposal;
