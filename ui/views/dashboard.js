/* jshint esversion: 6 */

module.exports = (numOfUsers, numOfGuides) => `
<div class="row">
  <div class="col-md-4">
    <div class="well" style="height: 150px;">
      <b>Global settings</b>
      <hr />
      <form class="form-inline">
        <div class="checkbox">
          <label>
            <input type="checkbox"> Required authenticated users
          </label>
        </div>
      </form>
    </div>
  </div>
  <div class="col-md-4">
    <div class="well" style="height: 150px;">
      <center>
        <h1>${numOfUsers}</h1>
        users
      </center>
    </div>
  </div>
  <div class="col-md-4">
    <div class="well" style="height: 150px;">
      <center>
        <h1>${numOfGuides}</h1>
        guides
      </center>
    </div>
  </div>
</div>
`;