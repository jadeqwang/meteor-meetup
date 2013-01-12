//People = new Meteor.Collection("people");
//
//if (Meteor.isClient) {
//	Template.welcome_email.events({
//		'click .buttonSubmit' : function() {
//			var email = $F('email');
//			if (email
//					.match(/^[0-9a-zA-Z][-_\.0-9a-zA-Z+]*[0-9a-zA-Z]+@([0-9a-zA-Z]+[-_\.0-9a-zA-Z]*[0-9a-zA-Z]+)+\.[a-zA-Z]{2,6}$/)) {
//				var person = People.find({email: $("#email").val()}, {limit: 1});
//
//				if(person.size() == 1){
//					alert("sucess")
//					// print
//				}else{
//					$("#welcome_email").hide()
//					$("#welcome_first_time").show()
//					
//				}
//			} else {
//				Effect.Shake($('email').parentNode)
//			}
//		}
//	});
//	
//	Template.welcome_first_time.events({
//		'click button' : function() {
//			var email = $F('email');
//				var person = People.find({email: $("#email").val()}, {limit: 1});
//
//				if(person.size() == 1){
//					$("#welcome_email").hide()
//					
//				}else{
//				}
//		}
////		if (this.data.first_name.length) {
////			new Ajax.Request(
////					this.BASE_PATH + 'attend' + this.PATH_SEPERATOR
////							+ this.key,
////					{
////						method : 'post',
////						parameters : this.data,
////						onSuccess : function(t) {
////							var json = eval('(' + t.responseText + ')');
////							this.printJob = json.printJobId;
////							this.startThanking();
////						}.bind(this),
////						onFailure : function() {
////							alert('Failed to submit your badge details.  Please notify an event host.');
////						}
////					});
////		} else {
////			Effect.Shake($('first_name').parentNode);
////		}
//	});
//
////	var WelcomeSystem = {
////		BASE_PATH : '/',
////		PATH_SEPERATOR : '/',
////		moniker : null,
////
////		timer : null,
////		polling : false,
////		key : '',
////		printJob : null,
////		data : null,
////
////		panels : {
////			email : 'email_form',
////			details : 'details_form',
////			thanks : 'thanks'
////		},
////		visiblePanel : '',
////
////		initialize : function() {
////			this.moniker = $('moniker');
////
////			this._event_submitEmail = this.event_submitEmail
////					.bindAsEventListener(this);
////			this._event_submitDetails = this.event_submitDetails
////					.bindAsEventListener(this);
////
////			Event.observe('email_form', 'submit', this._event_submitEmail);
////			Event.observe('details_form', 'submit', this._event_submitDetails);
////			Event.observe('header', 'click', function() {
////				Effect.Pulsate($('header'), {
////					pulses : 1,
////					duration : 0.2
////				});
////			});
////			this.startOver();
////		},
////
////		clearData : function() {
////			this.key = '';
////			this.printJob = null;
////			this.data = {
////				first_name : '',
////				last_name : '',
////				tags : ''
////			};
////			for ( var i in this.data) {
////				$(i).value = '';
////			}
////		},
////
////		showPane : function(key, focus) {
////			var focus = focus || null;
////			if (this.visiblePane && this.panels[this.visiblePane]) {
////				$(this.panels[this.visiblePane]).hide();
////				Effect.SlideUp(this.panels[this.visiblePane], {
////					duration : .2,
////					afterFinish : function(key, focus) {
////						this.showAnimation(key, focus)
////					}.bind(this, key, focus)
////				});
////			} else {
////				this.visiblePane = '';
////				this.showAnimation(key, focus);
////			}
////		},
////
////		showAnimation : function(key, focus) {
////			var focus = focus || '';
////			if (focus) {
////				var afterFinish = function(focus) {
////					$(focus).select();
////				}.bind(this, focus);
////			} else {
////				var afterFinish = Prototype.emptyFunction;
////			}
////			if (this.panels[key]) {
////				Effect.SlideDown(this.panels[key], {
////					duration : .2,
////					afterFinish : afterFinish
////				});
////				this.visiblePane = key;
////			}
////		},
////
////		startOver : function() {
////			this.clearData();
////			$('email').value = this.key;
////			this.showPane('email', 'email');
////			this.enableButtons();
////		},
////
////		startDetails : function() {
////			this.showPane('details', 'first_name');
////			$('first_name').focus();
////			this.enableButtons();
////		},
////
////		startThanking : function() {
////			if (!this.timer) {
////				this.disableButtons();
////				this.showPane('thanks');
////				this.moniker.update(this.data.first_name);
////				this.timer = new PeriodicalExecuter(
////						function() {
////							if (!this.polling) {
////								this.polling = true;
////								new Ajax.Request(
////										this.BASE_PATH + 'printer'
////												+ this.PATH_SEPERATOR
////												+ this.printJob,
////										{
////											method : 'get',
////											onSuccess : function(t) {
////												var json = eval('('
////														+ t.responseText + ')');
////												switch (json.status) {
////												case 'finished':
////													this.finishThanking(2500);
////													break;
////
////												case 'failed':
////													alert("Your badge (job "
////															+ this.printJob
////															+ ") failed to print.  Please notify an event host.");
////													this.finishThanking();
////													break;
////
////												case 'outstanding':
////													break;
////
////												default:
////												}
////												this.polling = false;
////											}.bind(this),
////											onFailure : function() {
////												alert("Failed to get the print status for your badge (job "
////														+ this.printJob
////														+ ").  Please notify an event host.");
////												this.finishThanking();
////												this.polling = false;
////											}.bind(this)
////										});
////							}
////						}.bind(this), 1);
////			}
////		},
////
////		finishThanking : function(timeout) {
////			var timeout = timeout || 0;
////			if (this.timer) {
////				this.timer.stop();
////				this.timer = null;
////			}
////			if (timeout) {
////				setTimeout(this.startOver.bind(this), timeout);
////			} else {
////				this.startOver();
////			}
////		},
////
////		disableButtons : function() {
////			var buttons = document.getElementsByTagName('input');
////			for ( var i = 0, c = buttons.length; i < c; i++) {
////				if ('button' == buttons[i].type || 'submit' == buttons[i].type) {
////					buttons[i].disabled = true;
////				}
////			}
////		},
////
////		enableButtons : function() {
////			var buttons = document.getElementsByTagName('input');
////			for ( var i = 0, c = buttons.length; i < c; i++) {
////				if ('button' == buttons[i].type || 'submit' == buttons[i].type) {
////					buttons[i].disabled = false;
////				}
////			}
////		},
////
////		event_submitEmail : function(event) {
////			Event.stop(event);
////			var email = $F('email');
////			if (email
////					.match(/^[0-9a-zA-Z][-_\.0-9a-zA-Z+]*[0-9a-zA-Z]+@([0-9a-zA-Z]+[-_\.0-9a-zA-Z]*[0-9a-zA-Z]+)+\.[a-zA-Z]{2,6}$/)) {
////				this.key = email;
////				new Ajax.Request(
////						this.BASE_PATH + 'prefill' + this.PATH_SEPERATOR
////								+ this.key,
////						{
////							method : 'get',
////							onSuccess : function(t) {
////								var json = eval('(' + t.responseText + ')');
////								for ( var i in json) {
////									var el = $(i);
////									if (el) {
////										el.value = json[i];
////									}
////								}
////								this.startDetails();
////							}.bind(this),
////							onFailure : function() {
////								alert('Failed to fetch prefill details, server did not respond. Please notify an event host.');
////							}
////						});
////			} else {
////				Effect.Shake($('email').parentNode)
////			}
////		},
////
////		event_submitDetails : function(event) {
////			Event.stop(event);
////			for ( var i in this.data) {
////				this.data[i] = $F(i).strip();
////			}
////			if (this.data.first_name.length) {
////				new Ajax.Request(
////						this.BASE_PATH + 'attend' + this.PATH_SEPERATOR
////								+ this.key,
////						{
////							method : 'post',
////							parameters : this.data,
////							onSuccess : function(t) {
////								var json = eval('(' + t.responseText + ')');
////								this.printJob = json.printJobId;
////								this.startThanking();
////							}.bind(this),
////							onFailure : function() {
////								alert('Failed to submit your badge details.  Please notify an event host.');
////							}
////						});
////			} else {
////				Effect.Shake($('first_name').parentNode);
////			}
////		}
////	};
//
//}