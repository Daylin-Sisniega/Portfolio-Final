// const auth = {
//   authenticate(jwt, cb) {
//     if (typeof window !== 'undefined') {
//       localStorage.setItem('jwt', JSON.stringify(jwt));
//     }
//     cb && cb();
//   },
//   isAuthenticated() {
//     if (typeof window === 'undefined') return false;
//     const jwt = localStorage.getItem('jwt');
//     return jwt ? JSON.parse(jwt) : false;
//   },
//   clearJWT(cb) {
//     if (typeof window !== 'undefined') {
//       localStorage.removeItem('jwt');
//     }
//     cb && cb();
//   },
// };
// export default auth;
// src/auth/auth-helper.js
const key = 'jwt';

const auth = {
  authenticate(data, cb) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data)); // {token, user}
    }
    cb && cb();
  },
  isAuthenticated() {
    if (typeof window === 'undefined') return false;
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : false;
  },
  clearJWT(cb) {
    if (typeof window !== 'undefined') localStorage.removeItem(key);
    cb && cb();
  }
};

export default auth;
