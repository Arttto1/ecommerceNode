function inputIsEmpty(value) {
  return !value || value.trim() === "";
}

function userDetailAreValid(email, password, name, street, postal, city) {
  return (
    email &&
    email.includes("@") &&
    password &&
    password.trim().length > 5 &&
    !inputIsEmpty(name) &&
    !inputIsEmpty(street) &&
    !inputIsEmpty(postal) &&
    !inputIsEmpty(city)
  );
}

function validConfirmEmail (email, confirmEmail) {
  return email === confirmEmail
}

module.exports = {userDetailAreValid, validConfirmEmail}