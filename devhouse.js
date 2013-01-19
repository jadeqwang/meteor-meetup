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
				var exists = false;
				for(var i = 0; i < event.attending.length && !exists; i++){
					exists = event.attending[i] == person._id;
				}
				if(!exists){
					if (event) {
						Events.update({
							_id : event._id
						}, {
							$push : {
								attending : person._id
							}
						});
					}
					Meteor.call('printBadge', person._id);
				}
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
			
			if (event) {
				Events.update({
					_id : event._id
				}, {
					$push : {
						attending : person
					}
				});
				
				Meteor.call('printBadge', person);
			}
			
			document.getElementById("email").value = '';
			document.getElementById("name").value = '';
			document.getElementById("about").value = '';
			Session.set("email", false);
			alert("Thanks for showing up!");
		}
	};

	// Events.insert({event: "event", date: new Date(), attending: []});

	if (Meteor.is_server) {
		Meteor.startup(function() {
			Meteor.methods({
				printBadge : function(person_id) {
					console.log('somebody is trying to print');
					var person = People.findOne({
						_id : person_id
					});
					if (person) {
						var DYMO = require('./DYMO.Label.Framework.latest.js');
			            try
			            {
			                // open label
			                var labelXml = '<?xml version="1.0" encoding="utf-8"?>\
			                	<DieCutLabel Version="8.0" Units="twips">\
			                <PaperOrientation>Landscape</PaperOrientation>\
			                <Id>Address</Id>\
			                <PaperName>30252 Address</PaperName>\
			                <DrawCommands>\
			                  <RoundRectangle X="0" Y="0" Width="1581" Height="5040" Rx="270" Ry="270"/>\
			                </DrawCommands>\
			                <ObjectInfo>\
			                  <TextObject>\
			                    <Name>name</Name>\
			                    <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>\
			                    <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>\
			                    <LinkedObjectName></LinkedObjectName>\
			                    <Rotation>Rotation0</Rotation>\
			                    <IsMirrored>False</IsMirrored>\
			                    <IsVariable>True</IsVariable>\
			                    <HorizontalAlignment>Left</HorizontalAlignment>\
			                    <VerticalAlignment>Top</VerticalAlignment>\
			                    <TextFitMode>ShrinkToFit</TextFitMode>\
			                    <UseFullFontHeight>True</UseFullFontHeight>\
			                    <Verticalized>False</Verticalized>\
			                    <StyledText>\
			                      <Element>\
			                        <String>Click here to enter text</String>\
			                        <Attributes>\
			                          <Font Family="Lucida Grande" Size="13" Bold="False" Italic="False" Underline="False" Strikeout="False"/>\
			                          <ForeColor Alpha="255" Red="170" Green="170" Blue="170"/>\
			                        </Attributes>\
			                      </Element>\
			                    </StyledText>\
			                  </TextObject>\
			                  <Bounds X="331.2" Y="226.7449" Width="4421.436" Height="641.9303"/>\
			                </ObjectInfo>\
			                <ObjectInfo>\
			                  <TextObject>\
			                    <Name>things</Name>\
			                    <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>\
			                    <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>\
			                    <LinkedObjectName></LinkedObjectName>\
			                    <Rotation>Rotation0</Rotation>\
			                    <IsMirrored>False</IsMirrored>\
			                    <IsVariable>True</IsVariable>\
			                    <HorizontalAlignment>Left</HorizontalAlignment>\
			                    <VerticalAlignment>Top</VerticalAlignment>\
			                    <TextFitMode>None</TextFitMode>\
			                    <UseFullFontHeight>True</UseFullFontHeight>\
			                    <Verticalized>False</Verticalized>\
			                    <StyledText>\
			                      <Element>\
			                        <String>Click here to enter text</String>\
			                        <Attributes>\
			                          <Font Family="Lucida Grande" Size="13" Bold="False" Italic="False" Underline="False" Strikeout="False"/>\
			                          <ForeColor Alpha="255" Red="170" Green="170" Blue="170"/>\
			                        </Attributes>\
			                      </Element>\
			                    </StyledText>\
			                  </TextObject>\
			                  <Bounds X="331.2" Y="882.2928" Width="4461.899" Height="360.0301"/>\
			                </ObjectInfo>\
			              </DieCutLabel>';
			                var label = DYMO.dymo.label.framework.openLabelXml(labelXml);

			                // set label text
			                label.setObjectText("name", person.name);
			                label.setObjectText("things", person.about);
			                
			                // select printer to print on
			                // for simplicity sake just use the first LabelWriter printer
			                var printers = DYMO.dymo.label.framework.getPrinters();
			                if (printers.length == 0)
			                    throw "No DYMO printers are installed. Install DYMO printers.";

			                var printerName = "DYMO";
			                for (var i = 0; i < printers.length; ++i)
			                {
			                    var printer = printers[i];
			                    if (printer.printerType == "LabelWriterPrinter")
			                    {
			                        printerName = printer.name;
			                        break;
			                    }
			                }
			                
			                if (printerName == "")
			                    throw "No LabelWriter printers found. Install LabelWriter printer";

			                // finally print the label
			                label.print(printerName);
			            }
			            catch(e)
			            {
			            	console.log(e.message || e);
			            }
						return true;
					}
					console.log('somebody sent an invalid person ID');
					return false;
				}
			});
		});
		
	}

}