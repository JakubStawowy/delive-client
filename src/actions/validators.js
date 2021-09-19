export const validateEmail = email => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
export const validatePassword = password =>/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password);
export const validateConfirmedPassword = (password, confirmedPassword) => password === confirmedPassword;
export const validateNumberFormat = number => /^\d+(\.\d*)?\d?$/.test(number);
export const validateEmptyString = string => string !== '';
export const validateDateTimeFormat = dateTime => /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/.test(dateTime);
