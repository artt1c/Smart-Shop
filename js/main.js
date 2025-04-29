import createTopProductsItemsForList from "./utils/createTopProductsItemsForList.js";
import fetchDataForHomePage from "./utils/fetchDataForHomePage.js";


(async function () {
  try {

    await fetchDataForHomePage()

    await createTopProductsItemsForList()

  } catch (e) {
    console.error(e)
  }
})()
