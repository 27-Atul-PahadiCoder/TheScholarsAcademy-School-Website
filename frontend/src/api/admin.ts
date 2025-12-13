import { request, setAdminToken, clearAdminToken, getAdminToken } from "./http";

export type AdminLoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
};

export async function loginAdmin(email: string, password: string) {
  // Mocking the API call to allow frontend-only development
  if (email === "founder@school.com" && password === "schol@r2025") {
    const mockResponse = {
      token: "mock-admin-token",
      user: {
        id: "1",
        email: "founder@school.com",
        name: "Super Admin",
        role: "admin",
      },
    };
    setAdminToken(mockResponse.token);
    // Simulate a delay to make it seem like a real API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockResponse;
  } else {
    // Simulate a delay and then throw an error
    await new Promise(resolve => setTimeout(resolve, 1000));
    throw new Error("Invalid credentials");
  }
}

export function logoutAdmin() {
  clearAdminToken();
  sessionStorage.removeItem("admin-authenticated");
}

export function hasAdminSession() {
  return Boolean(
    getAdminToken() && sessionStorage.getItem("admin-authenticated") === "true"
  );
}
