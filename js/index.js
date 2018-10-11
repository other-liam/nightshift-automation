$('.message a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

var prefix = 'realtimeShiftCommand -r"'; // the first part of the Add PRMT3 command
var suffix = '" -n"1" -d"AUSQLD '; // the second part of the Add PRMT 3 command
var append = '" -!"PRMT3"'; // the final part of the Add PRMT 3 command
var today = new Date(); // define today as a new date object
var reuseprefix = 'vc -v"'; // the first part of the Set Reuse command
var reusesuffixOff = '" -^"1"'; // the second part of the Set Reuse commnd, setting the value to 1
var reusesuffixOn = '" -^"0"'; // the second part of the Set Reuse command, setting the value to 0
var dd = today.getDate(); // define dd as the Date item within the today variable
var mm = today.getMonth() + 1; // define mm as the Month item within the today variable. January is 0!
var yyyy = today.getFullYear(); // define yyyy as the Full Year item within the today variable
var fixprefix = 'realtimeShiftCommand -r"'; // the first part of the Remove PRMT3 command
var fixsuffix = '" -n"1" -d"AUSQLD '; // the second part of the Remove PRMT3 command
var fixappend = '" -!""'; // the final part of the Remove PRMT3 command
var secondShiftPrefix = 'resCalendar  -a"UpdateItem" -r"'; // the first part of the Change Second Shift command
var secondShiftSuffix = '" -d"'; // the second part of the Change Second Shift command
var secondShiftAppend = '" -n"2" -H"1" -!"NIGHT,PRMT3"'; // the final part of the Change Second Shift command, setting the value to 1 (active)
var secondShiftAppendUndo = '" -n"2" -H"0" -!"unset"'; // the final part of the Change Second Shift command, setting the value to 2 (inactive)

if (dd < 10) { // if the date is any single digit
  dd = "0" + dd; // add a leading 0, so the day is always 2 digits long.
}

if (mm < 10) { // if the month is any single digit
  mm = "0" + mm; // add a leading 0, so the day is always 2 digits long.
}

today = dd + "." + mm + "." + yyyy; // define today as the day (dd), month (mm), and year (yyyy), separated by a period

$("#btn-save").click(function() { // on click of the Apply PRMT 3 button
  var truckList = $("#input-fileName").val(); // get the list of trucks from the #input-fileName field in the HTML file. Call that truckList.
  var truckArray = truckList.split(";"); // split the single list of trucks, which are seperated by a semicolon, into an array. Call that truckArray.
  for (var i = 0; i < truckArray.length; i++) { // for loop, which runs the same number of times as there are items in the truckArray
    truckArray[i] = // for each item in the array, add the first part of the Add PRMT3 command (prefix), then the truck number [i], then the second part of the Add PRMT3 command (suffix), then today's date (today), then the final part of the Add PRMT3 command (append).
      prefix +
      truckArray[i] +
      suffix +
      today +
      append; 
  }
  var newestArray = truckArray.join("\r\n"); // join all the items (with their new code padding) in truckArray into a single item, with a line break ("\r\n") in between. Call that new item newestArray.
  
  var secondShiftArray = truckList.split(";"); // split the single list of trucks from before, which are seperated by a semicolon, into an array. Call that secondShiftArray.
  for (var i = 0; i < secondShiftArray.length; i++) { // for loop, which runs the same number of times as there are items in the secondShiftArray
    secondShiftArray[i] =
      secondShiftPrefix +
      secondShiftArray[i] +
      secondShiftSuffix +
      today +
      secondShiftAppend;
  }
  var secondShiftArrayOutput = secondShiftArray.join("\r\n"); // join all the items (with their new code padding) in secondShiftArray into a single item, with a line break ("\r\n") in between. Call that new item secondShiftArrayOutput.

  var reuseArrayOff = truckList.split(";"); // split the single list of trucks from before, which are seperated by a semicolon, into an array. Call that reuseArrayOff.
  for (var i = 0; i < reuseArrayOff.length; i++) {  // for loop, which runs the same number of times as there are items in the reuseArrayOff
    reuseArrayOff[i] =
      reuseprefix +
      reuseArrayOff[i] +
      reusesuffixOff;
  }
  var reuseArrayOffOutput = reuseArrayOff.join("\r\n"); // join all the items (with their new code padding) in reuseArrayOff into a single item, with a line break ("\r\n") in between. Call that new item reuseArrayOffOutput.
  
  var reuseArrayOn = truckList.split(";"); // split the single list of trucks from before, which are seperated by a semicolon, into an array. Call that reuseArrayOn.
  for (var i = 0; i < reuseArrayOn.length; i++) { // for loop, which runs the same number of times as there are items in the reuseArrayOn
    reuseArrayOn[i] =
      reuseprefix +
      reuseArrayOn[i] +
      reusesuffixOn;
  }
  var reuseArrayOnOutput = reuseArrayOn.join("\r\n"); // join all the items (with their new code padding) in reuseArrayOn into a single item, with a line break ("\r\n") in between. Call that new item reuseArrayOnOutput.

  var output = newestArray; // define a new variable called output, which is newestArray (the list of trucks with Add PRMT3 commands, seperated by line breaks)
  var outputArray = [ // define a new array called outputArray, which is newestArray, secondShiftArrayOutput, reuseArrayOffOut, and reuseArrayOnOuput combined
    newestArray,
    secondShiftArrayOutput,
    reuseArrayOffOutput,
    reuseArrayOnOutput
  ].join("\r\n"); // join all four arrays together into a single item, seperated by a line break
  var filename = "Apply PRMT3 " + today; // define a new variable, filename, as "Add PRMT 3" and then today's date
  var blob = new Blob([outputArray], { type: "cmd" }); // create a new blob, which contains the data from outputArray, with the file type "cmd"
  saveAs(blob, filename + ".cmd"); // prompt the user to save the blob as filename.cmd
  document.getElementById('result').innerHTML = outputArray;
});

$("#btn-undo").click(function() { // on click of the Apply PRMT 3 button
  var truckList = $("#input-fileName").val(); // get the list of trucks from the #input-fileName field in the HTML file. Call that truckList.
  var truckArray = truckList.split(";"); // split the single list of trucks, which are seperated by a semicolon, into an array. Call that truckArray.
  for (var i = 0; i < truckArray.length; i++) { // for loop, which runs the same number of times as there are items in the truckArray
    truckArray[i] =
      fixprefix +
      truckArray[i] +
      fixsuffix +
      today +
      fixappend;
  }
  var newestArray = truckArray.join("\r\n"); // join all the items (with their new code padding) in truckArray into a single item, with a line break ("\r\n") in between. Call that new item newestArray.

  var secondShiftArray = truckList.split(";"); // split the single list of trucks from before, which are seperated by a semicolon, into an array. Call that secondShiftArray.
  for (var i = 0; i < secondShiftArray.length; i++) { // for loop, which runs the same number of times as there are items in the secondShiftArray
    secondShiftArray[i] =
      secondShiftPrefix +
      secondShiftArray[i] +
      secondShiftSuffix +
      today +
      secondShiftAppendUndo;
  }
  var secondShiftArrayOutput = secondShiftArray.join("\r\n"); // join all the items (with their new code padding) in secondShiftArray into a single item, with a line break ("\r\n") in between. Call that new item secondShiftArrayOutput.
  
  var reuseArrayOff = truckList.split(";"); // split the single list of trucks from before, which are seperated by a semicolon, into an array. Call that reuseArrayOff.
  for (var i = 0; i < reuseArrayOff.length; i++) { // for loop, which runs the same number of times as there are items in the reuseArrayOff
    reuseArrayOff[i] =
      reuseprefix +
      reuseArrayOff[i] +
      reusesuffixOff;
  }
  var reuseArrayOffOutput = reuseArrayOff.join("\r\n"); // join all the items (with their new code padding) in reuseArrayOff into a single item, with a line break ("\r\n") in between. Call that new item reuseArrayOffOutput.
  
  var reuseArrayOn = truckList.split(";"); // split the single list of trucks from before, which are seperated by a semicolon, into an array. Call that reuseArrayOn.
  for (var i = 0; i < reuseArrayOn.length; i++) { // for loop, which runs the same number of times as there are items in the reuseArrayOn
    reuseArrayOn[i] =
      reuseprefix +
      reuseArrayOn[i] +
      reusesuffixOn;
  }
  var reuseArrayOnOutput = reuseArrayOn.join("\r\n"); // join all the items (with their new code padding) in reuseArrayOn into a single item, with a line break ("\r\n") in between. Call that new item reuseArrayOnOutput.
  
  var output = newestArray; // define a new variable called output, which is newestArray (the list of trucks with Add PRMT3 commands, seperated by line breaks)
  var outputArray = [ // define a new array called outputArray, which is newestArray, secondShiftArrayOutput, reuseArrayOffOut, and reuseArrayOnOuput combined
    newestArray,
    secondShiftArrayOutput,
    reuseArrayOffOutput,
    reuseArrayOnOutput
  ].join("\r\n"); // join all four arrays together into a single item, seperated by a line break
  var filename = "Undo PRMT3 " + today; // define a new variable, filename, as "Undo PRMT 3" and then today's date
  var blob = new Blob([outputArray], { type: "cmd" }); // create a new blob, which contains the data from outputArray, with the file type "cmd"
  saveAs(blob, filename + ".cmd"); // prompt the user to save the blob as filename.cmd
  document.getElementById('result').innerHTML = outputArray;
});