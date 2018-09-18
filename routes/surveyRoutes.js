const requireLogin = require("../middlewares/requireLogin");
const requireCredit = require("../middlewares/requireCredit");
const mongoose = require("mongoose");
const emailTemplate = require("../services/emailTemplate");
const _ = require("lodash"); // A library to perform some redifining on arrays
const Path = require("path-parser").default;
const { URL } = require("url");

const Mailer = require("../middlewares/Mailer");

// Extract the Survey Collection
const Survey = mongoose.model("surveys");

module.exports = app => {
  // Where we send the surveyee after submitting
  app.get("/api/surveys", async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });
    res.send(surveys);
  });

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for voting");
  });
  // The POST request to handle Webhooks (the data that identifies the surveyee)
  app.post("/api/surveys/webhooks", (req, res) => {
    const events = _.map(req.body, event => {
      const pathname = new URL(event.url).pathname;
      const p = new Path("/api/surveys/:surveyId/:choice");
      const match = p.test(pathname);
      if (match) {
        return {
          email: event.email,
          surveyId: match.surveyId,
          choice: match.choice
        };
      }
    });
    const compactEvents = _.compact(events);
    const uniqueEvents = _.uniqBy(compactEvents, "email", "surveyId");
    uniqueEvents.forEach(event => {
      console.log(event);
      Survey.updateOne(
        {
          _id: event.surveyId,
          recipients: {
            $elemMatch: {
              email: event.email,
              responded: false
            }
          }
        },
        {
          $inc: { [event.choice]: 1 },
          $set: { "recipients.$.responded": true } // $ means the $elemMatch that was found
        }
      ).exec();
    });

    res.send({});
  });

  // The POST request to handle the survey creation
  app.post("/api/surveys", requireLogin, requireCredit, async (req, res) => {
    const { title, body, subject, recipients } = req.body;

    // Create the Survey via instance
    const newSurvey = new Survey({
      title,
      body,
      subject,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id
    });

    // Call the Mailer object that combines the data with a template
    const mailer = new Mailer(newSurvey, emailTemplate(newSurvey));
    await mailer.send();
    await newSurvey.save();

    req.user.credits -= 1;
    const user = await req.user.save();

    res.send(user);
  });
};
