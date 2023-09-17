const BASE_URL = 'http://localhost:4000/api/v1';

async function GetRequest(endpoint) {
  const response = await fetch(`${BASE_URL}/${endpoint}`);

  if (response.status != 404) {
    return response.json();
  } else {
    throw new Error(`Error fetching data from ${endpoint}`);
  }
}

async function PostRequest(endpoint, data) {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.status != 404) {
    return response.json();
  } else {
    throw new Error(`Error posting data to ${endpoint}`);
  }
}

async function PutRequest(endpoint, data) {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`Error updating data at ${endpoint}`);
  }
}

async function DeleteRequest(endpoint) {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'DELETE',
  });

  if (response.status == 204 ) {
    return response.status;
  } else {
    throw new Error(`Error deleting data at ${endpoint}`);
  }
}

export { GetRequest, PostRequest, PutRequest, DeleteRequest};