import ApiService from './services/api.service.js';
import storage from "./services/storage.service.js";

const categories = storage.categories.get();
if (!categories) storage.categories.set(await ApiService.product.getCategoriesList());

console.log(JSON.parse(localStorage.getItem('categories')).value);