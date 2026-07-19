import { Router } from 'express'
import { ProductController } from '../controllers/product.controller'

const router = Router()
const productController = new ProductController()

// Rotas do CRUD de Produtos
router.get('/products', productController.index)
router.get('/products/:id', productController.read)
router.post('/products', productController.create)
router.put('/products/:id', productController.update)
router.delete('/products/:id', productController.delete)

export default router
