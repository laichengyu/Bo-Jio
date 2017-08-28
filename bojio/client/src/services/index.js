import Facebook from './facebook';
import Category from './category';
import Event from './event';

class Services {
  constructor(appId, accessToken, currentUserId) {
    this.facebook = new Facebook(appId, accessToken, currentUserId);
    this.category = new Category();
    this.event = new Event();
  }
}

export default Services;