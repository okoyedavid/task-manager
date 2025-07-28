export class HandleApiCalls {
  constructor(url) {
    // not sure but i think am assigning url to the global this.url
    this.url = url;
  }

  async fetchAuthData(subroute, method, updates, retryCount = 0) {
    const options = {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    if (updates && method !== "GET") {
      options.body = JSON.stringify({ updates });
    }

    const res = await fetch(`${this.url}${subroute}`, {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ updates }),
    });

    if (res.ok) {
      return res;
    }

    if (res.status === 401) {
      console.error("please specify authorization");
      throw new Error("headers not specified");
    }

    if (res.status === 403) {
      if (retryCount >= 10) {
        throw new Error("Max retry limit reached");
      }

      const refreshResponse = await fetch(`${this.url}/refresh`, {
        method: "GET",
        credentials: "include", // send httpOnly cookie
      });

      if (refreshResponse.ok) {
        const { accessToken: newAccessToken } = await refreshResponse.json();
        localStorage.setItem("token", newAccessToken);

        // Retry original request with new access token
        return this.fetchAuthData(subroute, updates, retryCount + 1);
      }
    } else {
      return res;
    }
  }

  async fetchData(subroute, method = "GET") {
    try {
      const res = await fetch(`${this.url}${subroute}`, {
        method,
      });

      const data = await res.json();
      if (res.ok) {
        return data;
      }

      if (!res.ok) {
        console.error("failed to fetch data");
        throw new Error(`Failed Status:${res.status}`);
      }
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}

const api = new HandleApiCalls("http://localhost:4000");
export default api;
