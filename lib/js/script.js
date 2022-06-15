//Define some constants for the menu
const menutoggleBtn = document.querySelector("#menuBtn");
const menuToggleIcon = document.querySelector("#menuIcon");
const menuList = [...document.querySelectorAll("strong")];
const menuButtons = [menutoggleBtn, menuToggleIcon];

//function to toggle the theme
const toggleTheme = () => {
  const body = document.querySelector("body");
  const themeIcon = document.querySelector("#themeIcon");
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    themeIcon.classList.remove("bi-sun-fill");
    themeIcon.classList.add("bi-moon-fill");
    document.cookie = "theme=dark; max-age=31536000; path=/";
  } else {
    themeIcon.classList.remove("bi-moon-fill");
    themeIcon.classList.add("bi-sun-fill");
    document.cookie = "theme=light; max-age=31536000; path=/";
  }
};

//function to check the theme in the cookie
const checkTheme = () => {
  const body = document.querySelector("body");
  const themeIcon = document.querySelector("#themeIcon");
  if (document.cookie.includes("theme=dark")) {
    body.classList.add("dark");
    themeIcon.classList.remove("bi-sun-fill");
    themeIcon.classList.add("bi-moon-fill");
  } else {
    body.classList.remove("dark");
    themeIcon.classList.remove("bi-moon-fill");
    themeIcon.classList.add("bi-sun-fill");
  }
};
checkTheme();

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

//Define event listener for the theme button
document.querySelector("#themeIcon").addEventListener("click", () => toggleTheme());