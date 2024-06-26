const baseURL = import.meta.env.VITE_API_URL;

export const fetchSinToken = (endpoint, data, method = 'GET') => {
  const url = `${baseURL}/${endpoint}`;
  if (method === 'GET') {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
};

export const fetchConToken = (endpoint, data, method = 'GET') => {
  const url = `${baseURL}/${endpoint}`;
  const token = localStorage.getItem('token') || '';
  if (method === 'GET') {
    return fetch(url, {
      method,
      headers: {
        'x-token': token,
      },
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        'content-type': 'application/json',
        'x-token': token,
      },
      body: JSON.stringify(data),
    });
  }
};
