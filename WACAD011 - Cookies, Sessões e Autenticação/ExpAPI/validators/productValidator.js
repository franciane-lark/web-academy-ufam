const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    'string.min': 'O nome do produto deve ter pelo menos {#limit} caracteres.',
    'any.required': 'O campo nome é obrigatório.'
  }),
  price: Joi.number().positive().required().messages({
    'number.positive': 'O preço deve ser um valor maior que zero.',
    'any.required': 'O campo preço é obrigatório.'
  }),
  stockQuantity: Joi.number().integer().min(0).required().messages({
    'number.integer': 'O estoque precisa ser um número inteiro.',
    'any.required': 'O campo stockQuantity é obrigatório.'
  }),
});

const updateProductSchema = productSchema.fork(['name', 'price', 'stockQuantity'], (field) => field.optional());

module.exports = {
  productSchema,
  updateProductSchema
};