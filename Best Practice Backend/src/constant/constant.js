const ENV = (process?.env || {});
const INTERNAL_SERVER_ERROR="Internal server error, please try later";
const INCORRECT_EMAIL_PASSWORD="email or password incorrect";
export {
    ENV,
    INTERNAL_SERVER_ERROR,
    INCORRECT_EMAIL_PASSWORD,
}