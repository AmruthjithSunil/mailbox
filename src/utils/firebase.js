import env from "../env";

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

export async function login(email, password) {
  const loginEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${env.apiKey}`;

  const res = await fetch(loginEndpoint, {
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

export async function getTokens() {
  const getIdTokenEndpoint = `https://securetoken.googleapis.com/v1/token?key=${env.apiKey}`;
  const response = await fetch(getIdTokenEndpoint, {
    method: "POST",
    body: JSON.stringify({
      grant_type: "refresh_token",
      refresh_token: localStorage.getItem("refreshToken"),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const tokens = await response.json();
  return tokens;
}

export async function getUser(tokens) {
  const getUserEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${env.apiKey}`;
  const res = await fetch(getUserEndpoint, {
    method: "POST",
    body: JSON.stringify({
      idToken: tokens.id_token,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    alert(data.error.message);
  }
}

function short(email) {
  return email.replaceAll("@", "").replaceAll(".", "");
}

export async function getMails(email) {
  const shortEmail = short(email);
  const getMailsEndpoint = `https://mail-e5cba-default-rtdb.firebaseio.com/${shortEmail}.json`;
  const res = await fetch(getMailsEndpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const mails = await res.json();
  if (res.ok) {
    return mails;
  } else {
    alert(mails.error.message);
  }
}

async function postFromMail(fromMail, mail) {
  const shortFromMail = short(fromMail);
  const postFromMailsEndpoint = `https://mail-e5cba-default-rtdb.firebaseio.com/${shortFromMail}/send.json`;
  const res = await fetch(postFromMailsEndpoint, {
    method: "POST",
    body: JSON.stringify(mail),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function postToMail(toMail, mail) {
  const shortToMail = short(toMail);
  const postToMailsEndpoint = `https://mail-e5cba-default-rtdb.firebaseio.com/${shortToMail}/received.json`;
  const res = await fetch(postToMailsEndpoint, {
    method: "POST",
    body: JSON.stringify(mail),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function postMail(fromMail, toMail, mail) {
  await postFromMail(fromMail, mail);
  await postToMail(toMail, mail);
}
