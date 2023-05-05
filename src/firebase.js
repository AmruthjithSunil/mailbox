import env from "./env";

export async function signUp(email, password) {
  const signupEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${env.apiKey}`;

  const res = await fetch(signupEndpoint, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (res.ok) {
    console.log("User has successfully signed up/logged in");
    localStorage.setItem("refreshToken", data.refreshToken);
    return data;
  }
  const errorMessage = data.error.message
    ? data.error.message
    : "Authentication Failed";
  alert(errorMessage);
}
