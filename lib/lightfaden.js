
function getLightfaden(userId, route, callback) {
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