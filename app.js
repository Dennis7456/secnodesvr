const express = require('express');
const app = express();
const cloudinary = require('cloudinary').v2
require('dotenv').config();
const bodyParser = require('body-parser');

//body parser config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//cloudinary config
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
  });

app.get('/', (request, response) => {
    response.json({message: 'Hey! This is your server response.'});
});

//image upload API
app.post('/upload-image', (request, response) => {
    //collected image from user
    const data = {
        image: request.body.image,
    }

    //upload image here
    cloudinary.uploader.upload(data.image)
    .then((result) => {
        response.status(200).send({
            message: 'success',
            result,
        });
    }).catch((error) => {
        response.status(500).send({
            message: 'failure',
            error,
        });
    });
});

module.exports = app;