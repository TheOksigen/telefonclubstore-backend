const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const editProduct = async (req, res) => {
  console.log(req.body);

  const { price, discount, categoryId, subcategoryId, existingImages } = req.body;

  try {
    const id = Number(req.params.id);
    const files = req.files || [];

    
    let parsedExistingImages = existingImages;
    if (typeof existingImages === 'string') {
      parsedExistingImages = JSON.parse(existingImages);
    }
    
    let img = [...(parsedExistingImages || []), ...files.map(file => file.location)];
    
    img = [...new Set(img.map(url => url.trim().replace(/['"]/g, '')).filter(Boolean))];

    const { name, description, metadata } = req.body;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        img,
        name,
        price: Number(price),
        discount: Number(discount),
        categoryId: Number(categoryId),
        subcategoryId: Number(subcategoryId),
        description,
        metadata
      }
    });

    console.log(updatedProduct);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = editProduct;
