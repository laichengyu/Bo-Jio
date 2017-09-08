class Notification {
  markAllAsRead() {
    return fetch(`/api/notification/all_read`, {
      credentials: 'same-origin',
      method: 'post'
    })
      .then(result => result.json());
  }

  markAsRead(notification_id) {
    return fetch(`/api/notification/${notification_id}/read`, {
      credentials: 'same-origin',
      method: 'post'
    })
      .then(result => result.json());
  }

  list() {
    return fetch(`/api/notification/list`, {
      credentials: 'same-origin'
    })
      .then(result => result.json())
      .then(result => result.notifications);
  }
}

export default Notification;
