//Define some variables and constants for the table
let id = null;
const tableBodyItems = [...document.querySelectorAll("#tableBody tr")];
const editButtons = document.querySelectorAll(".edit");
const deleteButtons = document.querySelectorAll(".delete");
const viewButtons = document.querySelectorAll(".view");
const addBtn = document.querySelector("#addBtn");
const createBtn = document.querySelector("#createBtn");
const inputs = document.querySelectorAll("#editForm input");
const selects = document.querySelectorAll("#editForm select");

//function to clear values in the form
const clearForm = () => {
  inputs.forEach((input) => {
    input.value = "";
  });
  selects.forEach((select) => {
    select.value = "Contrôleur de gestion";
  });
};

//function to view the formular details, if param edit is true, the formular can be edited
const view = (id, edit) => {
  id = id;
  const data = [];

  [...tableBodyItems[id].children].forEach((item) => {
    data.push(item.innerText);
  });

  data.splice(data.length - 1, 1);

  for (let i = 0; i < 5; i++) {
    inputs[i].value = data[i];
    edit !== true ? (inputs[i].disabled = true) : (inputs[i].disabled = false);
  }

  selects[0].value = data[5].toString();

  edit !== true 
    ? (selects[0].disabled = true, createBtn.style.display = "none") 
    : (selects[0].disabled = false, createBtn.style.display = "block");
};

//function to delete a ligne from the table
const deleteLine = (id) => {
  tableBodyItems[id].remove();
};

//Define some event listeners

addBtn.addEventListener("click", () => clearForm());

editButtons.forEach((button, id) => {
  button.addEventListener("click", () => view(id, edit = true));
});
viewButtons.forEach((button, id) => {
  button.addEventListener("click", () => view(id));
});

deleteButtons.forEach((button, id) => {
  button.addEventListener("click", () => deleteLine(id));
});
