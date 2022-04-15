require('dotenv').config();
const axios = require("axios");

(async ()=> {
  try {
    await axios.post(
      `${process.env.API_HOST}users/register`,
      {
        username: process.env.TEST_USERNAME,
        password: process.env.TEST_PASSWORD,
      }
    );
    //   console.log(response);
    console.log("INFO :: User was created through the API\n");
  } catch(error) {
    console.error("INFO :: User already created\n");
    console.error(error);    
  }
})();
