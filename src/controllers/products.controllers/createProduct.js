const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');
const prisma = new PrismaClient();

const productSchema = z.object({
    img: z.array(z.string()).nonempty({ message: 'At least one image URL is required' }),
    name: z.string()
        .min(3, { message: 'Product name must be at least 3 characters long' })
        .max(255, { message: 'Product name must be less than 255 characters' })
        .trim(),     
    price: z.number().nonnegative()
        .positive({ message: 'Price must be a positive number' })
        .min(0.01, { message: 'Price must be at least 0.01' })
        .max(10000, { message: 'Price must be less than 10,000' }),
    discount: z.number().nonnegative()
        .min(0, { message: 'Discount must be at least 0' })
        .int({ message: 'Discount must be an integer' })
        .max(100, { message: 'Discount must be less than or equal to 100' }),
    categoryId: z.number().nonnegative()
        .int({ message: 'Category ID must be an integer' })
        .positive({ message: 'Category ID must be a positive integer' }),
    subcategoryId: z.number().nonnegative()
        .int({ message: 'Subcategory ID must be an integer' })
        .positive({ message: 'Subcategory ID must be a positive integer' }),
    description: z.string()
        .min(3, { message: 'Product description must be at least 3 characters long' })        
        .trim(),        
    metadata: z.string().optional().default('')
});

const createProduct = async (req, res) => {
    const { img, price, discount, categoryId, subcategoryId } = req.body;

    const parseResult = productSchema.safeParse({
        ...req.body,
        img,
        price: parseFloat(price),
        discount: parseInt(discount),
        categoryId: parseInt(categoryId),
        subcategoryId: parseInt(subcategoryId),
    });

    if (!parseResult.success) {
        return res.status(400).json({ errors: parseResult.error.format() });
    }

    try {
        const { img, name, price, discount, categoryId, subcategoryId, description, metadata } = parseResult.data;
        const product = await prisma.product.create({
            data: {
                img,
                name,
                price,
                discount,
                categoryId,
                subcategoryId,
                description,
                metadata
            }
        });
        res.status(201).json({ status: true, ...product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = createProduct;
