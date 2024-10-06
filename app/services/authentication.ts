import { redirect } from "@remix-run/node";
import { jwtDecode } from "jwt-decode";
import { authCookie } from "~/utils/cookie";

const API_BASE_URL = "http://localhost:8000/api";

const isTokenExpired = (token: string) => {
  const decoded: { exp: number } = jwtDecode(token); // decoding the token
  const currentTime = Math.floor(Date.now() / 1000);

  return decoded.exp < currentTime; // check if the time is expired
};

async function CheckToken(request: Request) {
  const cookieHeader = request.headers.get("Cookie");
  const tokens = await authCookie.parse(cookieHeader);

  if (!tokens || isTokenExpired(tokens.refresh)) {
    console.error("Session is expired. Please log in again.");
    return redirect("/auth");
  } else if (isTokenExpired(tokens.access)) {
    // Refresh access token
    await RefreshToken(tokens.refresh);
  }

  return null; // Returns `null` if no redirect is needed
}

async function RefreshToken(refresh: string) {
  const data = await API("/token/refresh/", "POST", { refresh });

  return data;
}

async function API(
  url: string,
  method: string,
  body?: object,
  request?: Request,
  requiresAuth = false
) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (requiresAuth && request) {
    await CheckToken(request);

    // Get the new access token after refreshing
    const cookieHeader = request.headers.get("Cookie");
    const tokens = await authCookie.parse(cookieHeader);
    if (tokens && tokens.access) {
      headers["Authorization"] = `Bearer ${tokens.access}`;
    }
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.detail || "Something went wrong");
  }

  return data;
}

async function SignUp(username: string, password: string, request: Request) {
  return API("/signup/", "POST", { username, password }, request);
}

async function Login(username: string, password: string, request: Request) {
  const data = await API(
    "/login/",
    "POST",
    {
      username,
      password,
    },
    request
  );

  // Set tokens in the cookie
  const cookieHeader = await authCookie.serialize({
    access: data.access,
    refresh: data.refresh,
  });

  return {
    tokenData: data,
    cookieHeader,
  };
}

async function DeleteAccount(request: Request) {
  return API("/delete/", "DELETE", undefined, request, true);
}

async function Logout() {
  return await authCookie.serialize({}, { expires: new Date(0) });
}

export { CheckToken, SignUp, Login, DeleteAccount, Logout };
