////----------------------------------------------------------------------------
////
////  $Id: PreviewAndPrintLabel.js 11419 2010-04-07 21:18:22Z vbuzuev $ 
////
//// Project -------------------------------------------------------------------
////
////  DYMO Label Framework
////
//// Content -------------------------------------------------------------------
////
////  DYMO Label Framework JavaScript Library Samples: Print label
////
////----------------------------------------------------------------------------
////
////  Copyright (c), 2010, Sanford, L.P. All Rights Reserved.
////
////----------------------------------------------------------------------------
//
//
//(function()
//{
//    // called when the document completly loaded
//    function onload()
//    {
//        var textTextArea = document.getElementById('textTextArea');
//        var printButton = document.getElementById('printButton');
//
//        // prints the label
//        printButton.onclick = function()
//        {
//            try
//            {
//                // open label
//                var labelXml = '<?xml version="1.0" encoding="utf-8"?>\
//                	<DieCutLabel Version="8.0" Units="twips">\
//                <PaperOrientation>Landscape</PaperOrientation>\
//                <Id>Address</Id>\
//                <PaperName>30252 Address</PaperName>\
//                <DrawCommands>\
//                  <RoundRectangle X="0" Y="0" Width="1581" Height="5040" Rx="270" Ry="270"/>\
//                </DrawCommands>\
//                <ObjectInfo>\
//                  <TextObject>\
//                    <Name>name</Name>\
//                    <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>\
//                    <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>\
//                    <LinkedObjectName></LinkedObjectName>\
//                    <Rotation>Rotation0</Rotation>\
//                    <IsMirrored>False</IsMirrored>\
//                    <IsVariable>True</IsVariable>\
//                    <HorizontalAlignment>Left</HorizontalAlignment>\
//                    <VerticalAlignment>Top</VerticalAlignment>\
//                    <TextFitMode>ShrinkToFit</TextFitMode>\
//                    <UseFullFontHeight>True</UseFullFontHeight>\
//                    <Verticalized>False</Verticalized>\
//                    <StyledText>\
//                      <Element>\
//                        <String>Click here to enter text</String>\
//                        <Attributes>\
//                          <Font Family="Lucida Grande" Size="13" Bold="False" Italic="False" Underline="False" Strikeout="False"/>\
//                          <ForeColor Alpha="255" Red="170" Green="170" Blue="170"/>\
//                        </Attributes>\
//                      </Element>\
//                    </StyledText>\
//                  </TextObject>\
//                  <Bounds X="331.2" Y="226.7449" Width="4421.436" Height="641.9303"/>\
//                </ObjectInfo>\
//                <ObjectInfo>\
//                  <TextObject>\
//                    <Name>things</Name>\
//                    <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>\
//                    <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>\
//                    <LinkedObjectName></LinkedObjectName>\
//                    <Rotation>Rotation0</Rotation>\
//                    <IsMirrored>False</IsMirrored>\
//                    <IsVariable>True</IsVariable>\
//                    <HorizontalAlignment>Left</HorizontalAlignment>\
//                    <VerticalAlignment>Top</VerticalAlignment>\
//                    <TextFitMode>None</TextFitMode>\
//                    <UseFullFontHeight>True</UseFullFontHeight>\
//                    <Verticalized>False</Verticalized>\
//                    <StyledText>\
//                      <Element>\
//                        <String>Click here to enter text</String>\
//                        <Attributes>\
//                          <Font Family="Lucida Grande" Size="13" Bold="False" Italic="False" Underline="False" Strikeout="False"/>\
//                          <ForeColor Alpha="255" Red="170" Green="170" Blue="170"/>\
//                        </Attributes>\
//                      </Element>\
//                    </StyledText>\
//                  </TextObject>\
//                  <Bounds X="331.2" Y="882.2928" Width="4461.899" Height="360.0301"/>\
//                </ObjectInfo>\
//              </DieCutLabel>';
//                var label = dymo.label.framework.openLabelXml(labelXml);
//
//                // set label text
//                label.setObjectText("name", textTextArea.value);
//                label.setObjectText("things", textTextArea.value);
//                
//                // select printer to print on
//                // for simplicity sake just use the first LabelWriter printer
//                var printers = dymo.label.framework.getPrinters();
//                if (printers.length == 0)
//                    throw "No DYMO printers are installed. Install DYMO printers.";
//
//                var printerName = "DYMO";
//                for (var i = 0; i < printers.length; ++i)
//                {
//                    var printer = printers[i];
//                    if (printer.printerType == "LabelWriterPrinter")
//                    {
//                        printerName = printer.name;
//                        break;
//                    }
//                }
//                
//                if (printerName == "")
//                    throw "No LabelWriter printers found. Install LabelWriter printer";
//
//                // finally print the label
//                label.print(printerName);
//            }
//            catch(e)
//            {
//                alert(e.message || e);
//            }
//        }
//    };
//
//    // register onload event
//    if (window.addEventListener)
//        window.addEventListener("load", onload, false);
//    else if (window.attachEvent)
//        window.attachEvent("onload", onload);
//    else
//        window.onload = onload;
//
//} ());