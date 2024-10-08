const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 1000;
    const skip = (page - 1) * limit;

    const products = await prisma.product.findMany({
      select: {
        id: true,
        img: true,
        name: true,
        category: true,
        subcategory: true,
        subcategoryId: false,
        description: true,
        discount: true,
        price: true,
        metadata: true,
        createdAt: true,
        updatedAt: true,
      },
      skip: skip, take: limit,
    });

    res.status(200).json({ data: products, skip: skip, take: limit });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getProducts;
