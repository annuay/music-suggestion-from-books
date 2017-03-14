var mongodb = require('mongodb');
var urllib = require('urllib');
var express = require('express');
var request = require('request')
var router = express.Router();









function search_func(str, items) {
 var len=items.length;
 

    for(i=0;i<len;i++) {
        found += str.split(items[i]).length - 1;
    }
    return found;
}

function check(documents, keyword_array) {
	//console.log(documents);
	var score = {};
	var len = documents.length;
	var keywordLen = keyword_array.length;
	//console.log(keyword_array);
	for(i=0; i<len; i++)
	{
		var found= 0;
		for(var j=0; j<keywordLen; j++) {
			found += documents[i].lyrics.split(keyword_array[j]).length - 1;
		}
		// console.log(documents[0]);
		//var key = documents[i].name;
		// var name = documents[i].name;
		// console.log(name);
		//score.name = search_func(documents[i].lyrics, keyword_array);
		//score[name] = search_func(documents[i].lyrics, keyword_array);
		score[documents[i].name] = found;
		//console.log(score[documents[i].name]);
	}
	//console.log("out of loop");
	//console.log(score);
	keysSorted = Object.keys(score).sort(function(a,b){return score[b]-score[a]})
	return keysSorted;
	//console.log(keysSorted);

}

var sample_song = "The long-string instrument is a musical instrument in which the string is of such a length that the fundamental transverse wave is below what a person can hear as a tone (±20 Hz). If the tension and the length result in sounds with such a frequency, the tone becomes a beating frequency that ranges from a short reverb (approx 5–10 meters) to longer echo sounds (longer than 10 meters). Besides the beating frequency, the string also gives higher pitched natural overtones. Since the length is that long, this has an effect on the attack tone. The attack tone shoots through the string in a longitudinal wave and generates the typical science-fiction laser-gun sound as heard in Star Wars.[1] The sound is also similar to that occurring in upper electricity cables for trains (which are ready made long-string instruments in a way).";


var mongo_client = mongodb.MongoClient;
var url_mongo = 'mongodb://localhost:27017/rr';
var base_url = 'https://westus.api.cognitive.microsoft.com/';
var account_key = '6a94ef3568af46b5a677d1d12d0c7884';
var HEADER = {'Content-Type':'application/json', 'Ocp-Apim-Subscription-Key':account_key};
var input_texts = '{"documents":[{"id":"1","text":"Helloo"}]}';
var batch_keyphrase_url = base_url + 'text/analytics/v2.0/keyPhrases';









//var apiKey = "094818b45b98e7a195ec47dc156822e8b723070e";
//var apiKey = "5c759e17db3abd827ca6536747d4cfc3d3a71181";
var apiKey = "b2cbcdee428e1dc0aaaf829196389dbd157129a9";

router.get('/', function(req, res, next) {
	console.log("Reached1");

  res.render('bookForm', { title: 'Enter Book Name' });
});

router.post('/book', function(req, ress) {

	console.log("Reached2");
	var bookName = String(req.body.bookName);
    var authorName = String(req.body.authorName);

    
	bookName = bookName.replace(/\s+/g, '+');
	authorName = authorName.replace(/\s+/g, '+');

    var url = "https://idreambooks.com/api/books/reviews.json?q=" + bookName + "+" + authorName + "&key=" + apiKey;
    var bookText = "";
    //console.log(url);

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
	        console.log(bookText);

	        urllib.request(batch_keyphrase_url, 
	{
  		method: 'POST',
  		headers: HEADER,
  		data: {"documents":[{"id":"1","text":bookText}]}
	},
  	function (err, data, res)
  	{
  		var keyword_array = JSON.parse(data).documents[0].keyPhrases;
  		console.log(keyword_array);
  		//console.log(keyword_array);
  		//var count = all_items_present(sample_song, keyword_array);
  		//console.log("#########" + count);
  		//console.log("Reached3");
  		//console.log(keyword_array);



  		mongo_client.connect(url_mongo, function(err, db)
  		{
  			if(err) {console.log("Error in DB read");}
  			else
  			{
  				db.collection('lyrics').find().toArray(function(err, response) {
  					if(err) {console.log(err.stack);

  					}else {
  						var final;
  						final = check(response, keyword_array);
  						console.log(final);
  						console.log(final[0]);
  						//ress.send(JSON.stringify({song0 : final[0]}));// {song1 : final[1]});
                   		ress.render('result', {song0 : final[0]});
                   		
  					}
  				});
  				//db.close();
  				// var lyrics = db.collection('lyrics');
  				// lyrics.find(function(err, documents)
  				// {
  				// 	if(err) {console.log("Error in find");}
  				// 	else
  				// 	{
  				// 		//console.log(documents);
  				// 		documents = documents.toArray();
  				// 		db.close();
  				// 		check(documents);
  				
  						// for(i=0; i<documents.length; i++)
  						// {
  						// 	score[documents[i].name] = search_func(document[i].lyrics, keyword_array);
  						// 	console.log(score[documents[i].name]);
  						// }
  						// for(song_name in score)
  						// {
  						// 	console.log("Hello");
  						// 	console.log(song_name);
  						// }

  						/*documents.each(function(err, item)
  						{
  							if(err) {console.log("Error reading individual docs");}
  							else
  							{
  								if(item != null)
  								{
  									score[item.name] = search_func(item.lyrics, keyword_array);
  									//console.log(item.name);
  									//console.log(item.lyrics);
  									//console.log(score[item.name]);
  								}
  							}
  						});*/
  						/*db.close();
  						for(song_name in score)
  						{
  							console.log("Hello");
  							console.log(song_name);
  						}*/
  					//}
  				//});
  			}
  		});
  	}
);
	    }
	})
    
});

module.exports = router;



