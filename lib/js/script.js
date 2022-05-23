//Define some constants for the menu
const menutoggleBtn = document.querySelector("#menuBtn");
const menuToggleIcon = document.querySelector("#menuIcon");
const menuList = [...document.querySelectorAll("strong")];
const menuButtons = [menutoggleBtn, menuToggleIcon];

//function to toggle the menu
const toggleMenu = () => {
  document.querySelector("aside").classList.toggle("show");
  document.querySelector("main").classList.toggle("show");
  document.querySelector(".user-info").classList.toggle("d-none");
  menuList.forEach((item) => {
    item.classList.toggle("d-none");
  });
  menutoggleBtn.classList.toggle("show");
};


//Define event listeners for each menu button
menuButtons.forEach((button) => {
  button.addEventListener("click", () => toggleMenu());
});