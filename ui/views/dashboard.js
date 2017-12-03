/* jshint esversion: 6 */

module.exports = (numOfUsers, numOfGuides) => `
<div class="row">
  <div class="col-md-4">
    <div class="well">
      <center>
        <h1>${numOfUsers}</h1>
        users
      </center>
    </div>
  </div>
  <div class="col-md-4">
    <div class="well">
      <center>
        <h1>${numOfGuides}</h1>
        users
      </center>
    </div>
  </div>
</div>
`;