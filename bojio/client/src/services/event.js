class Event {
  list() {
    return fetch('/api/event/list', {
      credentials: 'same-origin',
      cache: "no-store"
    })
      .then(result => result.json())
      .then(result => result.events);
  }
}

export default Event;
