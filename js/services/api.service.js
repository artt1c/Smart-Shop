import {baseUrl, urls} from "../urls/URLS.js";
import storage from "./storage.service.js";

const selectParams = 'select=title,price,rating,reviews,images'

const ApiService = {
  product: {
    getAllProductsWithSomeValue: async (limit = 30, skip = 0, ...productValue) => {
      let urlParams = baseUrl+urls.products.basePath + '/?limit='+ limit + '&skip=' + skip;
      if (productValue.length) urlParams += '&select='+ productValue.join(',')

      try {
        const response = await fetch(urlParams)

        if(!response.ok) throw new Error(`Response status: ${response.status}`)

        return response.json();
      } catch (e) {
        console.error(e)
      }
    },

    getTopProductByRating: async (productCount = 10) => {
      const ursWithParams = baseUrl + urls.products.basePath + '/?sortBy=rating&order=desc&limit=' + productCount + '&' + selectParams
      try {
        const response = await fetch(ursWithParams);

        if(!response.ok) throw new Error(`Response status: ${response.status}`)

        return response.json();
      } catch (e) {
        console.error(e)
      }
    },

    getSingle: async (id) => {
      if (!id) console.error('Id can`t be empty')
      try {
        const response = await fetch(baseUrl + urls.products.basePath + `/${id}`)

        if(!response.ok) throw new Error(`Response status: ${response.status}`)

        return response.json();
      } catch (e) {
        console.error(e)
      }
    },

  },

  categories: {
    getCategoriesList: async () => {
      try {
        const response = await fetch(baseUrl + urls.products.categoriesList)

        if(!response.ok) throw new Error(`Response status: ${response.status}`)

        return response.json();
      } catch (e) {
        console.error(e)
      }
    },

    getCategory: async (categoryName) => {
      if (!categoryName) console.error('Category can`t be empty')
      try {
        const response = await fetch(baseUrl + urls.products.category + `/${categoryName}`)

        if(!response.ok) throw new Error(`Response status: ${response.status}`)

        return response.json();
      } catch (e) {
        console.error(e)
      }
    },
  },

  search: {
    getSearch: async (searchParams) => {
      if (!searchParams) console.error('Search can`t be empty')
      try {
        const response = await fetch(baseUrl + urls.products.search + searchParams)

        if(!response.ok) throw new Error(`Response status: ${response.status}`)

        return response.json();
      } catch (e) {
        console.error(e)
      }
    }
  },

  order: {
    postOrder: async (orderData) => {
      try {
        const response = await fetch(baseUrl + urls.card.add, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderData)
        });

        if (!response.ok) {
          throw new Error('Помилка при відправці замовлення');
        }

        const result = await response.json();
        console.log('Замовлення успішно створено:', result);
        alert('Замовлення успішно оформлено!');

        storage.cart.remove('cart');
        window.location.href = '/';

      } catch (error) {
        console.error('Помилка:', error);
        alert('Виникла помилка при оформленні замовлення. Спробуйте пізніше.');
      }
    }
  }
}

export default ApiService
