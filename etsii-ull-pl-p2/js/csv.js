// See http://en.wikipedia.org/wiki/Comma-separated_values
"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

$(document).ready(function() {
   $("button").click(function() {
     calculate();
   });
 });

function calculate() {

 
  var result;
  var original = document.getElementById("original");
  var temp = original.value;

  /**
	* Expresión regular encontrada en internet  
	* (parece no funcionar aunque es la recomendada en foros y tutoriales)
	* /^(("(?:[^"]|"")*"|[^,]*)(,("(?:[^"]|"")*"|[^,]*))*)$/g;
  */  
  var regexp = /("(-?\w*'?,?\.?:?\s*)+")|(-?\w+)/g 

  var lines = temp.split(/\n+\s*/);
  var commonLength = NaN;
  var r = [];
  
  // Template using underscore
  var row = "<% _.each(items, function(name) { %>"     +
            "                    <td><%= name %></td>" +
            "              <% }); %>";

  if (window.localStorage) localStorage.original  = temp;
  
  for(var t in lines) { 			//Recorre todas las lineas
    var temp = lines[t]; 			//Almacena en temp la linea actual
    var m = temp.match(regexp); 	//Da como resultado todo lo que coincida con la er
    var result = [];
    var error = false;
    
    if (m != null) { //Verifica si la linea esta en blanco o no "creo"
      if (commonLength && (commonLength != m.length)) {
        //alert('ERROR! row <'+temp+'> has '+m.length+' items!');//qqqq
        error = true;
      }
      else {
        commonLength = m.length;
        error = false;
      }
	  
      for(var i in m) {
        var removecomma = m[i].replace(/,\s*$/,'');
        var remove1stquote = removecomma.replace(/^\s*"/,'');
        var removelastquote = remove1stquote.replace(/"\s*$/,'');
        var removeescapedquotes = removelastquote.replace(/\\"/,'"');
        result.push(removeescapedquotes);
      }
      var tr = error? '<tr class="error">' : '<tr>';
      r.push(tr+_.template(row, {items : result})+"</tr>");
    }
    else {
      //alert('ERROR! row '+temp+' does not look as legal CSV');
      error = true;
    }
  }
  r.unshift('<p>\n<table class="center" id="result">');
  r.push('</table>');
  //alert(r.join('\n')); // debug
  finaltable.innerHTML = r.join('\n');
}

window.onload = function() {
  // If the browser supports localStorage and we have some stored data
  if (window.localStorage && localStorage.original) {
    document.getElementById("original").value = localStorage.original;
  }
};