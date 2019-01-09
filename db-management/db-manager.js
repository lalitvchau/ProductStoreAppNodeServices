import Mongoose from 'mongoose';
import { ProductSchema } from '../schemas';

class DbManager {
    constructor() {
        try {
            this.connection = Mongoose;
            this.connection.Promise = global.Promise;
            this.productModel = this.connection.model('products', Mongoose.Schema(ProductSchema));            
            console.log('Connection done !');
        } catch (error) {
            console.log("Server : "+error);
            throw error;
        }
    }
}

export{
    DbManager
};