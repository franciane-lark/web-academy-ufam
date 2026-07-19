import prisma from '../database'

export class ProductService {
  // Index - Listar todos
  async getAll() {
    return await prisma.product.findMany()
  }

  // Read - Buscar um por ID
  async getById(id: number) {
    return await prisma.product.findUnique({
      where: { id }
    })
  }

  // Create - Criar um novo
  async create(data: { name: string; description?: string; price: number }) {
    return await prisma.product.create({
      data
    })
  }

  // Update - Atualizar dados
  async update(id: number, data: { name?: string; description?: string; price?: number }) {
    return await prisma.product.update({
      where: { id },
      data
    })
  }

  // Delete - Remover do banco
  async delete(id: number) {
    return await prisma.product.delete({
      where: { id }
    })
  }
}
