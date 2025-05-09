
const searchInit = () => {
  const searchForm = document.forms.search;
  console.log(searchForm.elements.searchParams)
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

  })
}

export default searchInit;