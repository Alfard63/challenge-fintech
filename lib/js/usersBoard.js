//Define some variables and constants for the users table
let userEditId = null;
const userTableBodyItems = [...document.querySelectorAll("#tableBody tr")];
const userEditButtons = document.querySelectorAll(".edit");
const userDeleteButtons = document.querySelectorAll(".delete");
const addUserBtn = document.querySelector("#addUserBtn");

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
  [...userTableBodyItems[id].children].forEach((item) => {
    data.push(item.innerText);
  });
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
