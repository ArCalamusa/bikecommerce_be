import express from 'express';
import ProductsModel from '../models/products.js';

const router = express.Router()

/* GET */
router.get('/products', async (req, res) => {
    try {
        const products = await ProductsModel.find()
        res.status(200).send(products)
    } catch (error) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
})

/* POST */
router.post('/products/new', async (req, res) => {
    const product = new ProductsModel({
        title: req.body.title,
        oldPrice: req.body.oldPrice,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: req.body.image,
        rating: req.body.rating,
    })
    try {
        //controllo sul prodotto per evitare duplicati
        const productExist = await ProductsModel.findOne({ title: req.body.title })
        if (productExist) {
            return res.status(409).send({
                message: "Product already exists"
            })
        }
        const newProduct = await product.save()
        res.status(201).send({
            message: "Registered product"
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
})

/* PATCH */
router.patch('/products/:id', async (req, res) => {
    const { id } = req.params;
    const productExist = await ProductsModel.findById(id)
    if (!productExist) {
        return res.status(404).send({
            message: "User does not exist"
        })
    }
    try {
        const userID = id;
        const dataUpdated = req.body;
        const options = { new: true } //mostra utente con i dati aggiornati
        const result = await ProductsModel.findByIdAndUpdate(userID, dataUpdated, options)
        res.status(200).sendStatus({
            message: "Product modified"
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
})

/* DELETE */
router.delete('/products/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const product = await ProductsModel.findById(id).deleteOne();
        if (!product) {
            return res.status(484).send({
                message: 'There is no product with this Id'
            })
        }
        res.status(208).send({
            message: "Product deleted from the db"
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal server error"
        })
    }
})

export default router;