var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res){
  //web scraping magic

  //IMDB Page for Anchorman 2
  url = 'https://www.chefkoch.de/rs/s0/wok/Rezepte.html';

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
      //var name, difficulty, preptime;
      //var json = { name : "", difficulty : "", preptime : ""};
      var title;
      var json = {title : ""};

      /*$('.search-list').filter(function(){ //same as before but with a different DOM
        var data = $(this);

        name = data.children().first().children().first().children().last().children().text();

        json.name = name;
      })

      $('.search-list-item-difficulty').filter(function(){ //same as before but with a different DOM
        var data = $(this);

        difficulty = data.text();

        json.difficulty = difficulty;
      })
      $('.search-list-item-preptime').filter(function(){ //same as before but with a different DOM
        var data = $(this);

        preptime = data.text();

        json.preptime = preptime;
      })*/

      $('.search-list').find('.search-list-item-content').filter(function(){
        var data = $(this);

        title = data.children().first().html();

        json.title = title;
      })
    }

    //to save the json data to our computer we will use the built-in 'fs'-library
    //in this example we will pass 3 parameter to the writefile function
    // Param 1: output.json => the filename of the created file
    // Param 2: JSON.stringify(json, null, 4) => the data to write, .strinigy makes it esier to read
    // Param 3: callback function - a callback function to let us know the status of our function

    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');

    })

    //send a message to the browser to remind you that this program has no UI
    res.send('check your console!')

  })

})

app.listen('8081')

console.log("Magic happens on port 8081");

exports = module.exports = app;
