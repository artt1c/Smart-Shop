export default function totalPriceInCard(products) {
  return products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
}
