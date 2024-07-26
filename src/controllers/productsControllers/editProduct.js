const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


const editProduct = async (req, res) => { 
  try {
    const { id } = parseResult.data;
    const { img, name, price, discount, categoryId, description, metadata } = parseResult.data;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { img, name, price, discount, categoryId, description, metadata }
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = editProduct;
