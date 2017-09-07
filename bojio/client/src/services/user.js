class User {
  onboarded() {
    return fetch(`/api/onboarded`, {
      credentials: 'same-origin',
      method: 'post'
    })
      .then(result => result.json());
  }
}

export default User;
