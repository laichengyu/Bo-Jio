class Facebook {
  FACEBOOK_API_URL = 'https://graph.facebook.com/v2.10/';

  constructor(appId, accessToken, currentUserId) {
    this.appId = appId;
    this.accessToken = accessToken;
    this.currentUserId = currentUserId;
  }

  _buildURL(url, params) {
    var esc = encodeURIComponent;
    var query = Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');
    return `${url}?${query}`;
  }

  userInfo(facebookId) {
    facebookId = facebookId || this.currentUserId;
    return fetch(this._buildURL(`${this.FACEBOOK_API_URL}/${facebookId}`, {
      access_token: this.accessToken,
      fields: 'id, name, first_name, last_name, picture'
    }))
      .then(res => res.json())
      .then(data => {
        return {
          id: data.id,
          name: data.name,
          firstName: data.first_name,
          lastName: data.last_name,
          pictureUrl: data.picture.data.url
        }
      });
  }

  friendList() {
    return fetch(this._buildURL(`${this.FACEBOOK_API_URL}/me/friends`, {
      access_token: this.accessToken,
      fields: 'id, name, first_name, last_name, picture'
    }))
      .then(res => res.json())
      .then(data => data.data.map(data => {
        return {
          id: data.id,
          name: data.name,
          firstName: data.first_name,
          lastName: data.last_name,
          pictureUrl: data.picture.data.url
        }
      }));
  }
}

export default Facebook;
