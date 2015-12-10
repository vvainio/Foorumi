FoorumApp.service('Api', function ($http) {
  // Aihealueiden Api-funktiot
  this.getTopics = function () {
    return $http.get('/topics');
  };
  this.getTopic = function (id) {
    return $http.get('/topics/' + id);
  };
  this.addTopic = function (topic) {
    return $http.post('/topics', topic);
  };

  // Viestien Api-funktiot
  this.getMessage = function (id) {
    // Hae annetulla id:llä varustettu viesti toteuttamasi Api:n polusta /messages/:id
  };
  this.addMessage = function (message, topicId) {
    // Lisää annettu viesti lähettämällä POST-pyyntö toteuttamasi Api:n polkuun /topics/:topicId/message
  };

  // Vastausten Api-funktiot
  this.addReply = function (reply, messageId) {
    // Lisää annettu vastaus lähettämällä POST-pyyntö toteuttamasi Api:n polkuun /messages/:messageId/reply
  };

  // Käyttäjän Api-funktiot
  this.login = function (user) {
    // Tarkista käyttäjän kirjautuminen lähettämällä POST-pyyntö toteuttamasi Api:n polkuun /users/authenticate
  };
  this.register = function (user) {
    // Lisää annettu käyttäjä lähettämällä POST-pyyntö toteuttamasi Api:n polkuun /users
  };
  this.getUserLoggedIn = function () {
    // Hae kirjautunut käyttäjä toteuttamasi Api:n polusta /users/logged-in
  };
  this.logout = function () {
    return $http.get('/users/logout');
  };
});
