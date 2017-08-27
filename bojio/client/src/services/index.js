import Facebook from './facebook';
import Category from './category';

class Services {
  constructor(accessToken, currentUserId) {
    this.facebook = new Facebook(accessToken, currentUserId);
    this.category = new Category();
  }
}

export default Services;