import express from 'express';
import { ProductService } from '../services/product-service';
import { Product } from '../models/products';

const OK = 200;
const SERVER_ERROR = 500;
const BAD_REQUEST = 400;
const INVALID_ARGUMENTS = 'Invalid Argument(s) Specified!';
const NEW_PRODUCT_EVENT = 'NewProductRecord';

class ProductRouting {
    constructor(socketIOServer) {
        this.socketIOServer = socketIOServer;
        this.router = express.Router();
        this.productService = new ProductService();
        this.router.use(function(req, res, next) {
            res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
            if (req.method === 'OPTIONS') {
              return res.send(200);
            } else {
              return next();
            }
          });
          
        this.initializeRouting();
    }

    initializeRouting() {
        this.router.get('/', async (request, response) => {
            try {
                let products = await this.productService.getProducts();

                response.status(OK).send(products);
            } catch (error) {
                console.log(error);
                response.status(SERVER_ERROR).send({
                    errorMessage: JSON.stringify(error)
                });
            }
        });

        this.router.get('/detail/:product_id', async (request, response) => {
            try {
                let productId = parseInt(request.params.product_id);
                if (!productId) {
                    response.status(BAD_REQUEST).send({
                        errorMessage: INVALID_ARGUMENTS
                    });
                }

                let filteredProduct = await this.productService.getProductDetail(productId);

                response.status(OK).send(filteredProduct);
            } catch (error) {
                response.status(SERVER_ERROR).send({
                    errorMessage: JSON.stringify(error)
                });
            }

        });

        this.router.get('/search/:name', async (request, response) => {
            try {
                let productName = request.params.name;
                if (!productName) {
                    response.status(BAD_REQUEST).send({
                        errorMessage: INVALID_ARGUMENTS
                    });
                }

                let filteredProduct = await this.productService.getProductSearchByName(productName);

                response.status(OK).send(filteredProduct);
            } catch (error) {
                response.status(SERVER_ERROR).send({
                    errorMessage: JSON.stringify(error)
                });
            }

        });

        this.router.post('/', async (request, response) => {
            try {
                let body = request.body;
                let product = new Product(
                    body.product_id,
                    body.title,
                    body.description,
                    body.unit_price,
                    body.sellling_price,
                    body.units_in_stock,
                    body.remarks,
                    body.product_photo_url

                );
                let addedRecord = await this.productService.addNewProduct(product);

                if (addedRecord) {
                    if (this.socketIOServer) {
                        this.socketIOServer.emit(NEW_PRODUCT_EVENT, addedRecord);
                    }

                    response.status(OK).send(addedRecord);
                }
                else response.status(BAD_REQUEST).send({
                    error: INVALID_ARGUMENTS
                });
            } catch (error) {
                response.status(SERVER_ERROR).send({
                    errorMessage: JSON.stringify(error)
                });
            }
        });
    }

    get Router() {
        return this.router;
    }
}

export {
    ProductRouting
};
