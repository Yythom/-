import http from '../common/request';

class ProductService {

    // {
    //     "condition": {
    //       "with_month_sale": "integer",
    //       "with_tag": "integer"
    //     },
    //     "search": {
    //       "category_id": "string",
    //       "search": "string"
    //     },
    //     "sort": {
    //       "create_at": "string",
    //       "discount_price": "string",
    //       "sale": "string"
    //     },
    //     "page": {
    //       "all": "integer",
    //       "total": "integer",
    //       "page": "integer",
    //       "page_size": "integer"
    //     }
    //}
    static async getProductListApi(product_id = '') {
        const res = await http.post('/product/list', { product_id });
        return res;
    }

    static async getProductDataApi(product_id = '283038144755286018') {
        const res = await http.post('/product/detail', { product_id });
        return res;
    }
}

export default ProductService;