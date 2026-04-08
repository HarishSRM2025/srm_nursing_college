function toggleMobileNav(){

const nav = document.getElementById("mobileNav");
const overlay = document.getElementById("mobileOverlay");

nav.classList.toggle("open");
overlay.classList.toggle("open");

}

function toggleSubmenu(e){

e.preventDefault();

const parent = e.target.closest(".mobile-group");

parent.classList.toggle("open");

}