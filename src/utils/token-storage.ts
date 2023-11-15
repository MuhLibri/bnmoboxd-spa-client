export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

export const getProfilePicturePath = () => {
  return localStorage.getItem('profile_picture');
};

export const setProfilePicturePath = (path: string) => {
  localStorage.setItem('profile_picture', path);
};

export const getUsername = () => {
  return localStorage.getItem('username');
};

export const setUsername = (username: string) => {
  localStorage.setItem('username', username);
};
