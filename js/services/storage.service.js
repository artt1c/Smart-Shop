import mapByArrayField from "../utils/mapByArrayField.js";

// Items in the local storage are stored temporarily

const storage = {
  categories: {
    set: (arrItems, ttl=3600) => {
      ttl *= 1000;

      if (!localStorage.getItem('categories')) {
        const now = new Date();

        const data = mapByArrayField(arrItems, 'slug', (item) => {
          return {
            name: item.name,
            url: item.url
          }
        })

        const item = {
          value: data,
          expiry: now.getTime() + ttl
        }

        console.log('set')
        localStorage.setItem('categories', JSON.stringify(item))
      }
    },
    get: () => {
      const item = JSON.parse(localStorage.getItem('categories'))
      if (!item) return null

      const now = new Date()

      if (now.getTime() > item.expiry) {
        localStorage.removeItem('categories')
        return null
      } else {
        return item.categories
      }
    }
  }
}

export default storage