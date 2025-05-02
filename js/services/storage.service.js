import mapByArrayField from "../helpers/mapByArrayField.js";

// Items in the local storage are stored temporarily

// Generic storage handler function
const handleStorage = {
  set: (key, data, ttl, total = null, visibleProducts = null) => {
    ttl *= 1000;

    if (!localStorage.getItem(key)) {
      const now = new Date();
      const item = {
        value: data,
        expiry: now.getTime() + ttl,
        total: total,
        visibleProducts: visibleProducts
      }

      console.log(`set ${key}`);
      localStorage.setItem(key, JSON.stringify(item));
    }
  },

  add: (key, data, ttl, total = null) => {
    ttl *= 1000;
    const now = new Date();

    const currentData = JSON.parse(localStorage.getItem(key));
    if (!currentData) return null;

    currentData.value.push(...data)

    const item = {
      value: currentData.value,
      expiry: now.getTime() + ttl,
      total: total,
      visibleProducts: currentData.visibleProducts
    }

    console.log(`add to ${key}`);
    localStorage.setItem(key, JSON.stringify(item));
  },

  get: (key = null) => {
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
    set: (arrProducts, totalProducts, visibleProducts = 30, ttl = 3600) => {
      const data = new Set()
      data.add(arrProducts.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        rating: item.rating,
        reviews: item.reviews,
        images: item.images
      })));
      handleStorage.set('allProducts', ...data, ttl, totalProducts, visibleProducts);
    },

    add: (arrProducts, totalProducts, ttl = 3600) => {
      const data = new Set()
      data.add(arrProducts.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        rating: item.rating,
        reviews: item.reviews,
        images: item.images
      })));
      handleStorage.add('allProducts', ...data, ttl, totalProducts);
    },

    get: () => handleStorage.get('allProducts')
  }
}

export default storage