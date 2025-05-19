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
        visibleProducts: visibleProducts,
      }

      console.log(`set ${key}`);
      localStorage.setItem(key, JSON.stringify(item));
    }
  },

  add: (key, data, ttl, total = null, visibleProducts = null) => {
    ttl *= 1000;
    const now = new Date();

    const currentData = JSON.parse(localStorage.getItem(key));
    if (!currentData) {
      handleStorage.set(key, data, ttl, total, visibleProducts);
      return;
    }

    const existingItems = currentData.value || [];

    data.forEach(newItem => {
      const index = existingItems.findIndex(item => item.id === newItem.id);
      if (index !== -1) {
        existingItems[index] = { ...existingItems[index], ...newItem };
      } else {
        existingItems.push(newItem);
      }
    });

    const item = {
      value: existingItems,
      expiry: now.getTime() + ttl,
      total: total,
      visibleProducts: currentData.visibleProducts,
    }

    console.log(`add to ${key}`);
    localStorage.setItem(key, JSON.stringify(item));
  },

  get: (key, timer = true) => {
    const item = JSON.parse(localStorage.getItem(key));
    if (!item) return null;

    if (timer) {
      const now = new Date();

      if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
      }
    }

    return item.total ? item : item.value;
  },

  remove: (key) => {
    localStorage.removeItem(key);
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
        id: item.id,
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

    add: (arrProducts, totalProducts, ttl = 3600, visibleProducts = 30) => {
      const data = new Set()
      data.add(arrProducts.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        rating: item.rating,
        reviews: item.reviews,
        images: item.images
      })));
      handleStorage.add('allProducts', ...data, ttl, totalProducts, visibleProducts);
    },

    get: () => handleStorage.get('allProducts')
  },

  cart: {
    add: (product, quantity) => {
      if (quantity < 1) throw new Error('quantity cannot be less than one')

      const data = {
        id: product.id,
        title: product.title,
        price: product.price,
        images: product.images[0],
        quantity: quantity,
      };

      const arrData = Array.isArray(data) ? data : [data];

      handleStorage.add('cart', arrData, 0);
    },

    remove: (productId) => {

      const data = handleStorage.get('cart', false);
      if (!data) console.error('card is empty');

      data.map(product => {
        if (product.id === productId) {
          const index = data.indexOf(product);
          data.splice(index, 1);
        }
      })

      handleStorage.remove('cart');
      handleStorage.set('cart', data, 0);
    },

    get: () => handleStorage.get('cart', false),

    deleteCart: () => {
      handleStorage.remove('cart');
    }
  }
}

export default storage