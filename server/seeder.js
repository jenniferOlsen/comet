Meteor.startup(function() {
  Factory.define('message', Messages, {
    text: function() {
      return Fake.sentence();
    },
    user: "Anonymous",
    timestamp: Date.now(),
    channel: "general"
  });
  // remove all messages before seeding
  Messages.remove({});

  if (Messages.find({}).count() === 0) {
    _(5).times(function(n) {
      Factory.create('message');
    });
  }

  Channels.remove({});
  Channels.insert({
    name: "general"
  });
  Channels.insert({
    name: "random"
  });
});