//Define some constants for the menu
const menutoggleBtn = document.querySelector("#menuBtn");
const menuToggleIcon = document.querySelector("#menuIcon");
const menuList = [...document.querySelectorAll("strong")];
const menuButtons = [menutoggleBtn, menuToggleIcon];

//Define some variables and constants for the users table
let userEditId = null;
const userTableBodyItems = [...document.querySelectorAll("#tableBody tr")];
const userEditButtons = document.querySelectorAll(".edit");
const userDeleteButtons = document.querySelectorAll(".delete");
const addUserBtn = document.querySelector("#addUserBtn");



//function to toggle the menu
const toggleMenu = () => {
  document.querySelector("#menu").classList.toggle("show");
  document.querySelector("main").classList.toggle("show");
  document.querySelector(".user-info").classList.toggle("d-none");
  menuList.forEach((item) => {
    item.classList.toggle("d-none");
  });
  menutoggleBtn.classList.toggle("show");
};

//function to clear values in the form
const clearForm = () => {
  const inputs = document.querySelectorAll("#userEditForm input");
  const selects = document.querySelectorAll("#userEditForm select");
  inputs.forEach((input) => {
    input.value = "";
  });
  selects.forEach((select) => {
    select.value = "Contrôleur de gestion";
  });
};

//function to edit a user
const editUser = (id) => {
  userEditId = id;
  const data = [];
  const inputs = document.querySelectorAll("#userEditForm input");
  const selects = document.querySelectorAll("#userEditForm select");
  [...userTableBodyItems[id].children].forEach((item) => { data.push(item.innerText) });
  data.splice(data.length - 1, 1);
  for (let i = 0; i < 5; i++) {
    inputs[i].value = data[i];
  }
  selects[0].value = data[5].toString();
};

//function to delete a user
const deleteUser = (id) => {
  userTableBodyItems[id].remove();
};

//Define some event listeners
menuButtons.forEach((button) => {
  button.addEventListener("click", () => toggleMenu());
});

addUserBtn.addEventListener("click", () => clearForm());

userEditButtons.forEach((button, id) => {
  button.addEventListener("click", () => editUser(id));
});

userDeleteButtons.forEach((button, id) => {
  button.addEventListener("click", () => deleteUser(id));
});
