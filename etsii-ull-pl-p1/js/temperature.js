"use strict"; // Use ECMAScript 5 strict mode in browsers that support it
function calculate() {
  var result;
  var original = document.getElementById("original");
  var temp = original.value;
  var regexp = /^(?:\+|-)?\d+(\.)?\d+[cCfF]$/;
  
  var m = temp.match(regexp);
  
  if (m) {
    var num =  temp.substring(0, temp.length-1);
    var type = temp.substring(temp.length-1);
    num = parseFloat(num);
    if (type == "c" || type == "C") {
      result = (num * 9/5)+32;
      result = result.toString();
	  result = result + "F";
    }
    else {
      result = (num - 32)*5/9;
      result = result.toString();
	  result = result + "C";
    }
    converted.innerHTML = "<div class='alert alert-success'><span class='label label-success'>Success</span>"+result+"</div>";
  }
  else {
    converted.innerHTML = "<div class='alert alert-error'><span class='label label-important'>Error</span> Try something like -4.2C instead</div>";
  }
}