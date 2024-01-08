const ProductModel = require('../models/products');


class Controller {
    static async createProduct(req,res){
        try {
            const {body} = req;
            const data = await ProductModel.findAll();
            body.id = data.length +1;
            body.isPublished = false;
            const response = await ProductModel.create(body);
            res.status(201).json(response)
        } catch (err) {
            console.log(err)
            throw new Error(err.message)
        }
    }

    static updateProductById(req,res){
        res.status(405).json({message: "Not allowed"})
    }

    static async getAllProducts(req,res){
        try {
            const data = await ProductModel.findAll();
            res.status(200).json(data)
        } catch (err) {
            throw new Error(err.message)
        }
    }

    static async patchProductById(req,res){
        const {id} = req.params;
        const {body} = req;
        const data = await ProductModel.findOne({where: {id}});
        if(!data) {
            res.status(404).send();
            return
        }
        const {price, mrp, stock} = data;
        if(mrp < price && stock == 0){
            res.status(422).send(["MRP should not be less than equal to the Price","Stock count is 0"])
        }else if (mrp < price){
            res.status(422).send(["MRP should not be less than equal to the Price"])
        }else if (stock === 0){
            res.status(422).send(["Stock count is 0"])
        }else {
            await ProductModel.update({isPublished: true}, {where: {id}})
            res.status(204).send({message: "Success Update"})
        }
    }
}

module.exports = Controller;