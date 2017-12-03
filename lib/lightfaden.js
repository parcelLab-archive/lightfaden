const mongoose = require('mongoose');
const Lightfaden = require('../lib/model.js').Lightfaden;
const User = require('../lib/model.js').User;
const async = require('async');

function getLightfaden(userId, route, callback) {
  // User.find({userId: userId}, (err, users) => {
  //   if (err) return callback(err);
  //   var activities = users[0].activities;
  //   Lightfaden.find({route: route}, (err, lightfaeden) => {
  //     var data = [];
  //     async.each(lightfaeden, (lightfaden, callback) => {
  //       if (lightfaden.hasActivity.indexOf(activity) !== -1 && lightfaden.hasNotActivity.indexOf(activity) === -1) {
  //         data.push(lightfaden.payload);
  //       }
  //     }, function(err) {
  //       if (err) callback(err);
  //       else callback(null, data);
  //     });
  //   });
  // })


  data = [
    {
      robot: true,
      text: 'Hello friend. How can I help you?',
    },
  
    {
      text: 'Please show me the features if this app.',
      action: 'START_TOUR',
      payload: [
        { selector: '.step-one', description: 'This is step one', showNext: true, },
        { selector: '.step-two', description: 'This is step two', },
      ],
    },
    
  ];
  callback(null, data);
}

module.exports = {
  getLightfaden: getLightfaden
}