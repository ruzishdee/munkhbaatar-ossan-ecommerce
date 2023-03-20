
const { response } = require('express');
const express = require('express');
const ProductCategory = require('../models/productCategory');

const Router = express.Router()

Router.get('/categories', (request, response) => {
    const categories = ProductCategory({})

    response.status(200).send({ data: [] })
})

Router.post('/categories/add', async (request, response) => {
    const body = request.body;
    console.log(body);
    const category = new ProductCategory();
    category.product_category_name = body.categoryName;
    category.product_category_description = body.categoryDescription;

    const savedCategory = await category.save()
    response.status(200).send({ data: savedCategory })
})
module.exports = Router;