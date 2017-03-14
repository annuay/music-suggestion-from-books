var l = require("lyric-get");


var mongodb = require('mongodb');
var mongo_client = mongodb.MongoClient;
var url_mongo = 'mongodb://localhost:27017/rr';

var artist = 
["Linkin Park",
"Eminem",
"Rihanna",
"N-Dubz",
"Skylar Grey",
"Mike Posner",
"G-Eazy",
"The Weeknd",
"Cee Lo Green",
"Jess Glynne",
"Justin Timberlake",
"Timbaland",
"Inna",
"Timbaland",
"Ariana Grande",
"Zara Larsson",
"Daft Punk",
"DNCE",
"Jay Z",
"Katy Perry",
"Maroon 5",
"Justin Timerlake",
"Katy Perry",
"Timbaland",
"Nick Jonas",
"Ghost",
"Maroon 5",
"Kimbra",
"Beyonce",
"Flume",
"Linkin Park",
"Katy Perry",
"Kid Ink",
"Skrillex",
"Nero",
"Professor Green",
"Daft Punk",
"Eminem",
"Sia",
"Coldplay",
"Jay Z & Kanye West",
"Inna",
"Macklemore & Ryan Lewis",
"Macklemore & Ryan Lewis",
"Maroon 5",
"Katy Perry",
"Eminem",
"Ariana Grande",
"JLS",
"Demi Lovato",
"Akon",
"Bruno Mars",
"Dimitri Vegas  Like Mike",
"Taylor Swift",
"Drake",
"Fun",
"Room 5",
"Birdy Nam Nam",
"Justin Timberlake",
"Jack Ü",
"Maroon 5",
"Mike Posner",
"Linkin Park",
"Major Lazer",
"Of Monsters And Men",
"Years & Years",
"Le Youth",
"The-Dream",
"Rihanna",
"Calvin Harris",
"Ke$ha",
"Calvin Harris",
"Britney Spears",
"Lana Del Rey",
"Diddy-Dirty Money ",
"Florence and The Machine",
"Tulisa",
"Pitbull",
"Avicii",
"David Guetta",
"Kevin Rudolf",
"Katy B"];

var song = 
["Somewhere I belong",
"Ass Like That",
"Needed Me",
"Girls",
"Cmon Let Me Ride Ft Eminem",
"Please Don't Go",
"Me, Myself & I Ft Bebe Rexha",
"Earned It",
"Bright Lights Bigger City",
"Hold My Hand",
"Love Stoned Think She Knows Interlude",
"Say Something ft Drake",
"Deja Vu ft Bob Taylor ",
"Morning After Dark Ft SoShy",
"The Way Ft Mac Miller",
"Never Forget You Ft MNEK",
"One More Time",
"Cake By The Ocean",
"Excuse Me Miss feat Pharrell",
"Part of Me",
"Feelings",
"What Goes Around Comes Around",
"The One That Got Away",
"Apologize ft One Republic",
"Close Ft Tove Lo",
"Cirice",
"Payphone ft Wiz Khalifa",
"Settle Down",
"Drunk In Love ft Jay Z",
"Never Be Like You Ft Kai",
"Papercut",
"Dark Horse Ft. Juicy",
"Show Me Ft Chris Brown",
"Breakn' A Sweat Ft The Doors",
"Guilt",
"Remedy ft Ruth Anne",
"Harder, Better, Faster, Stronger",
"Space Bound ",
"Chandelier",
"Sky Full Of Stars",
"Otis ",
"Amazing ",
"Downtown Ft Eric Nally, Melle Mel, Kool Moe Dee & Grandmaster Caz",
"Can't Hold Us Ft Ray Dalton",
"It Was Always You",
"Walking On Air",
"When I'm Gone",
"Break Free Ft Zedd",
"Hottest Girl",
"Cool For The Summer",
"Smack that ft Eminem",
"Just The Way You Are ",
"Find Tomorrow Ft Katy B",
"22",
"Controlla",
"We Are Young Ft Janelle Monae",
"Make Love",
"Defiant Order",
"Future Sex Love Sound",
"Take Ü There Ft Kiesza",
"Lucky Strike",
"Bow Chicka Wow Wow Ft Lil Wayne ",
"Crawling",
"Lean On Ft Mo and Dj Snake",
"Little Talks",
"Worship",
"Cool",
"IV Play",
"Pon De Replay",
"Outside Ft Ellie Goulding",
"Die Young",
"How Deep Is Your Love ft Disciple",
"Criminal",
"Ultraviolence",
"Coming Home Ft Skylar Grey",
"Spectrum (Calvin Harris Remix)",
"Young",
"Rain Over Me Ft Marc Anthony",
"Levels",
"She Wolf ft Sia",
"Let It Rock Ft Lil Wayne",
"Broken Record"]
































function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

var i =0;
var k = 0;


for(i = 0; i<10; i++)
{
    l.get(artist[i], song[i] , function(err, res){
    //console.log(i);
    if(err)
    {
        console.log(err);
    }
    else
    {
        mongo_client.connect(url_mongo, function(err, db)
        {
              if(err) {console.log("Error in DB read");}
              else
              var temp = {name: song[i], lyrics: res};
              db.collection('lyrics').insert(temp, function(err, res){console.log(res)});
        });
    }});
}