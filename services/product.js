import http from '../common/request';

class ProductService {

    static async getProductListApi(data) {
        const res = await http.post('/product/list', {
            condition: {
                with_month_sale: 0,
                with_tag: 0
            },
            search: {
                category_id: data.category_id,
                search: ''
            },
            sort: {
                create_at: '',
                discount_price: '',
                sale: ''
            },
            page: {
                all: 0,
                total: 1,
                page: data.page || 1,
                page_size: 10
            }
        });
        return res;
    }

    static async getProductDataApi(product_id = '283038144755286018') {
        const res = await http.post('/product/detail', { product_id });
        return res;
    }
}

export default ProductService;