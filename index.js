const express = require('express');
const cors = require('cors');
const app = express();

const productsRouter = require('./src/routes/products');
const categoriesRouter = require('./src/routes/categories');
const loginRouter = require('./src/routes/login');
const upload = require('./src/middlewares/upload');
require('dotenv').config();

// Allow CORS for all routes
app.use(cors());

// Allow specific origins
// app.use(cors({
//   origin: 'http://127.0.0.1:5500'
// }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/auth', loginRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
