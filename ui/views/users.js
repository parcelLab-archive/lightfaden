/* jshint esversion: 6 */

const renderUser = user => `
<tr>
  <td>${user.userId}</td>
  <td>${user.hybrisId ? user.hybrisId : 'not linked yet'}</td>
  <td>${user.activities.join(' ')}</td>
</tr>
`;

module.exports = users => `
<table class="table table-zebra">
  <thead>
    <tr>
      <th>ID</th>
      <th>Hybris ID</th>
      <th>Activities</th>
    </tr>
  </thead>
  <tbody>
    ${users.map(renderUser).join(' ')}
  </tbody>
</table>
`;