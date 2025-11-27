
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
