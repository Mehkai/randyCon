Events = new Mongo.Collection('events');

Meteor.methods({
  eventInsert: function(eventAttributes) {
    check(Meteor.userId(), String);
    check(eventAttributes, {
      title: String,
      day: String,
      url: String,
    });

    var eventWithSameLink = Events.findOne({url: eventAttributes.url});
    if(eventWithSameLink) {
      return {
        eventExists: true,
        _id: eventWithSameLink._id
      };
    }

    var user = Meteor.user();
    var eventGame = _.extend(eventAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    var eventId = Events.insert(eventGame);
    return {
      _id: eventId
    };
  }
});
