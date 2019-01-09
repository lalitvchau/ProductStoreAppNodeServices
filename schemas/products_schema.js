//product_id,title,description,,unit_in_stock,remarks, product_photo_url
let ProductSchema = {
    product_id: Number,
    title: String,
    description: String,
    unit_price:String,
    sellling_price: String,
    units_in_stock: String,
    remarks: String,
    product_photo_url: String
}

export{
    ProductSchema
};