export const isValidPhoneNumber = (number) => {
  const phoneRegex = /^\d{10}$/;
  if (phoneRegex.test(number)) {
    return true;
  } else {
    return false;
  }
};

export const isValidEmail = (email) => {
  const emailRegex = /[^@]+@[^@]+\.[^@]+/;
  if (emailRegex.test(email)) {
    return true;
  }
  return false;
};
