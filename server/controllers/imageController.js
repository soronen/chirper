const needle = require("needle");
const fs = require("fs");

const upload = async (req, res) => {
  const { image } = req.body;

  const url = "https://api.imgur.com/3/image";

  // Set the API key for accessing the Imgur API
  const apiKey = process.env.IMGUR_ID;


  // Set the headers for the request
  const headers = {
    Authorization: `Client-ID ${apiKey}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  // Send the request to Imgur using Needle
  needle.post(url, image.split(",").pop(), { headers }, (error, response) => {
    if (error) {
      // Print the error message if there was an error
      console.error(error.message);
      return res.sendStatus(500);
    } else {
      // Check the status code of the response
      if (response.statusCode === 200) {
        // Print the response data if the request was successful
        return res.status(200).json({ url: response.body.data.link });
      } else {
        // Print the error message if the request was not successful
        console.error(response.body.data.error);
        return res.sendStatus(500);
      }
    }
  });
};

module.exports = { upload };
