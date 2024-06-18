import ThemeContext from "./context/context";
import { useContext, useEffect } from "react";
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

export const login = async (formData:any) => {
  try {
      const response = await fetch(`${baseUrl}/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
      });
      return await response.json();
  } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
  }
};

export const fetchUserInfo = async () => {

  const token = localStorage.getItem('token');
  if (!token) {
      return false;
  }
  const response = await fetch(`${baseUrl}/userInfo`, {
    headers: {
      'x-access-token': token,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};