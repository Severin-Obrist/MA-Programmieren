var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res){
  //web scraping magic

  //IMDB Page for Anchorman 2
  url = 'http://www.imdb.com/title/tt1229340/';

  //The structure of our first request call
  //first Parameter is our url from above
  //callback function takes 3 parameters => error, response status code
  //and the HTML
  request(url, function(error, response, html){
    if(!error){

      //cheerio library used on the returned html to give us
      //essentially jQuery functionality
      var $ = cheerio.load(html);

      //defining the variables we're going to capture
      var title, release, rating;
      var json = { title : "", release : "", rating : ""};

      //the unique class of the title is used as a starting point
      $('.title_wrapper').filter(function(){

        //the filtered data is stored in the variable "data"
        var data = $(this);

        //the actual title rests within the first child element of the tag
        title = data.children().first().text();

        // this data sits within the child of the child of the data tag
        release = data.children().first().children().first().text();

        //storing the data in the json object
        json.title = title;
        json.release = release;
      })

      $('.ratingValue').filter(function(){ //same as before but with a different DOM
        var data = $(this);

        rating = data.children().first().children().first().text();

        json.rating = rating;
      })
    }

    //to save the json data to our computer we will use the built-in 'fs'-library
    //in this example we will pass 3 parameter to the writefile function
    // Param 1: output.json => the filename of the created file
    // Param 2: JSON.stringify(json, null, 4) => the data to write, .strinigy makes it esier to read
    // Param 3: callback function - a callback function to let us know the status of our function

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully writte! - Check your project directory for the output.json file');

    })

    //send a message to the browser to remind you that this program has no UI
    res.send('check your console!')

  })

})

app.listen('8081')

console.log("Magic happens on port 8081");

exports = module.exports = app;
