export const createUserValidation = (body = {}, file = {}) => {
  const errors = {};

  if (!body?.fullName) {
    errors.fullName = true;
  }

  if (!body?.phoneNumber) {
    errors.phoneNumber = true;
  }

  if (!body?.email) {
    errors.email = true;
  }
  if (!body?.password) {
    errors.password = true;
  }
  return errors;
};
