let f = 0.67;
let g = 0.67;

var coordinateList = [];
var finalList = [];
var sampleList = [];
var bufferRadius = 0;

var numButtons = 0
var numColumns = 0
var numRows = 0


$(document).ready(()=>{

var slider = document.getElementById("slider");

slider.onchange = function(){
  var value = slider.value;
  $("#circle").css("width", value);
  $("#circle").css("height", value);
  document.getElementById("bufferval").value = (value/20).toFixed(3);
  finalList = [];
  sampleList = [];
}


var bufferval = document.getElementById("bufferval");
bufferval.oninput = function(){
  slider.value = bufferval.value * 20;
  $("#circle").css("width", slider.value);
  $("#circle").css("height", slider.value);
  finalList = [];
  sampleList = [];
}

var gvar = document.getElementById("g_entry");
var fvar = document.getElementById("f_entry");

gvar.oninput = function(){
  finalList = [];
  sampleList = [];
}


fvar.oninput = function(){
  finalList = [];
  sampleList = [];
}


$("#circle").draggable({
  containment: "parent"
});


function change(e){
  e.target.classList.toggle('color-orange');
  var idName = e.target.id;
  var coordinates = idName.split("_").splice(1, 3)
  
  
  var idToBeRemoved = -1;

 for(var x = 0; x < coordinateList.length; x++){
   if (coordinateList[x][0] == coordinates[0] && coordinateList[x][1] == coordinates[1]){
    idToBeRemoved = x;
   }
 }

 if(idToBeRemoved == -1){
   coordinateList.push(coordinates);
 } else{
   coordinateList.splice(idToBeRemoved, 1);
 }

 console.log(coordinates);
 console.log(coordinateList)

}









function calc(){

 bufferRadius = document.getElementById("slider").value / 20;

f = parseFloat(document.getElementById("f_entry").value);
g = parseFloat(document.getElementById("g_entry").value);

 console.log(f);
 console.log(g);
 console.log(bufferRadius);


  for(var y = 1; y <= numRows; y++){
    for(var x = 1; x <= numColumns; x++){
      
      
      var i = -1;

      for(var z = 0; z < coordinateList.length; z++){
        if (coordinateList[z][0] == x && coordinateList[z][1] == y){
         i = z;
        }
      }
     
      if(i != -1){

        finalList.push(0);
        sampleList.push(0);
        
      } else{

        for (var i = 0; i < coordinateList.length; i++){
          var crime = coordinateList[i];
          var distance = Math.abs(x - crime[0]) + Math.abs(y - crime[1]);          
  
          if (distance > bufferRadius){
  
            if (distance**f == 0){
              var equation1 = 0;
            } else{
              var equation1 = 1 / (distance**f);
            }
  
          } else{
  
            if ((2 * bufferRadius - distance)**g == 0){
              var equation1 = 0;
            } else{
              var equation1 = (bufferRadius**(g - f)) / ((2 * bufferRadius - distance)**g)
            }
  
          }
  
          squareTotal += equation1;
  
        }
  
        finalList.push(squareTotal);
        sampleList.push(squareTotal);
        
      }


      var squareTotal = 0;

    }
  }

  changeButtons()

}


function changeButtons(){

  $("#circle").hide()

  sampleList.sort();

  for (var x  = 1; x <= numButtons; x++){
    var column = x % numColumns;
    if (column == 0){
      column = numColumns;
    }


    var row = Math.ceil(x/numColumns) 


    var idString = "btn_" + column + "_" + row;

    var comparable = finalList[x];
  
    if (comparable == 0){
      var colour = "purple"
    } else if (comparable <= sampleList[Math.ceil(0.9*numButtons)]){
      var colour = "black";
    } else if (comparable <= sampleList[Math.ceil(0.94*numButtons)]){
      var colour = "yellow";
    } else if (comparable <= sampleList[Math.ceil(0.98*numButtons)]){
      var colour = "orange";
    }  else{
      var colour = "red";
    }


    $("#" + idString).css("background-color", colour);
    $("#" + idString).css("opacity", "0.25");

  }

    console.log(finalList);
    console.log(bufferRadius);
    console.log(coordinateList);
}












// Initialize and add the map
function initMap() {
  const uluru = { lat: 30.9010, lng: 75.8573 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: uluru,
    disableDefaultUI: true,
    mapId: '344feaebf975eeb6'
  });
}

window.initMap = initMap();



$("#btn").on("click", function(){
  var menu = document.getElementById("menu");
  menu.classList.toggle("invisible");

  var menu = document.getElementById("btn");
  menu.classList.toggle("back-black");
})




function makeGrid(cellWidth, containerId) {
  let container = document.getElementById(containerId);
  let rect = container.getBoundingClientRect();
  console.log("dimensions", rect.width, rect.height, rect.x, rect.y);

  let i = 1;
  let j = 1;
  
  while(i <= Math.floor(rect.height / cellWidth)) {
    j=1;
    $(`#${containerId}`).append(`<div id="row_${i}" class="btn_row"></div>`);
    var currRow = $(`#row_${i}`);
    console.log(Math.floor(rect.width / cellWidth));
    while(j <= Math.floor(rect.width / cellWidth)) {
      currRow.append(`<button id="btn_${j}_${i}" class="btn1"></button>`);
      j++;
      numButtons++
    }
    i++;
  }

  numColumns = Math.floor(rect.width / cellWidth)
  numRows = i - 1
  console.log(numButtons)
  console.log(numRows)
  console.log(numColumns)
}

makeGrid(10, "buttongrid");



const buttons = document.querySelectorAll("button.btn1");
buttons.forEach((item) => {
  item.addEventListener("click", change)
});

$("#btnshow").on("click", function(){
  document.getElementById("buttongrid").classList.toggle("invisibility-toggle-grid");
  document.getElementById("on1").classList.toggle("invisibility-toggle-grid");
})

$("#buffershow").on("click", function(){
  document.getElementById("circle").classList.toggle("invisibility-toggle-button");
  document.getElementById("on2").classList.toggle("invisibility-toggle-button");
})



$("#result").on("click", calc);

});
