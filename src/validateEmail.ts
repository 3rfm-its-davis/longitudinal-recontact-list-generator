import validator from "validator";

export function validateEmail(emails: string[]): string {
  return emails.reduce((acc, email) => {
    return validator.isEmail(email)
      ? validator.normalizeEmail(email, {
          all_lowercase: true,
          gmail_remove_dots: true,
        }) || acc
      : acc;
  }, "");
}
