export default {
  getUser: (state) => state.user,
  getUserById: (state) => (username) =>
    state.users.filter((user) => {
      return user.username === username;
    }),
  getUsers: (state) => state.users,
};
