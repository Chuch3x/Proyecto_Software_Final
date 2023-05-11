
const form = document.querySelector("#menu_form");
const div = document.querySelector("#items_div");

var productos_menu = ["hamburguesa", "pique", "panini"]

form.addEventListener("submit", (event) => {
    event.preventDefault();
 
    div.innerHTML = "<p>" + + "</p>";
   
});
