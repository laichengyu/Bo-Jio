import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Feed, Card } from 'semantic-ui-react';
import NotificationItem from './NotificationItem';
import './NotificationModal.css';

class NotificationModal extends Component {
  state = {
    notifications: [],
    notificationsCount: 0
  }

  markAllAsRead = (event) => {
    event.preventDefault();
    this.setState({
      notificationsCount: 0
    });

    this.props.services.notification.markAllAsRead();
    this.props.onOutsideClick();
  }

  render() {
    return (
      <Card className={"NotificationModal" + (!this.props.open ? " NotificationModal--hidden" : "")}>
        <Card.Content>
          <Card.Header>
            Notifications
          </Card.Header>
          <span className="NotificationModal-markAll" onClick={this.markAllAsRead}> Mark all as read </span>
        </Card.Content>
        <Card.Content>
          <Feed className="NotificationModal-items">
            {this.state.notifications.map(
              notification => <NotificationItem key={`NotificationItem.${notification.id}`} services={this.props.services}
                onClose={() => {
                  if (!notification.read) {
                    this.setState({
                      notificationsCount: Math.max(0, this.state.notificationsCount - 1)
                    });
                    this.props.services.notification.markAsRead(notification.id);
                  }
                  this.props.onOutsideClick();
                }}
               {...notification} />)}
          </Feed>
        </Card.Content>
      </Card>
    );
  }

  componentDidMount() {
    if (this.props.open) {
      document.addEventListener('click', this.handleClickOutside.bind(this), true);
    }

    this.props.services.notification.list()
      .then(notifications => {
        this.setState({
          notifications: notifications,
          notificationsCount: notifications.filter(notification => !notification.read).length
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.notificationsCount !== prevState.notificationsCount) {
      this.props.onNotificationsChange(this.state.notificationsCount);
    }
  }

  componentWillUnmount() {
    if (this.props.open) {
      document.removeEventListener('click', this.handleClickOutside.bind(this), true);
    }
  }

  handleClickOutside(event) {
    const domNode = ReactDOM.findDOMNode(this).parentNode;

    if (!domNode || !domNode.contains(event.target)) {
      this.props.onOutsideClick();
    }
  }
}

export default NotificationModal;
