var tmi = require("tmi.js");
const models = require("./models");

var options = {
  options: {
    debug: true
  },
  connection: {
    cluster: "aws",
    reconnect: true
  },
  identity: {
    username: "bestboiboop",
    password: "oauth:wqxszmezhqttq5pe7offc1pzy4dbqy"
  },
  channels: ["shesquid", "kiwitb", "theramenwizard"]
};

var client = new tmi.client(options);
client.connect();

dsdeaths = 75;

// const deaths = models.Deaths.build({
//   game: "dark souls",
//   amount: 100
// });
//
// deaths.save().then(function(newDeaths) {
//   console.log(newDeaths.game);
// });

client.on("chat", function(channel, user, message, self) {
  if (message == "!boop ds") {
    models.Deaths
      .findOne({
        where: {
          game: "dark souls"
        }
      })
      .then(function(result) {
        client.action(
          "kiwitb",
          "Ramen has died " + result.amount + " times so far!"
        );
        return;
      });
  }
  if (message == "!boop ds ramendied" && user.username == "shesquid") {
    models.Deaths
      .findOne({
        where: {
          game: "dark souls"
        }
      })
      .then(function(result) {
        result.amount = result.amount + 1;
        client.action(
          "kiwitb",
          "Oh dear, Ramen has now died " + result.amount + "times...."
        );
        result.save();
        return;
      });
  }
  // if (message == "!boop ds set" && user.username == "shesquid") {
  //   dsdeaths = dsdeaths + 1;
  // }
  return;
});

client.on("connected", function(address, port) {
  client.action("shesquid", "I'm connected! Hello shesquidchat!");
});
