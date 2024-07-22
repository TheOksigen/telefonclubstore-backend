const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const prisma = new PrismaClient();

const editProductSchema = z.object({
  id: z.number()
    .int({ message: 'Product ID must be an integer' })
    .min(1, { message: 'Product ID is required' }),
  img: z.string()
    .url({ message: 'Invalid URL format' })
    .min(1, { message: 'Image URL is required' }),
  name: z.string()
    .min(3, { message: 'Product name must be at least 3 characters long' })
    .max(255, { message: 'Product name must be less than 255 characters' })
    .trim()
    .min(1, { message: 'Product name is required' }),
  price: z.number()
    .positive({ message: 'Price must be a positive number' })
    .min(0.01, { message: 'Price must be at least 0.01' })
    .max(10000, { message: 'Price must be less than 10,000' }),
  discount: z.number()
    .min(0, { message: 'discount must be at least 0' })
    .int({ message: 'Discount must be Number' })
    .max(100, { message: 'Discount must be less than or equal to 100' }),
  categoryId: z.number()
    .int({ message: 'Category ID must be an integer' })
    .min(1, { message: 'Category ID is required' }),
  description: z.string()
    .min(3, { message: 'Product description must be at least 3 characters long' })
    .max(255, { message: 'Product description must be less than 255 characters' })
    .trim()
})

const editProduct = async (req, res) => {
  const parseResult = editProductSchema.safeParse(req.body);  
  if (!parseResult.success) {
    return res.status(400).json({ errors: parseResult.error.format() });
  }
  try {
    const { id } = req.params;
    const { img, name, price, discount, categoryId, description } = req.body;
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: { img, name, price, discount, categoryId, description }
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = editProduct;
