function checkAdminSecret(e) {
  var secret = $os.getenv("CHAT_ADMIN_SECRET") || "";
  var headers = e.requestInfo().headers || {};
  var header =
    headers["X-Admin-Secret"] ||
    headers["x-admin-secret"] ||
    headers["x_admin_secret"] ||
    "";
  return secret && String(header) === secret;
}

module.exports = {
  checkAdminSecret: checkAdminSecret,
};
