import Facebook from './facebook';

class Services {
  constructor(accessToken, currentUserId) {
    this.facebook = new Facebook(accessToken, currentUserId);
  }
}

export default Services;