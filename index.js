var config = require('./config.json');

var express = require('express');

var app = express();
app.use(express.static('public'));
var server = app.listen(8088);
var io = require('socket.io')(server);


var Twitter = require('node-tweet-stream');
var tw = new Twitter({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  token: config.twitter.token_key,
  token_secret: config.twitter.token_secret
});




tw.track('roses2016');
tw.track('roses16');
tw.track('roses');
tw.track('rosesarered');
tw.track('rosesarewhite');







tw.on('tweet', function(tweet) {
  //console.log(JSON.stringify(tweet));
  console.log("Tweet!");

  var tweetText = "<a href=''>"+tweet.user.name + "</a>: " + tweet.text;
  var team;
  if(tweetText.toLowerCase().indexOf("lancaster")>-1) {team="lancs";}
  if(tweetText.toLowerCase().indexOf("york")>-1) {team="york";}
  if(tweetText.toLowerCase().indexOf("rosesarewhite")>-1) {team="york";}
  if(tweetText.toLowerCase().indexOf("rosesarered")>-1) {team="lancs";}


if(team){
  io.emit('tweet', {team: team, text: tweetText});
}
});
