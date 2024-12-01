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
  makeRequest(`/api/createUser`, { addr });
};

export const createMiniGov = async (
  name: string,
  address: string,
  expirationDate: number,
) => {
  const response = await makeRequest(`/api/createMiniGov`, {
    name,
    address,
    expirationDate,
  });
  const miniGov = JSON.parse(response.miniGov);
  return miniGov;
};

export const getAllMiniGov = async () => {
  const response = await makeRequest(`/api/getAllMiniGov`, {});
  const miniGov = JSON.parse(response.miniGovs);
  return miniGov;
};

export const updateDB = async (addr: string) => {
  makeRequest(`/api/updateDB`, addr);
};
