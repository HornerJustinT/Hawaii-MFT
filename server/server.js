
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const profileRouter = require("./routes/profile.router");
const mailerRouter = require("./routes/mailer.router");
const search_resultsRouter = require('./routes/search_results.router');
const create_profileRouter = require("./routes/create_profile.router");
const advancedRouter = require("./routes/advanced.router");
const createRegistrationKeyRouter = require("./routes/create_registration_key.router");
const checkRegistrationKeyRouter = require("./routes/check_registration_key.router");

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use("/profile", profileRouter);
app.use("/api/mailer", mailerRouter);
app.use('/api/search', search_resultsRouter);
app.use("/api/profile", create_profileRouter);
app.use("/api/advanced", advancedRouter);
app.use("/api/createRegistrationKey", createRegistrationKeyRouter);
app.use("/api/checkRegistrationKey", checkRegistrationKeyRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
