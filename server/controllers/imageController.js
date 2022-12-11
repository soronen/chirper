const needle = require('needle')
const fs = require('fs');

const upload = async (req, res) => {
  const { image } = req.body;

  const url = 'https://api.imgur.com/3/image';

  // Set the API key for accessing the Imgur API
  const apiKey = process.env.IMGUR_ID;

  // Set the image file you want to upload
  const imageFile = 'path/to/your/image.jpg';

  // Set the headers for the request
  const headers = {
    Authorization: `Client-ID ${apiKey}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  // Send the request to Imgur using Needle
  needle.post(url, image, { headers }, (error, response) => {
    if (error) {
      // Print the error message if there was an error
      console.error(error.message);
      res.sendStatus(500);
      return;
    } else {
      // Check the status code of the response
      if (response.statusCode === 200) {
        // Print the response data if the request was successful
        console.log(response.body);
        res.json({url : response.body.data.link}).status(200);
        return;
      } else {
        // Print the error message if the request was not successful
        console.error(response.body.data.error);
        res.sendStatus(500);
        return;
      }
    }
  });
};

module.exports = { upload };
