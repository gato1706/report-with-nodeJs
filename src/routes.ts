import { Router, Request, Response } from 'express'
import { prismaClient } from './database/prismaClient'
import { randomUUID } from 'node:crypto';

const routes = Router()

routes.get('/products', async (request: Request, response: Response) => {
    const products = await prismaClient.products.findMany();
    return response.json(products)
})

routes.post('/products', async (req: Request, res: Response) => {
    const { id, description, price, quantity } = req.body

    const createProduct = await prismaClient.products.create({
        data: {
            id: randomUUID(),
            description,
            price,
            quantity
        }
    })

    return res.status(201).json(createProduct)
})

export { routes }
