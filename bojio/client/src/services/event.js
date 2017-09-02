class Event {
  list(mode) {
    return fetch(`/api/event/list?display=${mode}`, {
      credentials: 'same-origin',
      cache: "no-store"
    })
      .then(result => result.json())
      .then(result => result.events);
  }

  joined() {
    return fetch('/api/event/joined', {
      credentials: 'same-origin',
      cache: "no-store"
    })
      .then(result => result.json())
      .then(result => result.events);
  }

  created() {
    return fetch('/api/event/created', {
      credentials: 'same-origin',
      cache: "no-store"
    })
      .then(result => result.json())
      .then(result => result.events);
  }

  join(eventId) {
    return fetch(`/api/event/${eventId}/join`, {
      credentials: 'same-origin',
      cache: "no-store",
      method: 'post'
    })
      .then(result => result.json());
  }

  leave(eventId) {
    return fetch(`/api/event/${eventId}/leave`, {
      credentials: 'same-origin',
      cache: "no-store",
      method: 'post'
    })
      .then(result => result.json());
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
