export const addUserToLocalStorage = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem("user");
  const user = result ? JSON.parse(result) : null;
  return user;
};
export const updateLocalStorageToken = (token: any) => {
  // let user = getUserFromLocalStorage();
  // user.access_token = token.access_token;
  // user.refresh_token = token.refresh_token;
  // localStorage.setItem("user", JSON.stringify(user));

  localStorage.setItem("user", JSON.stringify(token));
};
