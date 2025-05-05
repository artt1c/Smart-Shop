import {updateProductQuantity} from "../utils/fetchDataForHomePage.js";
import totalPriceInCard from "../helpers/totalPriceInCard.js";

export async function handleCartItemUpdate(product, inputElement, priceElement, products, totalPriceElement, totalPriceBlock) {
  const newQuantity = parseInt(inputElement.value);
  priceElement.innerText = (product.price * newQuantity).toFixed(2) + ' $';
  product.quantity = newQuantity;
  totalPriceElement.innerText = totalPriceInCard(products).toFixed(2);
  totalPriceElement.innerText === '0.00' ? totalPriceBlock.style.display = 'none' : totalPriceBlock.style.display = 'flex';
  await updateProductQuantity(product.id, () => newQuantity);
}