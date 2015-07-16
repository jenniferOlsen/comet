Template.messages.helpers({
 messages: Messages.find({})
});

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Template.registerHelper("usernameFromId", function (userId) {
    var user = Meteor.users.findOne({_id: userId});
    if (typeof user === "undefined") {
        return "Anonymous";
    }
    if (typeof user.services.github !== "undefined") {
        return user.services.github.username;
    }
    return user.username;
});
Template.registerHelper("timestampToTime", function (timestamp) {
  var date = new Date(timestamp);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  return hours + ':' + minutes.substr(minutes.length-2);
});

Template.listings.helpers({
  channels: function() {
    return Channels.find();
  }
});

Template.channel.helpers({
  active: function() {
    if (Session.get('channel') === this.name) {
      return 'active';
    } else {
      return '';
    }
  }
});
Template.registerHelper('currentChannel', function() {
  return Session.get('channel');
})

Template.messages.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('messages', Session.get('channel'));
  });
});

Meteor.subscribe('allUsernames');
Meteor.subscribe('channels');