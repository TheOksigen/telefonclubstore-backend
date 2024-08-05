const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const productsRouter = require('./src/routes/products');
const categoriesRouter = require('./src/routes/categories');
const loginRouter = require('./src/routes/login');

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', cors(), productsRouter);
app.use('/categories', cors(), categoriesRouter);
app.use('/auth', cors(), loginRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
