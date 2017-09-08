import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Feed, Card } from 'semantic-ui-react';
import './NotificationModal.css';

class NotificationModal extends Component {
  state = {
    notifications: [],
    notificationsCount: 0
  }

  render() {
    return (
      <Card className={"NotificationModal" + (!this.props.open ? " NotificationModal--hidden" : "")}>
        <Card.Content>
          <Card.Header>
            Notifications
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Feed>
            <Feed.Event>
              <Feed.Label image='https://cdn0.vox-cdn.com/images/verge/default-avatar.v989902574302a6378709709f7baab789b242ebbb.gif' />
              <Feed.Content>
                <Feed.Date content='1 day ago' />
                <Feed.Summary>
                  You added <a>Jenny Hess</a> to your <a>coworker</a> group.
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label image='https://cdn0.vox-cdn.com/images/verge/default-avatar.v989902574302a6378709709f7baab789b242ebbb.gif' />
              <Feed.Content>
                <Feed.Date content='3 days ago' />
                <Feed.Summary>
                  You added <a>Molly Malone</a> as a friend.
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>

            <Feed.Event>
              <Feed.Label image='https://cdn0.vox-cdn.com/images/verge/default-avatar.v989902574302a6378709709f7baab789b242ebbb.gif' />
              <Feed.Content>
                <Feed.Date content='4 days ago' />
                <Feed.Summary>
                  You added <a>Elliot Baker</a> to your <a>musicians</a> group.
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        </Card.Content>
      </Card>
    );
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside.bind(this), true);

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
    document.removeEventListener('click', this.handleClickOutside.bind(this), true);
  }

  handleClickOutside(event) {
    const domNode = ReactDOM.findDOMNode(this);

    if (!domNode || !domNode.contains(event.target)) {
      this.props.onOutsideClick();
    }
  }
}

export default NotificationModal;
