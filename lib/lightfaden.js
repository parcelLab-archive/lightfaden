const mongoose = require('mongoose');
const Lightfaden = require('../lib/model.js').Lightfaden;
const User = require('../lib/model.js').User;
const async = require('async');

function getLightfaden(userId, route, callback) {
  User.find({userId: userId}, (err, users) => {
    if (err) return callback(err);
    var activities = users[0].activities;
    console.log('u' + users);
    Lightfaden.find({route: route}, (err, lightfaeden) => {
      console.log('l' + lightfaeden);
      var data = lightfaeden.map((lightfaden) => {return lightfaden.payload;});
      console.log(data);
      callback(null, data);
    });
  })


  // data = [
  //   {
  //     robot: true,
  //     text: 'Hello friend. How can I help you?',
  //   },
  
  //   {
  //     text: 'Please show me the features if this app.',
  //     action: 'START_TOUR',
  //     payload: [
  //       { selector: '.step-one', description: 'This is step one', showNext: true, },
  //       { selector: '.step-two', description: 'This is step two', },
  //     ],
  //   },
    
  // ];
  // callback(null, data);
}

module.exports = {
  getLightfaden: getLightfaden
}