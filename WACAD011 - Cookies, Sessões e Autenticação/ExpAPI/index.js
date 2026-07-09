require('dotenv').config();
const express = require('express');
const productController = require('./controllers/productController');

const validate = require('./middlewares/validate');
const { productSchema, updateProductSchema } = require('./validators/productValidator');

const app = express();
app.use(express.json());

app.get('/products', productController.index);
app.get('/products/:id', productController.read);
app.delete('/products/:id', productController.delete);require('dotenv').config();
const express = require('express');
const productController = require('./controllers/productController');

const app = express();
app.use(express.json());

app.get('/products', productController.index);
app.post('/products', productController.create);
app.get('/products/:id', productController.read);
app.put('/products/:id', productController.update);
app.delete('/products/:id', productController.delete);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.post('/products', validate(productSchema), productController.create);

app.put('/products/:id', validate(updateProductSchema), productController.update);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});