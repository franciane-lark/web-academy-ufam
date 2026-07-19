import { Request, Response } from 'express'
import { ProductService } from '../services/product.service'

const productService = new ProductService()

export class ProductController {
  // GET /products
  async index(req: Request, res: Response) {
    try {
      const products = await productService.getAll()
      res.json(products)
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar produtos' })
    }
  }

  // GET /products/:id
  async read(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id)
      const product = await productService.getById(id)
      
      if (!product) {
        res.status(404).json({ error: 'Produto não encontrado' })
        return
      }
      
      res.json(product)
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar o produto' })
    }
  }

  // POST /products
  async create(req: Request, res: Response) {
    try {
      const { name, description, price } = req.body
      const newProduct = await productService.create({ name, description, price })
      res.status(201).json(newProduct)
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar produto' })
    }
  }

  // PUT /products/:id
  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id)
      const { name, description, price } = req.body
      
      const updatedProduct = await productService.update(id, { name, description, price })
      res.json(updatedProduct)
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar produto. Verifique se o ID existe.' })
    }
  }

  // DELETE /products/:id
  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id)
      await productService.delete(id)
      res.status(204).send() // 204 No Content (sucesso sem corpo de resposta)
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar produto. Verifique se o ID existe.' })
    }
  }
}
