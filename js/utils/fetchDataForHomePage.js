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

  const allProducts = storage.allProducts.get();
  if (!allProducts) {
    const fetchResponse = await ApiService.product.getAllProductsWithSomeValue();
    storage.allProducts.set(fetchResponse.products, fetchResponse.total)
  }
}


export const addMoreProducts = async () => {

  const allProducts = storage.allProducts.get();
  if (!allProducts) return null;

  const lastProductInStorage = allProducts.value[allProducts.value.length-1].id;
  if (allProducts.total > lastProductInStorage) {
    const fetchResponse = await ApiService.product.getAllProductsWithSomeValue(30, lastProductInStorage, 'title','price','rating','reviews','images');
    storage.allProducts.add(fetchResponse.products, fetchResponse.total)
  }
}

export const addProductToCard = async (productId, quantity = 1) => {

  const response = await ApiService.product.getSingle(productId)
  const cardProducts = storage.cart.get();

  if (!cardProducts) {
    storage.cart.add(response, quantity);
  } else {
    const existing = cardProducts.find(product => product.id === response.id);
    const newQuantity = existing ? existing.quantity + quantity : quantity;
    storage.cart.add(response, newQuantity);
  }
}

export const removeProductFromCard = async (productId) => {

}

await addProductToCard(1, 10)

await removeProductFromCard(1)

