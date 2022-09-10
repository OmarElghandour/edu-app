const categoryModel = require("../models/category.model");

async function getAllCategories (request, response) {
 const res = await categoryModel.getAllCategories();
 return response.send(res);
}

module.exports = {
  getAllCategories
}