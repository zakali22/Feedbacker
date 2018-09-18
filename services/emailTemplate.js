module.exports = emailObject => {
  return `<html>
    <div style="text-align: center">
      <h3>We value you're feedback</h3>
      <p>Don't mind if you could answer this for us?</p>
      <p>${emailObject.body}</p>
      <div>
        <a href="http://localhost:3000/api/surveys/${
          emailObject.id
        }/yes" class="btn btn-outline-primary">Yes</a>
        <a href="http://localhost:3000/api/surveys/${
          emailObject.id
        }/no" class="btn btn-outline-primary">No</a>
      </div>
    </div>
  </html>`;
};
