var mongodb = require('mongodb');
var urllib = require('urllib');
 
/*urllib.request('http://example.com', {
  method: 'GET',
  data: {
    'a': 'hello',
    'b': 'world'
  }
});*/

/*var req = urllib.request('http://my.server.com/upload', {
  method: 'POST',
  headers: form.headers(),
  stream: form
}, function (err, data, res) {
  // upload finished
});*/
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
	console.log(keyword_array);
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
	console.log("out of loop");
	console.log(score);

	keysSorted = Object.keys(score).sort(function(a,b){return score[b]-score[a]})

	console.log(keysSorted);

}

var sample_song = "The long-string instrument is a musical instrument in which the string is of such a length that the fundamental transverse wave is below what a person can hear as a tone (±20 Hz). If the tension and the length result in sounds with such a frequency, the tone becomes a beating frequency that ranges from a short reverb (approx 5–10 meters) to longer echo sounds (longer than 10 meters). Besides the beating frequency, the string also gives higher pitched natural overtones. Since the length is that long, this has an effect on the attack tone. The attack tone shoots through the string in a longitudinal wave and generates the typical science-fiction laser-gun sound as heard in Star Wars.[1] The sound is also similar to that occurring in upper electricity cables for trains (which are ready made long-string instruments in a way).";


var mongo_client = mongodb.MongoClient;
var url_mongo = 'mongodb://localhost:27017/rr';
var base_url = 'https://westus.api.cognitive.microsoft.com/';
var account_key = '6a94ef3568af46b5a677d1d12d0c7884';
var HEADER = {'Content-Type':'application/json', 'Ocp-Apim-Subscription-Key':account_key};
var input_texts = '{"documents":[{"id":"1","text":"Helloo"}]}';
var batch_keyphrase_url = base_url + 'text/analytics/v2.0/keyPhrases';



console.log("START");
urllib.request(batch_keyphrase_url, 
	{
  		method: 'POST',
  		headers: HEADER,
  		data: {"documents":[{"id":"1","text":"The long-string instrument is a musical instrument in which the string is of such a length that the fundamental transverse wave is below what a person can hear as a tone (±20 Hz). If the tension and the length result in sounds with such a frequency, the tone becomes a beating frequency that ranges from a short reverb (approx 5–10 meters) to longer echo sounds (longer than 10 meters). Besides the beating frequency, the string also gives higher pitched natural overtones. Since the length is that long, this has an effect on the attack tone. The attack tone shoots through the string in a longitudinal wave and generates the typical science-fiction laser-gun sound as heard in Star Wars.[1] The sound is also similar to that occurring in upper electricity cables for trains (which are ready made long-string instruments in a way)."}]}
	},
  	function (err, data, res)
  	{
  		var keyword_array = JSON.parse(data).documents[0].keyPhrases;
  		//console.log(keyword_array);
  		//var count = all_items_present(sample_song, keyword_array);
  		//console.log("#########" + count);
  		mongo_client.connect(url_mongo, function(err, db)
  		{
  			if(err) {console.log("Error in DB read");}
  			else
  			{
  				db.collection('lyrics').find().toArray(function(err, response) {
  					if(err) {console.log(JSON.stringify(err));

  					}else {
  						check(response, keyword_array);
              console.log("AAAA"+response);
  					}
  				});
  				db.close();
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
console.log("END");


/*# Simple program that demonstrates how to invoke Azure ML Text Analytics API: key phrases, language and sentiment detection.
import urllib2
import urllib
import sys
import base64
import json

base_url = 'https://westus.api.cognitive.microsoft.com/'
account_key = '6a94ef3568af46b5a677d1d12d0c7884'
headers = {'Content-Type':'application/json', 'Ocp-Apim-Subscription-Key':account_key}            
input_texts = '{"documents":[{"id":"1","text":"Helloo"}]}'
batch_keyphrase_url = base_url + 'text/analytics/v2.0/keyPhrases'

req = urllib2.Request(batch_keyphrase_url, input_texts, headers) 
print(req)
response = urllib2.urlopen(req)
result = response.read()
obj = json.loads(result)
for keyphrase_analysis in obj['documents']:
    print('Key phrases ' + str(keyphrase_analysis['id']) + ': ' + ', '.join(map(str,keyphrase_analysis['keyPhrases'])))
*/    