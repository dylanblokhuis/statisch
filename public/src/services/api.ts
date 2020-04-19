// eslint-disable-next-line consistent-return
async function client(endpoint: string, config?: RequestInit) {
  const token = window.localStorage.getItem('statisch_token');

  // await sleep(1250);

  if (!config) {
    config = {
      headers: {},
    };
  }

  if (!config.headers) {
    config.headers = {};
  }

  if (token) {
    // @ts-ignore
    config.headers.Authorization = token;
  }

  // @ts-ignore
  config.headers.Accept = 'application/json';

  try {
    const response = await fetch(
      endpoint,
      config,
    );

    if (response.ok) {
      return response.json();
    }

    Error(`${response.status} ${response.statusText}`);
  } catch (e) {
    throw new Error(e);
  }
}

// eslint-disable-next-line
function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export default client;
