const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const searchProduct = async (req, res) => {
  try {
    const { name } = req.query;
    const filter = name ? {
      name: {
        contains: name,
        mode: 'insensitive'
      }
    } : {};

    const products = await prisma.product.findMany({
      where: filter,
      include: { category: true }
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = searchProduct;
