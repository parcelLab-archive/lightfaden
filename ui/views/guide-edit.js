/* jshint esversion: 6 */

const allowedActions = [
  { text: 'select one...', opt: '-' },
  { text: 'Robot asks a question 🤖', opt: 'QUESTION' },
  { text: 'Interactive tour 🗺', opt: 'START_TOUR' },
];

module.exports = g => `
<form class="form-horizontal" action="/guide/edit/${g ? g._id : 'new'}" method="POST">
  <div class="form-group">
    <label for="inputMessage" class="col-sm-2 control-label">Message</label>
    <div class="col-sm-10">
      <input ${g ? `value="${g.text}"` : ''} type="text" class="form-control" id="inputMessage" name="inputMessage" placeholder="Text to show in speech bubble">
    </div>
  </div>
  <div class="form-group">
    <label for="inputType" class="col-sm-2 control-label">Type</label>
    <div class="col-sm-10">
      <select class="form-control" id="inputType" name="inputType">
        ${allowedActions.map(a => `<option value="${a.opt}">${a.text}</option>`).join(' ')}
      </select>
    </div>
  </div>

  <hr />

  <div class="form-group">
    <label for="inputRoutes" class="col-sm-2 control-label">Routes</label>
    <div class="col-sm-10">
      <textarea class="form-control" id="inputRoutes" name="inputRoutes" placeholder="Show on which routes" rows="5">${g ? g.route.join('\n') : ''}</textarea>
    </div>
  </div>
  <div class="form-group">
    <label for="inputHasActivities" class="col-sm-2 control-label">Has activities</label>
    <div class="col-sm-10">
      <input ${g ? `value="${g.hasActivity.join(',')}"` : ''} type="text" class="form-control" id="inputHasActivities" name="inputHasActivities" placeholder="List of required events as CSV">
    </div>
  </div>
  <div class="form-group">
    <label for="inputHasNotActivities" class="col-sm-2 control-label">Has <u>not</u> activities</label>
    <div class="col-sm-10">
      <input ${g ? `value="${g.hasNotActivity.join(',')}"` : ''} type="text" class="form-control" id="inputHasNotActivities" name="inputHasNotActivities" placeholder="List of disallowed events as CSV">
    </div>
  </div>

  <hr />

  <div class="form-group">
    <label for="inputPayload" class="col-sm-2 control-label">Payload</label>
    <div class="col-sm-10">
      <textarea class="form-control" id="inputPayload" name="inputPayload" placeholder="JSON data to send to frontend" rows="8">${g ? JSON.stringify(g.payload, ' ', 2) : ''}</textarea>
    </div>
  </div>

  <hr />

  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-default">Save</button>
    </div>
  </div>
</form>
`;