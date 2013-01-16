
People = new Meteor.Collection("people");People
Event = new Meteor.Collection("event");

if (Meteor.isClient) {
  Template.Meetup.people = function () {
    return People.find({}, {sort: {name: 1}});
  };

  Template.Meetup.email_exists = function () {
    return Session.get("email");
  };

  Template.new_person.email_exists = function () {
    return Session.get("email");
  };

  Template.new_person.events = {
    'click input.add': function () {
      Session.set("email", false);
      var email = document.getElementById("email").value;
      var re = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
      if (!re.test(email)){
        alert("invalid email format")
        return
      }
      var person = People.findOne({email: email});
      if (person){
        alert("Thanks for showing up!")
        Event.insert({player_id: person._id});
        document.getElementById("email").value = '';
      } else {
        Session.set("email", true);
      }
    }, 
    'click input.edit': function () {
      Session.set("email", false);
      document.getElementById("name").value = '';
      document.getElementById("about").value = '';
    }
  };

  Template.details.events = {
    'click input.add': function () {
      var email = document.getElementById("email").value;
      var name = document.getElementById("name").value.trim();
      var about = document.getElementById("about").value.trim();
      if (name.length == 0){
        alert("requires a name");
        return;
      }
      var person = People.insert({email: email, name: name, about: about});
      Event.insert({player_id: person._id});
      document.getElementById("email").value = '';
      document.getElementById("name").value = '';
      document.getElementById("about").value = '';
      Session.set("email", false);
      alert("Thanks for showing up!");
    }
  };
}