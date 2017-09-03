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

  delete(eventId) {
    return fetch(`/api/event/${eventId}/remove`, {
      credentials: 'same-origin',
      cache: "no-store",
      method: 'post'
    })
      .then(result => result.json());
  }

  setParticipants(eventId, participantIds) {
    return fetch(`/api/event/${eventId}/set_participants`, {
      credentials: 'same-origin',
      cache: "no-store",
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        inviteList: participantIds
      })
    })
      .then(result => result.json());
  }

  edit(eventId, params) {
    return fetch(`/api/event/${eventId}/edit`, {
      credentials: 'same-origin',
      cache: "no-store",
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify(params)
    })
      .then(res=>res.json())
      .then(result => result.event);
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
      .then(res=>res.json())
      .then(result => result.event);
  }
}

export default Event;
