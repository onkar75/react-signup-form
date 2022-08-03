export const validateForm = (values) => {
  const error = {};

  const emailRegex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.{8,})$/;

  if (!values.firstName) {
    error.firstName = "First name is required";
  }

  if (!values.lastName) {
    error.lastName = "Last name is required";
  }

  if (!values.email) {
    error.email = "Email is required";
  } else if (!emailRegex.test(values.email)) {
    error.email = "This is not a valid email format!";
  }

  if (!values.password) {
    error.password = "Password is required";
  }
  if (
    values.password &&
    (values.password
      .toLowerCase()
      .includes(values.firstName.trim().toLowerCase()) ||
      values.password
        .toLowerCase()
        .includes(values.lastName.trim().toLowerCase))
  ) {
    error.password = "Password should not conatins users name";
  }
  if (!passwordRegex.test(values.password)) {
    error.password = "Password is not valid";
  }

  return error;
};
