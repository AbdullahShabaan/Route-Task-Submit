const GetUser = async (id) => {
  const req = await fetch(
    `https://my-json-server.typicode.com/AbdullahShabaan/Transaction-Server/customers?id=${id}`
  );
  const data = req.json();
  return data;
};

export default GetUser;
