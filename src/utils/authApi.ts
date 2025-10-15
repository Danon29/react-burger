import { customRequest } from "./http";
import { deleteCookie, getCookie, setCookie } from "./cookie";

export const saveTokens = (accessToken: string, refreshToken: string) => {
  setCookie("accessToken", accessToken, { path: "/", expires: 1200 });
  localStorage.setItem("refreshToken", refreshToken);
};

interface RefreshTokenResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

interface LoginResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
  };
}

interface LogoutResponse {
  success: boolean;
  message: string;
}

interface ForgotPasswordResponse {
  success: string;
  message: string;
}

interface GetUserData {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  name: string;
}

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) throw new Error("Token Error");

  const response = await customRequest<RefreshTokenResponse>("/auth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: refreshToken }),
  });

  if (response.success) {
    setCookie("accessToken", response.accessToken, {
      path: "/",
      expires: 1200,
    });
    localStorage.setItem("refreshToken", response.refreshToken);
  }
};

export async function fetchWithAuth<T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const accessToken = getCookie("accessToken");

  let headers = {
    ...options.headers,
    Authorization: accessToken || "",
    "Content-Type": "application/json",
  };

  try {
    return await customRequest<T>(endpoint, { ...options, headers });
  } catch (error) {
    if ((error as { message: string }).message === "jwt expired") {
      await refreshToken();
      return customRequest(endpoint, { ...options, headers });
    }
    return Promise.reject(error);
  }
}

export const login = async ({ email, password }: LoginData) => {
  const result = await customRequest<LoginResponse>("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (result.success) {
    saveTokens(result.accessToken, result.refreshToken);
  }
  return result;
};

export const register = async ({ email, password, name }: RegisterData) => {
  const result = await customRequest<LoginResponse>("/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name }),
  });

  if (result.success) {
    saveTokens(result.accessToken, result.refreshToken);
  }
  return result;
};

export const logout = async () => {
  const token = localStorage.getItem("refreshToken");

  if (token) {
    const result = await fetchWithAuth<LogoutResponse>("/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token }),
    });

    if (result.success) {
      deleteCookie("accessToken");
      localStorage.removeItem("refreshToken");
    }

    return result;
  }

  return Promise.reject("no token");
};

export const forgotPassword = async (email: string) => {
  return await customRequest<ForgotPasswordResponse>("/password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  });
};

export const resetPasword = async ({
  password,
  code,
}: {
  password: string;
  code: string;
}) => {
  return await customRequest<ForgotPasswordResponse>("/password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: password, token: code }),
  });
};

export const getUserData = async () => {
  const result = await fetchWithAuth<GetUserData>("/auth/user", {
    method: "GET",
  });

  if (!result.success) {
    deleteCookie("accessToken");
    localStorage.removeItem("refreshToken");
  }

  return result;
};

export const updateUserData = async (data: RegisterData) => {
  const result = await fetchWithAuth("/auth/user", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!result.success) {
    deleteCookie("accessToken");
    localStorage.removeItem("refreshToken");
  }
  return result;
};
