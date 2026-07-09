const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  async index(req, res) {
    try {
      const products = await prisma.product.findMany();
      return res.json(products);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const { name, price, stock } = req.body;
      const newProduct = await prisma.product.create({
        data: { name, price: parseFloat(price), stock: parseInt(stock) }
      });
      return res.status(201).json(newProduct);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async read(req, res) {
    try {
      const { id } = req.params;
      const product = await prisma.product.findUnique({ where: { id } });
      if (!product) return res.status(404).json({ error: "Product not found" });
      return res.json(product);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, price, stock } = req.body;
      const updated = await prisma.product.update({
        where: { id },
        data: {
          name,
          price: price ? parseFloat(price) : undefined,
          stock: stock ? parseInt(stock) : undefined
        }
      });
      return res.json(updated);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await prisma.product.delete({ where: { id } });
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
};

async create(req, res) {
  try {
    const { name, price, stockQuantity } = req.body; // Captura stockQuantity
    
    const newProduct = await prisma.product.create({
      data: { 
        name, 
        price: parseFloat(price), 
        stock: parseInt(stockQuantity) // Salva no campo 'stock' do banco
      }
    });
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(422).json({ error: error.message });
  }
}