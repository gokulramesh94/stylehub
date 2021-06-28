let users = JSON.parse(localStorage.getItem("users")) || [];

export default class userService {
  static login = async (username, password) => {
    try {
      console.log(users);
      for (let index in users) {
        if (
          users[index].username === username &&
          users[index].password === password
        ) {
          return true;
        }
      }
      return false;
    } catch (error) {
      console.log("Error - userService -> login : ", error);
    }
  };
}
