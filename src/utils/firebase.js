import env from "../env";

async function request(url, method, body) {
  if (method[0] === "P") {
    return await fetch(url, {
      method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function signUp(email, password) {
  console.log("signup");
  const signupEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${env.apiKey}`;

  const res = await request(signupEndpoint, "POST", {
    email,
    password,
    returnSecureToken: true,
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

  const res = await request(loginEndpoint, "POST", {
    email,
    password,
    returnSecureToken: true,
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

  const res = await request(getIdTokenEndpoint, "POST", {
    grant_type: "refresh_token",
    refresh_token: localStorage.getItem("refreshToken"),
  });

  const tokens = await res.json();
  return tokens;
}

export async function getUser(tokens) {
  console.log("getusers");
  const getUserEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${env.apiKey}`;

  const res = await request(getUserEndpoint, "POST", {
    idToken: tokens.id_token,
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

  const res = await request(putMailEndpoint, "PUT", mail);

  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    alert(data.error.message);
  }
}

export async function getMail(email, id, isSend) {
  console.log("getmail");
  const shortEmail = short(email);
  const getMailEndpoint = `https://mail-e5cba-default-rtdb.firebaseio.com/${shortEmail}/${
    isSend ? "send" : "received"
  }/${id}.json`;

  const res = await request(getMailEndpoint, "GET");

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

  const res = await request(getMailsEndpoint, "GET");

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

  const res = await request(postFromMailsEndpoint, "POST", mail);

  if (!res.ok) {
    const data = await res.json();
    alert(data.error.message);
  }
}

async function postToMail(mail) {
  const shortToMail = short(mail.to);
  const postToMailsEndpoint = `https://mail-e5cba-default-rtdb.firebaseio.com/${shortToMail}/received.json`;

  const res = await request(postToMailsEndpoint, "POST", mail);

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
  const deleteReceivedMailEndpoint = `https://mail-e5cba-default-rtdb.firebaseio.com/${shortEmail}/received/${id}.json`;

  const res = await request(deleteReceivedMailEndpoint, "DELETE");

  if (!res.ok) {
    const data = await res.json();
    alert(data.error.message);
  }
}

export async function deleteSendMail(email, id) {
  const shortEmail = short(email);
  const deleteSendMailEndpoint = `https://mail-e5cba-default-rtdb.firebaseio.com/${shortEmail}/send/${id}.json`;

  const res = await request(deleteSendMailEndpoint, "DELETE");

  if (!res.ok) {
    const data = await res.json();
    alert(data.error.message);
  }
}
