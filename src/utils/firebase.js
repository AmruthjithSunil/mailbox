import env from "../env";

export async function signUp(email, password) {
  console.log("signup");
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
  console.log("login");
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
  console.log("gettokens");
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
  console.log("getusers");
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

export async function putMail(email, id, mail) {
  const shortEmail = short(email);
  const putMailEndpoint = `https://mail-e5cba-default-rtdb.firebaseio.com/${shortEmail}/received/${id}.json`;
  const res = await fetch(putMailEndpoint, {
    method: "PUT",
    body: JSON.stringify(mail),
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

export async function getMail(email, id) {
  console.log("getmail");
  const shortEmail = short(email);
  const getMailEndpoint = `https://mail-e5cba-default-rtdb.firebaseio.com/${shortEmail}/received/${id}.json`;
  const res = await fetch(getMailEndpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const mail = await res.json();
  if (res.ok) {
    return mail;
  } else {
    alert(mail.error.message);
  }
}

export async function getMails(email) {
  console.log("getmail");
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

async function postFromMail(mail) {
  const shortFromMail = short(mail.from);
  const postFromMailsEndpoint = `https://mail-e5cba-default-rtdb.firebaseio.com/${shortFromMail}/send.json`;
  const res = await fetch(postFromMailsEndpoint, {
    method: "POST",
    body: JSON.stringify(mail),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const data = await res.json();
    alert(data.error.message);
  }
}

async function postToMail(mail) {
  const shortToMail = short(mail.to);
  const postToMailsEndpoint = `https://mail-e5cba-default-rtdb.firebaseio.com/${shortToMail}/received.json`;
  const res = await fetch(postToMailsEndpoint, {
    method: "POST",
    body: JSON.stringify(mail),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const data = await res.json();
    alert(data.error.message);
  }
}

export async function postMail(mail) {
  console.log("postmail");
  await postFromMail(mail);
  await postToMail(mail);
}

export async function deleteReceivedMail(email, id) {
  const shortEmail = short(email);
  const deleteMailEndpoint = `https://mail-e5cba-default-rtdb.firebaseio.com/${shortEmail}/received/${id}.json`;
  const res = await fetch(deleteMailEndpoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const data = await res.json();
    alert(data.error.message);
  }
}
