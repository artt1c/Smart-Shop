import {baseUrl, urls} from "../URLS.js";

const ApiService = {
  // auth: {
  // todo 'auth service'
  // },

  product: {
    getAll: async () => {
      try {
        const response = await fetch(baseUrl + urls.products.basePath)

        if(!response.ok) throw new Error(`Response status: ${response.status}`)

        return response.json();
      } catch (e) {
        console.log(e)
      }
    },

    getSingle: async (id) => {
      if (!id) console.error('Id can`t be empty')
      try {
        const response = await fetch(baseUrl + urls.products.basePath + `/${id}`)

        if(!response.ok) throw new Error(`Response status: ${response.status}`)

        return response.json();
      } catch (e) {
        console.log(e)
      }
    },

    getCategoriesList: async () => {
      try {
        const response = await fetch(baseUrl + urls.products.categoriesList)

        if(!response.ok) throw new Error(`Response status: ${response.status}`)

        return response.json();
      } catch (e) {
        console.log(e)
      }
    },

    getCategory: async (categoryName) => {
      if (!categoryName) console.error('Category can`t be empty')
      try {
        const response = await fetch(baseUrl + urls.products.category + `/${categoryName}`)

        if(!response.ok) throw new Error(`Response status: ${response.status}`)

        return response.json();
      } catch (e) {
        console.log(e)
      }
    },


  }
}

export default ApiService
