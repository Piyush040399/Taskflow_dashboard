const BASE_URL = "https://jsonplaceholder.typicode.com";

const request = async (endpoint, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error("Something went wrong. Please try again.");
  }

  // DELETE can sometimes return an empty response
  if (response.status === 204) {
    return null;
  }

  return response.json();
};

export const getTodos = async () => {
  return request("/todos?_limit=10");
};

export const getTodoById = async (id) => {
  return request(`/todos/${id}`);
};

export const createTodo = async (todo) => {
  return request("/todos", {
    method: "POST",
    body: JSON.stringify(todo),
  });
};

export const updateTodo = async (id, updates) => {
  return request(`/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });
};

export const deleteTodo = async (id) => {
  return request(`/todos/${id}`, {
    method: "DELETE",
  });
};