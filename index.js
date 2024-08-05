const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const productsRouter = require('./src/routes/products');
const categoriesRouter = require('./src/routes/categories');
const loginRouter = require('./src/routes/login');

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/auth', loginRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
