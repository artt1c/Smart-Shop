import storage from "../services/storage.service.js";

let productListPart = 0;

const createAllProductsForList = async () => {

  const itemInPart = 30
  productListPart++;

  const productAddingPart = productListPart * itemInPart - itemInPart;
  console.log(productAddingPart)

  const allProductsList = document.getElementById('all-products__list');

  const allProductsData = (storage.allProducts.get()).value;
  const productsData = allProductsData.slice(productAddingPart, productAddingPart + itemInPart)
  console.log(allProductsData, productsData)


  productsData.forEach(product => {
    const productItem = document.createElement('div')
    productItem.classList.add('all-products__item')
    productItem.innerText = product.title

    allProductsList.appendChild(productItem)
  })

}

export default createAllProductsForList;