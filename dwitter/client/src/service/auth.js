export default class AuthService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async signup(username, password, name, email, url) {
    const data = await this.http.fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        name,
        email,
        url
      }),
    });

    // 패치응답이 성공적이면 res로 username, token 받아오므로 data에 token 담겨있음
    this.tokenStorage.saveToken(data.token);
    return data;
  }

  async login(username, password) {
    const data = await this.http.fetch('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    })

    this.tokenStorage.saveToken(data.token);
    return data;
  }

  async me() {
    const token = this.tokenStorage.getToken();
    return this.http.fetch('/auth/me', {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    })
  }

  async logout() {
    this.tokenStorage.clearToken();
  }
}
