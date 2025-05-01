import mapByArrayField from "../utils/mapByArrayField.js";

// Items in the local storage are stored temporarily

// Generic storage handler function
const handleStorage = {
  set: (key, data, ttl = 3600, total = null,) => {
    ttl *= 1000;

    if (!localStorage.getItem(key)) {
      const now = new Date();
      const item = {
        value: data,
        expiry: now.getTime() + ttl,
        total: total
      }

      console.log(`set ${key}`);
      localStorage.setItem(key, JSON.stringify(item));
    }
  },
  // todo add method

  get: (key) => {
    const item = JSON.parse(localStorage.getItem(key));
    if (!item) return null;

    const now = new Date();

    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return item.total ? item : item.value;
  }
}

// -----------------STORAGE---------------------

const storage = {
  categories: {
    set: (arrItems, ttl = 3600) => {
      const data = mapByArrayField(arrItems, 'slug', (item) => ({
        name: item.name,
        url: item.url
      }));
      handleStorage.set('categories', data, ttl);
    },
    get: () => handleStorage.get('categories')
  },

  topProducts: {
    set: (arrItems, ttl = 3600) => {
      const data = arrItems.map(item => ({
        title: item.title,
        price: item.price,
        rating: item.rating,
        reviews: item.reviews,
        images: item.images
      }));
      handleStorage.set('topProducts', data, ttl);
    },
    get: () => handleStorage.get('topProducts')
  },

  allProducts: {
    set: (arrProducts, totalProducts, ttl = 3600) => {
      const data = new Set()
      data.add(arrProducts.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        rating: item.rating,
        reviews: item.reviews,
        images: item.images
      })));
      handleStorage.set('allProducts', ...data, ttl, totalProducts);
    },
    get: () => handleStorage.get('allProducts')
  }
}


export default storage