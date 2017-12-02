require('dotenv').load({ path: '.env' });


module.exports = {
  cred: {
    hybris: {
      clientid: process.env.HYBRIS_CLIENTID,
      secret: process.env.HYBRIS_SECRET,
    }
  }
};