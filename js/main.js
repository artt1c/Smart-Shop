import ApiService from './services/api.service.js';

console.log(await ApiService.product.getAll())
console.log(await ApiService.product.getCategoriesList())
console.log(await ApiService.product.getCategory('laptops'))
