import React, { Component } from 'react';
import { Feed, Card } from 'semantic-ui-react';
import './NotificationModal.css';

class NotificationModal extends Component {
  state = {
    image: "https://cdn0.vox-cdn.com/images/verge/default-avatar.v989902574302a6378709709f7baab789b242ebbb.gif"
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
}

export default NotificationModal;
