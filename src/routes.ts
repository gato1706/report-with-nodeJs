import { Router, Request, Response } from 'express'
import { prismaClient } from './database/prismaClient'
import { randomUUID } from 'node:crypto';
import PdfPrinter from 'pdfmake';

const routes = Router()

routes.get('/products', async (request: Request, response: Response) => {
    const products = await prismaClient.products.findMany();
    return response.json(products)
})

routes.get("/products/report", (request: Request, response: Response) => {
    const fonts = {
        Helvetica: {
            normal: 'Helvetica',
            bold: 'Helvetica-Bold',
            italics: 'Helvetica-Oblique',
            bolditalics: 'Helvetica-BoldOblique'
        }
    };

    const printer = new PdfPrinter(fonts);
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
