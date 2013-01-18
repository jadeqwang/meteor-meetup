People = new Meteor.Collection("people");
Events = new Meteor.Collection("events");

if (Meteor.isClient) {

	Template.Meetup.people = function() {
		var event = Events.findOne({}, {
			sort : {
				date : -1
			}
		});
		if (event && event.attending.length != 0) {
			return People.find({
				_id : {
					$in : event.attending
				}
			}, {
				sort : {
					name : 1
				}
			});
		} else {
			return undefined;
		}
	};

	Template.Meetup.email_exists = function() {
		return Session.get("email");
	};

	Template.new_person.email_exists = function() {
		return Session.get("email");
	};

	Template.new_person.events = {
		'click input.add' : function() {
			Session.set("email", false);
			var email = document.getElementById("email").value;
			var re = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
			if (!re.test(email)) {
				alert("invalid email format");
				return;
			}
			var person = People.findOne({
				email : email
			});
			if (person) {
				var event = Events.findOne({}, {
					sort : {
						date : -1
					}
				});
				Events.update({
					_id : event._id
				}, {
					$push : {
						attending : person._id
					}
				});
				// Events.insert({player_id: person._id});
				document.getElementById("email").value = '';
				alert("Thanks for showing up!")
			} else {
				Session.set("email", true);
			}
		},
		'click input.edit' : function() {
			Session.set("email", false);
			document.getElementById("name").value = '';
			document.getElementById("about").value = '';
		}
	};

	Template.details.events = {
		'click input.add' : function() {
			var email = document.getElementById("email").value;
			var name = document.getElementById("name").value.trim();
			var about = document.getElementById("about").value.trim();
			if (name.length == 0) {
				alert("requires a name");
				return;
			}
			var person = People.insert({
				email : email,
				name : name,
				about : about
			});
			var event = Events.findOne({}, {
				sort : {
					date : -1
				}
			});
			Events.update({
				_id : event._id
			}, {
				$push : {
					attending : person
				}
			});
			document.getElementById("email").value = '';
			document.getElementById("name").value = '';
			document.getElementById("about").value = '';
			Session.set("email", false);
			alert("Thanks for showing up!");
		}
	};

	// Events.insert({event: "event", date: new Date(), attending: []});

}