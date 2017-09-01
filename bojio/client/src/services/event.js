class Event {
  list() {
    return fetch('/api/event/list', {
      credentials: 'same-origin',
      cache: "no-store"
    })
      .then(result => result.json())
      .then(result => result.events);
  }

  create(params) {
    return fetch('/api/event/create', {
      credentials: 'same-origin',
      cache: "no-store",
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify(params)
    })
      .then(res=>res.json());
  }
}

export default Event;
