import {productsMocks} from '../services/mocks.services.js'

export const generatorProducts = async (req, res) =>{
    let productsGenerated = [];
    for (let i = 0; i < 100; i++) {
        productsGenerated.push(productsMocks())
    }
    return res.status(201).send(productsGenerated);
}