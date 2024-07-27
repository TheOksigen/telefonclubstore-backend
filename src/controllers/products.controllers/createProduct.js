const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createProduct = async (req, res) => {
  
  const { name, price, discount, categoryId, description, metadata } = req.body;
  const files = req.files;
  const img = files.map(file => file.location);    
  try {
    const product = await prisma.product.create({
      data: {
        img,
        name,
        price: parseFloat(price),
        discount: parseInt(discount),
        categoryId: parseInt(categoryId),
        description,
        metadata: metadata
      }
    });
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = createProduct;
