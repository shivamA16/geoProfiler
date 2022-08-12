
$("#btn").on("click", function(){
    var menu = document.getElementById("menu");
    menu.classList.toggle("invisible");

    var menu = document.getElementById("btn");
    menu.classList.toggle("back-black");
})

make_sticky("#menu")
make_sticky("#btn")


