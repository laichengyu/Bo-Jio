class Category {
  list() {
    return fetch('/api/category/list', {
      credentials: 'same-origin'
    })
      .then(result => result.json())
      .then(result => result.categories);
  }
}

export default Category;
