export const baseUrl = "http://127.0.0.1:3001";

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

export const getIssues = async (siteId: string) => {
  try {
    const res = await fetch(`${baseUrl}/getIssuesHomepage/${siteId}`, {"cache": 'no-store'});
    if (!res.ok) {
      throw new Error(`Failed to fetch issues: ${res.status}`);
    }

    const results = await res.json();
    return results;
  } catch (error) {
    console.error("Error fetching issues:", error);
    throw error; // Re-throw the error to be handled by the calling code
  }
};

export const register = async (formData:any) => {

  try {
    const res = await fetch(`${baseUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error(`Failed to register user: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const login = async (credentials: { email: string, password: string }) => {
  try {
      const response = await fetch(`${baseUrl}/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
      });
      return await response.json();
  } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
  }
};