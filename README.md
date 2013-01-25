meteor-meetup
======================

mongo --port 3002
use meteor
db.people.find({_id : {$in : db.events.find().limit(1).sort({date:-1}).next().attending}});
