var express = require('express');
var request = require('request')
var router = express.Router();

var apiKey = "094818b45b98e7a195ec47dc156822e8b723070e";

router.get('/', function(req, res, next) {
  res.render('bookForm', { title: 'Enter Book Name' });
});

router.post('/book', function(req, res) {

  console.log("HI");
  var bookName = String(req.body.bookName);
    var authorName = String(req.body.authorName);

  bookName = bookName.replace(/\s+/g, '+');
  authorName = authorName.replace(/\s+/g, '+');

    var url = "https://idreambooks.com/api/books/reviews.json?q=" + bookName + "+" + authorName + "&key=" + apiKey;
    var bookText = "";
    console.log(url);

    request({
    url: url,
    json: true
  }, function (error, response, body) {

      if (!error && response.statusCode === 200) {
        var temp = body.book.critic_reviews;

        for (var key in temp) {
        if (temp.hasOwnProperty(key)) {
          bookText = bookText + " " + String(temp[key].snippet);
          }
      }
          //console.log(bookText) // Print the json response
      }
  })
    
});

module.exports = router;