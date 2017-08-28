import Facebook from './facebook';
import Category from './category';

class Services {
  constructor(appId, accessToken, currentUserId) {
    this.facebook = new Facebook(appId, accessToken, currentUserId);
    this.category = new Category();
  }
}

export default Services;