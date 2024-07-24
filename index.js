const express = require('express');
const app = express();
const productsRouter = require('./src/routes/products');
const categoriesRouter = require('./src/routes/categories');
const loginRouter = require('./src/routes/login');

const cors = require("cors")
require('dotenv').config();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.post('/img', auth, upload.single("img"), (req, res) => {
//   console.log(req.file);
//   res.send('Successfully uploaded ')
// })

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/auth', loginRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
