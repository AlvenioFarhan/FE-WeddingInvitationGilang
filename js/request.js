export const HTTP_GET = "GET";
export const HTTP_POST = "POST";
export const HTTP_PUT = "PUT";
export const HTTP_PATCH = "PATCH";
export const HTTP_DELETE = "DELETE";

export const request = (method, path) => {
  let url = document.querySelector("body").getAttribute("data-url");
  let req = {
    method: method,
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
    mode: "no-cors", // You can change to 'no-cors' if necessary, but it has limitations
  };

  if (url.slice(-1) === "/") {
    url = url.slice(0, -1);
  }

  return {
    then(...params) {
      return fetch(url + path, req)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((res) => {
          if (res.error) {
            throw new Error(res.error[0]);
          }
          return res;
        })
        .then(...params)
        .catch((err) => alert(err.message));
    },
    download(...params) {
      return fetch(url + path, req)
        .then((res) => {
          if (res.status === 200) {
            return res;
          }
          throw new Error(`HTTP error! status: ${res.status}`);
        })
        .then(...params)
        .catch((err) => alert(err.message));
    },
    token(token) {
      if (token.split(".").length === 3) {
        req.headers.set("Authorization", "Bearer " + token);
      } else {
        req.headers.set("x-access-key", token);
      }
      return this;
    },
    body(body) {
      req.body = JSON.stringify(body);
      return this;
    },
  };
};
