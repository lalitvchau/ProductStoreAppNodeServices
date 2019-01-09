import { ObjectFormatter } from '../utilities';

const DELIMETER = ',';

class Product {
    constructor(product_id, title, description,unit_price, sellling_price, units_in_stock, remarks, product_photo_url) {
        [
            this.product_id = product_id,
            this.title = title,
            this.description = description,
            this.unit_price=unit_price,
            this.sellling_price = sellling_price,
            this.units_in_stock = units_in_stock,
            this.remarks = remarks,
            this.product_photo_url = product_photo_url,
        ] = arguments;
        console.log("Product id "+this.product_id)
    }


    toString() {
        return ObjectFormatter.format(this);
    }

    static create(csvString) {
        if (!csvString) {
            throw new Error("Invalid Argument Specified!");
        }

        let splitted = csvString.split(DELIMITER);
        let product = new Product(...splitted);

        return product;
    }

}

export {
    Product
};