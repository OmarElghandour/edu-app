const {Category} = require("../schemas/index");
const {Session, UserSession} = require("../schemas");


/**
 * @returns {Promise<[]>}
 */
async function getAllCategories() {
  return await Category.findAll();
}

module.exports = {
  getAllCategories
}


