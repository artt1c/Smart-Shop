import ApiService from "../services/api.service.js";

const createAllProductsForList = async () => {
  await ApiService.product.getAllProductsWithSomeValue(50, 50, 'title', 'price', 'rating');


}

export default createAllProductsForList;