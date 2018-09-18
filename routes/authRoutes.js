const passport = require("passport");

module.exports = app => {
  // Get request to /auth/google
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  // Get request to /auth/google/callback
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  // Logout User
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Create a route to GET the user object returned from deserializeUser

  app.get("/api/current", (req, res) => {
    console.log(`here is the actual request object user ${req.user}`);
    res.json(req.user);
  });
};
