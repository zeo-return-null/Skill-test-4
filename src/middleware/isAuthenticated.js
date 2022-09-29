export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res
    .redirect("/")
    .send("No se encuentra logueado");
};
