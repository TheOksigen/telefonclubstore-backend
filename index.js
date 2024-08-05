const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({
  origin: '*', 
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization'
}));
require('dotenv').config();

const productsRouter = require('./src/routes/products');
const categoriesRouter = require('./src/routes/categories');
const loginRouter = require('./src/routes/login');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/auth', loginRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
