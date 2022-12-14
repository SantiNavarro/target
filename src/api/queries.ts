import axios from "axios";

const baseUrl = "";
const baseHeaders = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};
export const signInRequest = async (email: string, password: string) => {
  const body = {
    user: {
      email,
      password,
    },
  };
  const response = await axios.post(
    `${baseUrl}/api/v1/users/sign_in`,
    body,
    baseHeaders
  );
  return response;
};

export const signUpRequest = async (
  email: string,
  password: string,
  name: string
) => {
  const body = {
    user: {
      email,
      password,
      name,
    },
  };
  const response = await axios.post(`${baseUrl}/auth`, body, baseHeaders);
  return response;
};
