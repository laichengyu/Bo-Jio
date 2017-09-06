import Facebook from './facebook';
import Category from './category';
import Event from './event';
var ReactGA = require('react-ga');

class Services {
  constructor(appId, accessToken, currentUserId) {
    this.facebook = new Facebook(appId, accessToken, currentUserId);
    this.category = new Category();
    this.event = new Event();
    this.ga = ReactGA;
    this.ga.initialize('UA-105976892-1', {
      debug: false,
      titleCase: false,
      gaOptions: {
        userId: currentUserId
      }
    });
  }
}

export default Services;
