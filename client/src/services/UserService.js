import axios from "axios";

export async function createNotes(newNote, email) {
  console.log("NEW NOTES " + JSON.stringify(newNote));
  const response = axios({
    method: "post",
    url: `/api/users/${email}`,
    data: { note: newNote },
  });

  return await response;
}

export async function deleteNoteById(data, email) {
  console.log("DELETE IS CALLEd" + JSON.stringify(data));

  const response = axios({
    method: "delete",
    url: `/api/users/${email}`,
    data,
  });
  return response;
}

export  function loginData(data) {
  const response = axios({
    method: "post",
    url: "/login",
    data,
  });
  return  response;
}

export async function registerData(data) {
  const response = axios({
    method: "post",
    url: "/register",
    data,
  });
  return await response;
}

export async function GLogin(googleData) {
  return await axios({
    method: "post",
    url: "/api/googleLogin",
    data: {
      tokenId: googleData.tokenId,
      googleId: googleData.googleId,
      email: googleData.profileObj.email,
    },
  });
}

export async function FLogin(facebookData) {
  console.log("GOOGLE DATA  " + facebookData);

  return await axios({
    method: "post",
    url: "/api/facebookLogin",
    data: {
      accessToken: facebookData.accessToken,
      userID: facebookData.userID,
      name: facebookData.name,
    },
  });
}

export async function resetPassword(resetDetails) {
  return await axios({
    method: "patch",
    url: "/forgotPass",
    data: {
      email: resetDetails.email,
      password: resetDetails.password,
    },
  });
}

export async function getAllNotes(email) {
  return await axios.get(`api/users/${email}`);
}
