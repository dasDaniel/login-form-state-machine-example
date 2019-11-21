const delay = 600;

const Request = {
  /**
   * Login user.
   * @param {Object} payload
   * @param {string} payload.username
   * @param {string} payload.password
   * @returns {Promise} returns `token`, and `updatePassword` if reset is required
   */
  login: ({ username, password }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username.includes('err')) {
          reject({
            message: 'invalid username/password',
          });
        } else if (username.includes('exp')) {
          resolve({
            token: '8h980hj982s2',
            updatePassword: true,
          });
        } else {
          resolve({
            token: 'a78h192dj892',
          });
        }
      }, delay);
    });
  },
  /**
   * Update user password.
   * @param {Object} payload
   * @param {string} payload.username
   * @param {string} payload.password
   * @param {string} payload.newPassword
   * @returns {Promise} returns `token`
   */
  updatePassword: ({ username, password, newPassword }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (password === newPassword) {
          reject({
            message: 'passwords cannot be same',
          });
        } else {
          resolve({
            token: '09jk01290sm1',
          });
        }
      }, delay);
    });
  },
};

export default Request;
