const localUrl = "http://localhost:8000/chat/";
const Baseurl = "https://bableon-django-1193e2d277c3.herokuapp.com";

export const getMoviesFromApiAsync = async () => {
  return await fetch(`${Baseurl}/?page=2`);
};

export const verifyMobileNumber = async (postData) => {
  return await fetch(`${Baseurl}/chat/register/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
};
export const verifyMobileOTP = async (postData) => {
  return await fetch(`${Baseurl}/chat/verify-otp/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
};
export const setUsernameAndLang = async (postData) => {
  const payload = {
    username: postData.username,
  };
  return await fetch(`${Baseurl}/chat/set-username/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${postData.ssoToken}`,
    },
    body: JSON.stringify(payload),
  });
};
export const createChat = async (postData) => {
  const payload = {
    req_type: postData.linkType,
  };
  return await fetch(`${Baseurl}/chat/createrequest/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${postData.access}`,
    },
    body: JSON.stringify(payload),
  });
};
export const createGroupChat = async (postData) => {
  const payload = {
    name: postData.name,
    description: postData.description,
    req_type: postData.linkType,
  };
  return await fetch(`${Baseurl}/chat/createGroup/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${postData.access}`,
    },
    body: JSON.stringify(payload),
  });
};
export const acceptRequest = async (postData) => {
  console.log("accept single req called");
  const payload = {
    request_id: postData.request_id,
  };
  return await fetch(`${Baseurl}/chat/acceptrequest/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${postData.ssoToken}`,
    },
    body: JSON.stringify(payload),
  });
};
export const acceptGroupRequest = async (postData) => {
  console.log("accept acceptGroupRequest called");
  const payload = {
    group_id: postData.request_id,
  };
  return await fetch(`${Baseurl}/chat/joinGroup/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${postData.ssoToken}`,
    },
    body: JSON.stringify(payload),
  });
};
export const connectionStatus = async (postData) => {
  const payload = {
    request_id: postData.request_id,
  };
  return await fetch(`${Baseurl}/chat/connectionStatus/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${postData.ssoToken}`,
    },
    body: JSON.stringify(payload),
  });
};
