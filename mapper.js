// let i=0, n=30;

// container.innerHTML = 
//     `<div class="row">${'<div class="cell"></div>'.repeat(n)}</div>`
//     .repeat(n)

let f = 0.67;
let g = 0.67;



var coordinateList = [];
var finalList = [];
var sampleList = [];
var bufferRadius = 0;


var slider = document.getElementById("slider");

slider.onchange = function(){
  var value = slider.value;
  $("#circle").css("width", value);
  $("#circle").css("height", value);
  document.getElementById("bufferval").value = (value/24).toFixed(3);
  finalList = [];
  sampleList = [];
}

var bufferval = document.getElementById("bufferval");
bufferval.oninput = function(){
  slider.value = bufferval.value * 24;
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
  var coordinates = [idName.slice(11, 13), idName.slice(3, 5)];
  
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

}



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

// $("#back").on("click", back);




function calc(){

 bufferRadius = document.getElementById("slider").value / 24;

f = parseFloat(document.getElementById("f_entry").value);
g = parseFloat(document.getElementById("g_entry").value);

 console.log(f);
 console.log(g);
 console.log(bufferRadius);

  // bufferRadius = 5.79166667;

  for(var y = 1; y <= 37; y++){
    for(var x = 1; x <= 83; x++){
      
      
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

  // console.log(finalList);
  // console.log(bufferRadius);
  changeButtons()

}


function changeButtons(){

  $("#circle").hide()

  finalList[0] = finalList[1]
  sampleList[0] = sampleList[1]

  sampleList.sort();

  for (var x  = 1; x <= 3071; x++){
    var column = x % 83;
    if (column == 0){
      column = 83;
    }
    if (column < 10){
      column = "0"+column;
    }

    var row = Math.ceil(x/83) 
    if (row < 10){
      row = "0"+row;
    }

    var idString = "row" + row + "column" + column;

    var comparable = finalList[x-1];
  
    if (comparable == 0){
      var colour = "purple"
    } else if (comparable <= sampleList[2770]){
      var colour = "black";
    } else if (comparable <= sampleList[2895]){
      var colour = "yellow";
    } else if (comparable <= sampleList[3020]){
      var colour = "orange";
    }  else{
      var colour = "red";
    }


    //console.log(sampleList);

    $("#" + idString).css("background-color", colour);
    $("#" + idString).css("opacity", "0.25");

  }

    console.log(finalList);
    console.log(bufferRadius);
    console.log(coordinateList);
}












// Initialize and add the map
function initMap() {
  // The location of Uluru
  const uluru = { lat: 30.9010, lng: 75.8573 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: uluru,
    disableDefaultUI: true,
    mapId: '344feaebf975eeb6'
  });
  // The marker, positioned at Uluru
  // const marker = new google.maps.Marker({
  //   position: uluru,
  //   map: map,
  // });
}

window.initMap = initMap;



$("#btn").on("click", function(){
  var menu = document.getElementById("menu");
  menu.classList.toggle("invisible");

  var menu = document.getElementById("btn");
  menu.classList.toggle("back-black");
})

make_sticky("#menu")
make_sticky("#btn")



