const regEx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

module.exports = emails => {
  const invalidEmails = emails
    .split(",")
    .map(email => email.trim())
    .filter(email => !regEx.test(email));

  if (invalidEmails.length) {
    return `Please provide valid emails: ${invalidEmails}`;
  }

  return;
};
