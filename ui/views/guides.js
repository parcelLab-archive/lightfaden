/* jshint esversion: 6 */

const _ = require('underscore');

const renderGuide = guide => `
<tr>
  <td>${guide._id}</td>
  <td>${guide.text}</td>
  <td>${guide.action}</td>
  <td>${guide.route}</td>
  <td><a href="/guide/edit/${guide._id}" class="btn btn-default btn-sm">edit</a></td>
</tr>
`;

module.exports = g => `
<table class="table table-zebra">
  <thead>
    <tr>
      <th>ID</th>
      <th>Message</th>
      <th>Type</th>
      <th>Route</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    ${g.map(renderGuide).join(' ')}
  </tbody>
</table>

<a href="/guide/create" class="btn btn-success">add new guide</a>`;