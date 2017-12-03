/* jshint esversion: 6 */

const renderGuide = guide => `
<tr>
  <td>${guide._id}</td>
  <td>${guide.route}</td>
  <td><a href="/guide/edit/${guide._id}" class="btn btn-default">edit</a></td>
</tr>
`;

module.exports = guides => `
<table class="table table-zebra">
  ${guides.map(renderGuide)}
</table>

<a href="/guide/create" class="btn btn-success">add new guide</a>
`;