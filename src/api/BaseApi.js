export default class BaseApi {
  // constructor() {
  //   this.baseURL = "https://www.googleapis.com/books/v1/volumes?";
  // }

  async checkStatus(response) {
    try {
      if (response.status !== 200) {
        // const json = await response.json();
        throw new Error();
      }
      return await response.json();
    } catch (e) {
      throw e;
    }
  }

  async myFetch(url, params = {}) {
    const options = {
      method: params.method || "GET",
      headers: {
        ...params.headers,
      },

      body: params.body,
    };
    const response = await fetch(url, options);
    return await this.checkStatus(response);
  }
}
