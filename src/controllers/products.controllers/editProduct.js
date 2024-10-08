const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const prisma = new PrismaClient();

const productSchema = z.object({
  img: z.array(z.string().url({ message: 'Invalid URL format' })).nonempty({ message: 'At least one image URL is required' }),
  name: z.string()
    .min(3, { message: 'Product name must be at least 3 characters long' })
    .max(255, { message: 'Product name must be less than 255 characters' })
    .trim()
    .nonempty({ message: 'Product name is required' }),
  price: z.number()
    .positive({ message: 'Price must be a positive number' })
    .min(0.01, { message: 'Price must be at least 0.01' })
    .max(10000, { message: 'Price must be less than 10,000' }),
  discount: z.number()
    .min(0, { message: 'Discount must be at least 0' })
    .int({ message: 'Discount must be an integer' })
    .max(100, { message: 'Discount must be less than or equal to 100' }),
  categoryId: z.number()
    .int({ message: 'Category ID must be an integer' })
    .positive({ message: 'Category ID must be a positive integer' }),
  subcategoryId: z.number()
    .int({ message: 'Subcategory ID must be an integer' })
    .positive({ message: 'Subcategory ID must be a positive integer' }),
  description: z.string()
    .min(3, { message: 'Product description must be at least 3 characters long' })    
    .trim()
    .nonempty({ message: 'Product description is required' }),
  metadata: z.string().optional().default('')
});

const editProduct = async (req, res) => {
  const id = Number(req.params.id);
  const { img, name, price, discount, categoryId, subcategoryId, description, metadata } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  try {
    const parseResult = productSchema.safeParse({
      img, name, price: Number(price),
      discount: Number(discount), categoryId: Number(categoryId),
      subcategoryId: Number(subcategoryId), description, metadata
    });

    if (!parseResult.success) {
      return res.status(400).json({ errors: parseResult });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: parseResult.data
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(500).json({ error: error.message });
  }
};

module.exports = editProduct;
