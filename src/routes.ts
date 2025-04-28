import { Router, Request, Response } from 'express'
import { prismaClient } from './database/prismaClient'
import { randomUUID } from 'node:crypto';
import fs from 'node:fs'

import PdfPrinter from 'pdfmake';
import { TableCell, TDocumentDefinitions } from 'pdfmake/interfaces';
import { table } from 'node:console';

const routes = Router()

routes.get('/products', async (request: Request, response: Response) => {
    const products = await prismaClient.products.findMany();
    return response.json(products)
})

routes.get("/products/report", async (request: Request, response: Response) => {
    const products = await prismaClient.products.findMany();

    const fonts = {
        Helvetica: {
            normal: 'Helvetica',
            bold: 'Helvetica-Bold',
            italics: 'Helvetica-Oblique',
            bolditalics: 'Helvetica-BoldOblique'
        }
    };

    const printer = new PdfPrinter(fonts);

    const body = [];

    const columnsTitle: TableCell[] = [
        { text: "ID", style: "id" },
        { text: "Descrição", style: "columnsTitle" },
        { text: "Preço", style: "columnsTitle" },
        { text: "Quantidade", style: "columnsTitle" },
    ]

    const columnsBody = new Array();

    columnsTitle.forEach(column => columnsBody.push(column));
    body.push(columnsBody)

    for await (let product of products) {
        const rows = new Array()
        rows.push(product.id)
        rows.push(product.description)
        rows.push(`R$ ${product.price}`)
        rows.push(product.quantity)

        body.push(rows);
    }

    const docDefinitions: TDocumentDefinitions = {
        defaultStyle: { font: "Helvetica" },
        content: [
            {
                columns: [
                    { text: "Relatório de Produtos", style: "header" },
                    { text: "28/04/2025\n\n", style: "header" }
                ]
            },

            {
                table: {
                    heights: function (row) {
                        return 30
                    },
                    widths: [
                        200, 'auto', 'auto', 'auto'
                    ],
                    body
                }
            }

        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                alignment: "center"
            },
            columnsTitle: {
                fontSize: 13,
                bold: true,
                fillColor: "#7159c1",
                color: "white",
                alignment: "center",
                margin: 4
            },
            id: {
                fillColor: "#999",
                color: "#FFF",
                alignment: "center",
                margin: 4
            },
            footer: {
                alignment: "center"
            }
        }
    }

    const pdfDoc = printer.createPdfKitDocument(docDefinitions)

    //pdfDoc.pipe(fs.createWriteStream("Relatorio.pdf"))

    const chuncks = []

    pdfDoc.on("data", (chunk) => {
        chuncks.push(chunk);
    })
    pdfDoc.end();

    pdfDoc.on("end", () => {
        const result = Buffer.concat(chuncks)
        response.end(result)
    })


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
