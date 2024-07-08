export const checkSignInData = (email, password) => {
  const isEmailValid =
    /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/.test(email);
  const isPasswordValid =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      password
    );

  if (!isEmailValid) return "E-Mail is Not Valid!";
  if (!isPasswordValid) return "Password is Not Valid!";

  return null;
};

export const checkSignUpData = (name, email, password) => {
  const isNameValid =
    /^[A-Za-z]([-']?[A-Za-z]+)*( [A-Za-z]([-']?[A-Za-z]+)*)+$/.test(name);
  const isEmailAndPasswordValid = checkSignInData(email, password);

  if (!isNameValid) return "Full Name is Not Valid!";
  if (isEmailAndPasswordValid !== null) return isEmailAndPasswordValid;

  return null;
};
