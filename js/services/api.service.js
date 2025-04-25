import {baseUrl, urls} from "../URLS.js";

const ApiService = {
  // auth: {
  // todo 'auth service'
  // },

  product: {
    getAll: async () => {
      try {
        const response = await fetch(baseUrl + urls.products.basePath)

        return response.json();
      } catch (e) {
        console.log(e)
      }
    },

    getCategoriesList: async () => {
      try {
        const response = await fetch(baseUrl + urls.products.categoriesList)

        return response.json();
      } catch (e) {
        console.log(e)
      }
    },

    getCategory: async (categoryName) => {
      if (!categoryName) console.error('Category can`t be empty')
      try {
        const response = await fetch(baseUrl + urls.products.category + `/${categoryName}`)

        return response.json();
      } catch (e) {
        console.log(e)
      }
    },


  }
}

export default ApiService
