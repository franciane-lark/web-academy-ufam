import express from 'express'
import productRoutes from './routes/product.routes'

const app = express()
const PORT = 3000

// Middleware para permitir que o Express entenda JSON no corpo (body) das requisições
app.use(express.json())

// Injetando as rotas de produtos na nossa aplicação
app.use(productRoutes)

app.listen(PORT, () => {
  console.log("Servidor rodando com sucesso na porta" +  PORT)
})
