export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('token', token);
    localStorage.setItem('isAdmin', 'false');
  } else {
    localStorage.removeItem('token');
  }
};

// export const getRole = (token: string) => {
//   const res = useJwt(token);
//
//   // const user = res.user as User;
//   // if (isExpired || !user?.isAdmin) {
//   //   return <Navigate to="/login" />;
//   // }
// };
