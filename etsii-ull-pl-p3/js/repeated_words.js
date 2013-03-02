"use strict"; // Use ECMAScript 5 strict mode in browsers that support it 
 
$(document).ready(function() {
   $("#fileinput").change(calculate); 
}); 

function generateOutput(contents) { 
  return contents.replace(/\b([a-z_A-Z]\w*)(\s+)\1\b/ig,'<span class="repeated">$1</span>$2'); 
  
} 


function calculate(evt) { 
  var f = evt.target.files[0];  
  var contents = ''; 
 
  if (f) { 
    var r = new FileReader(); 
    r.onload = function(e) {  
      contents = e.target.result;
      var escaped  = escapeHtml(contents); 
      var outdiv = document.getElementById("out"); 
      outdiv.className = 'unhidden'; 
      finaloutput.innerHTML = generateOutput(escaped); 
      initialinput.innerHTML = escaped; 
 
    } 
    r.readAsText(f); 
  } else {  
    alert("Failed to load file"); 
  } 
} 

var entityMap = { 
    "&": "&amp;", 
    "<": "&lt;", 
    ">": "&gt;", 
    '"': '&quot;', 
    "'": '&#39;', 
    "/": '&#x2F;' 
}; 
   
function escapeHtml(string) { 
  return String(string).replace(/[&<>\/'"]/g, function (s) { 
    return entityMap[s]; 
  });
}