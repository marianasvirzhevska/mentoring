export const Methods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const request = (
  url: string,
  method: string,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  bodyParams?: any,
): Promise<Response> => {
  return fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: bodyParams ? JSON.stringify(bodyParams) : undefined,
  });
};

function getUrlToken(): string | undefined {
  const storageUser = localStorage.getItem('user');
  if (storageUser) {
    const user = JSON.parse(storageUser);
    return `?secret_token=${user}`;
  }

  return;
}

export const requestWithToken = (
  url: string,
  method: string,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  bodyParams: any,
): Promise<Response> => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: bodyParams ? JSON.stringify(bodyParams) : undefined,
  };
  const urlWithToken = `${url}${getUrlToken()}`;
  return fetch(urlWithToken, config);
};
