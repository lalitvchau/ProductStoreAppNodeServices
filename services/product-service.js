import { DbManager } from "../db-management/db-manager";
import { ConnectionStringBuilder } from "../config/connection-string-builder";

const INVALID_ARGUMENTS = 'Invalid Argument(s) Specified!';
const INVALID_VALUES = 'Invalid Numberic Values for one of these fields Product Id, Product Selling Price and Product Units in the Stock';
const INVALID_URL = 'Ivalid URL for Product Photo URL ...!';
const INVALID_PRODUCT_ID = 'Product Id must be a whole Number ...!';

class ProductService {
    constructor() {
        this.connectionString = ConnectionStringBuilder.getConnectionString();
        this.dbManager = new DbManager();
    }

    async getProducts() {
        try {
            await this.dbManager.connection.connect(this.connectionString, {
                useNewUrlParser: true
            });

            let products = await this.dbManager.productModel.find({});

            return products;
        } catch (error) {
            throw error;
        } finally {
            await this.dbManager.connection.disconnect();
        }
    }

    async getProductDetail(product_id) {
        if (!product_id) {
            throw new Error(INVALID_ARGUMENTS);
        }

        try {

            await this.dbManager.connection.connect(this.connectionString, {
                useNewUrlParser: true
            });
            console.log("Product Id = " + product_id);
            let filteredProduct = await this.dbManager.productModel.findOne({
                product_id: product_id
            });
            console.log(filteredProduct);
            return filteredProduct;
        } catch (error) {
            throw error;
        } finally {
            await this.dbManager.connection.disconnect();
        }
    }
    async getProductSearchByName(title) {
        if (!title) {
            throw new Error(INVALID_ARGUMENTS);
        }

        try {

            await this.dbManager.connection.connect(this.connectionString, {
                useNewUrlParser: true
            });
           // console.log("Product Id = " + title);
            let filteredProduct = await this.dbManager.productModel.findOne({
                title: title
            });
           // console.log(filteredProduct);
            return filteredProduct;
        } catch (error) {
            throw error;
        } finally {
            await this.dbManager.connection.disconnect();
        }
    }

    async addNewProduct(product) {

        let validationEmpty = product && product.product_id &&
            product.title;
        if (!validationEmpty)
            throw(INVALID_ARGUMENTS);
        try {
            await this.dbManager.connection.connect(this.connectionString, {
                useNewUrlParser: true
            });

            let savedRecord = await this.dbManager.productModel.create(product);

            return savedRecord;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            await this.dbManager.connection.disconnect();
        }
    }
}

export {
    ProductService
};
