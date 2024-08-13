const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const productsRouter = require('./src/routes/products');
const categoriesRouter = require('./src/routes/categories');
const loginRouter = require('./src/routes/login');
const auth = require('./src/middlewares/auth.middleware');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { upload, deleteImage } = require('./src/middlewares/upload.middleware');

app.post("/img", auth, upload.array("img", 5), (req, res) => {  
  res.send(req.file.location);
})
app.delete("/img/:filename", deleteImage)


app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/auth', loginRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
