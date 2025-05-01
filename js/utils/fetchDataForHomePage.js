import storage from "../services/storage.service.js";
import ApiService from "../services/api.service.js";

export default async function fetchDataForHomePage() {
  let categories = storage.categories.get();
  if (!categories) {
    categories = await ApiService.categories.getCategoriesList();
    storage.categories.set(categories)
  }

  let topProducts = storage.topProducts.get();
  if (!topProducts) {
    topProducts = await ApiService.product.getTopProductByRating();
    storage.topProducts.set(topProducts.products)
  }

  let allProducts = storage.allProducts.get();
  if (!allProducts) {
    const fetchResponse = await ApiService.product.getAllProductsWithSomeValue();
    storage.allProducts.set(fetchResponse.products, fetchResponse.total)
  }
    // todo split up to another function

    // const lastProductInStorage = allProducts.value[allProducts.value.length-1].id;
    // if (allProducts.total > lastProductInStorage) {
    //   const fetchResponse = await ApiService.product.getAllProductsWithSomeValue(30, lastProductInStorage, 'title','price','rating','reviews','images');
    //   allProducts.value.push(...fetchResponse.products)
    //   console.log(allProducts.value)
    //   console.log(fetchResponse.products)
    //   storage.allProducts.set(allProducts.value, fetchResponse.total)
    // }
}