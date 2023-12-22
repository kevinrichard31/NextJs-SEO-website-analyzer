const baseUrl = "http://127.0.0.1:3001";

export const getAllTodos = async () => {
  try {
    const res = await fetch(`${baseUrl}/tasks`, {"cache": 'no-store'});
    if (!res.ok) {
      throw new Error(`Failed to fetch todos: ${res.status}`);
    }

    const todos = await res.json();
    return todos;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error; // Re-throw the error to be handled by the calling code
  }
};

export const addUrl = async (url:any) => {
  try {
    const res = await fetch(`${baseUrl}/addUrl`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({url}),
    });

    if (!res.ok) {
      throw new Error(`Failed to add todo: ${res.status}`);
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error; // Re-throw the error to be handled by the calling code
  }
};