import storage from "../services/storage.service.js";
import ApiService from "../services/api.service.js";

export default async function fetchDataForHomePage() {
  const categories = storage.categories.get();
  if (!categories) {
    const categories = await ApiService.categories.getCategoriesList();
    storage.categories.set(categories)
  }

  const topProducts = storage.topProducts.get();
  if (!topProducts) {
    const topProducts = await ApiService.product.getTopProductByRating();
    storage.topProducts.set(topProducts.products)
  }
}