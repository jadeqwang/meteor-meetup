Developer = new Meteor.Collection("developer");

if (Meteor.isClient) {
	Template.welcome.events = {
		'click button.buttonSubmit' : function() {
			alert("1")
			var re = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
			var email = $('#email')
			if (!re.test(email.val())){
				email.effect("shake", { times:3 }, 300);
			}
		}
	};
	
//	Template.entryfield.events = {
//			  "keydown #message": function(event){
//			    if(event.which == 13){
//			      // Submit the form
//			      var name = document.getElementById('name');
//			      var message = document.getElementById('message');
//
//			      if(name.value != '' && message.value != ''){
//			        Messages.insert({
//			          name: name.value,
//			          message: message.value,
//			          time: Date.now()
//			        });
//
//			        name.value = '';
//			        message.value = '';
//			      }
//			    }
//			  }
//			}
	
//  Template.hello.greeting = function () {
//    return "Welcome to devhouse.";
//  };
//
//  Template.hello.events({
//    'click input' : function () {
//      // template data, if any, is available in 'this'
//      if (typeof console !== 'undefined')
//        console.log("You pressed the button");
//    }
//  });
}
