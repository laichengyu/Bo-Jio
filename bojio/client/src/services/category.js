class Category {
  list() {
    return fetch('/api/category/list', {
      credentials: 'same-origin',
      cache: "no-store"
    })
      .then(result => result.json())
      .then(result => result.categories);
  }
}

export default Category;
