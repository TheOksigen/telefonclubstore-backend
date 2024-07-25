const express = require('express');
const app = express();
const productsRouter = require('./src/routes/products');
const categoriesRouter = require('./src/routes/categories');
const loginRouter = require('./src/routes/login');
const cors = require("cors");
const upload = require('./src/middlewares/upload');
require('dotenv').config();
app.use(cors({
  origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Daxili sorğular üçün
      if (allowedOrigins.indexOf(origin) === -1) {
          const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
          return callback(new Error(msg), false);
      }
      return callback(null, true);
  }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.post('/img', upload.single("img"), (req, res) => {
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
