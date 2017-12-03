/* jshint esversion: 6 */

const renderUser = user => `
<tr>
  <td>${user.userId}</td>
  <td>${user.activities.join(' ')}</td>
</tr>
`;

module.exports = users => `
<table class="table table-zebra">
  ${users.map(renderUser).join(' ')}
</table>
`;