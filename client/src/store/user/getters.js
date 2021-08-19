export default {
  getUser: (state) => state.user,
  isLoggedIn: (state) =>
    state.user && state.user.username && state.user.username !== ""
      ? true
      : false,
};
