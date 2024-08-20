const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const prisma = new PrismaClient();

const querySchema = z.object({
  name: z.string()
    .min(2, { message: 'Product name must be at least 2 characters long' })
    .max(255, { message: 'Product name must be less than 255 characters' })
})

const searchProduct = async (req, res) => {
  try {
    const parseResult = querySchema.safeParse(req.query)

    if (!parseResult.success) {
      return res.status(404).json({ errore: parseResult.error.format() })
    }
    const { name } = parseResult.data;

    const filter = name ? {
      name: {
        contains: name,
        mode: 'insensitive'
      }
    } : {};

    const products = await prisma.product.findMany({
      where: filter,
      select: {
        id: true, img: true,
        name: true, category: true, subcategory: true,
        subcategoryId: false, description: true,
        discount: true, price: true,
        metadata: true, createdAt: true, updatedAt: true,
      },

    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = searchProduct;
