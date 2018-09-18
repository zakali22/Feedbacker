const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const keys = require("../config/keys");

// Create the class of Mailer. A simple JS Class that extends helper.Mail
class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    // The first argument accesses the 2 properties of the object passed
    super();
    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email("no-reply@feedbacker.com");
    this.subject = subject;
    this.body = new helper.Content("text/html", content);
    this.recipients = this.formatAddresses(recipients); // We need to create the formatAddresses

    this.addContent(this.body); // A helper function provided by helper.Mail
    this.addClickTracking(); // We need to create this helper function
    this.addRecipients(); // We need to create this
  }

  // This function loops over the list of objects and reduces
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  // This function keeps track of who/what email clicked the links
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings); // important
  }

  // This functions adds the list of recipients to the email listing that we send
  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize); // important
  }

  // A promise function that sends the email
  async send() {
    const request = this.sgApi.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      body: this.toJSON()
    });
    // Send it off
    let response = await this.sgApi.API(request);
    console.log(response);
    return response;
  }
} // class

module.exports = Mailer;
