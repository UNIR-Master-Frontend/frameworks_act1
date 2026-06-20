import { API_BASE_URL } from "@/constants/url";

/**
 * Servicio de autenticación
 * @param {Object} body 
 */
export const login = async (body) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      
      const errorData = await response.json();
      throw new Error(errorData.message || "Error en la autenticación");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en login service:", error);
    throw error;
  }
};