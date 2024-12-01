export const makeRequest = async (url: string, body: any) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    const { message, error } = json;
    if (message) {
      console.log(message);
      return json;
    } else {
      console.log(error);
      return error;
    }
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

export const createUser = async (addr: string) => {
  const response = await makeRequest(`/api/createUser`, { addr });
  return { name: response.name, message: response.message };
};

export const createAction = async (
  hash: string,
  index: number,
  type: string
) => {
  makeRequest(`/api/createAction`, { hash, index, type });
};

export const createMiniGov = async (
  address: string,
  name: string,
  token: string,
  expirationDate: number
) => {
  const response = await makeRequest(`/api/createMiniGov`, {
    address,
    name,
    token,
    expirationDate,
  });
  const miniGov = JSON.parse(response.miniGov);
  return miniGov;
};

export const getAllMiniGovs = async () => {
  const response = await makeRequest(`/api/getAllMiniGovs`, []);
  const miniGov = JSON.parse(response.miniGovs);
  return miniGov;
};

export const joinMiniGov = async (address: string, name: string) => {
  makeRequest(`/api/joinMiniGov`, { address, name });
};

export const updateDB = async (addr: string) => {
  makeRequest(`/api/updateDB`, addr);
};
