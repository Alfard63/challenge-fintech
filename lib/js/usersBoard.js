//Define some variables and constants for the table
const tableBody = [...document.querySelectorAll("#tableBody")];
const addBtn = document.querySelector("#addBtn");
const createBtn = document.querySelector("#createBtn");
const formModal = document.querySelector("#formModal");
const inputs = document.querySelectorAll("#editForm input");
const selects = document.querySelectorAll("#editForm select");
let id = null;
let users = [];


/* function to get data from php using fetch*/
const getDataFromSQL = async (table) => {
  const response = await fetch(`../../action/get_data.php?dbTable=${table}`);
  const data = await response.json();

  /* map data to return only what we need */
  const result = data.map((user) => {
    return {
      id: user.id_employee,
      surname: user.surname,
      username: user.username,
      email: user.email,
      service: user.service,
      position: user.position
    };
  });
  return result;
};

/* Function asynchrone to get users from database and then show them in the table */
const showUsersinTable = async () => { 
  users = await getDataFromSQL('users');

  //if there are no user in users then for each user in the users array, create a new row in the table
  if (users.length > 0) {
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${user.id}</td>
        <td>${(user.surname).toUpperCase()}</td>
        <td>${(user.username).toUpperCase()}</td>
        <td>${(user.email).toUpperCase()}</td>
        <td>${(user.service).toUpperCase()}</td>
        <td>${user.position}</td>
        <td>
          <a href="#" data-bs-toggle="modal" data-bs-target="#formModal">
            <i class="bi bi-eye-fill text-primary view"></i>
          </a>
          <a href="#" data-bs-toggle="modal" data-bs-target="#formModal">
            <i class="bi bi-pencil-fill text-success edit"></i>
          </a>
          <a href="#">
            <i class="bi bi-trash-fill text-danger delete" ></i>
          </a>
        </td>
      `;
      tableBody[0].appendChild(newRow);
    }
    /* add buttons with class .view, .edit and .delete to the arrays */
    const viewButtons = document.querySelectorAll(".view");
    const editButtons = document.querySelectorAll(".edit");
    const deleteButtons = document.querySelectorAll(".delete");

    /* define event listener to each view button */
    viewButtons.forEach((button, id) => {
      button.addEventListener("click", () => viewUser(id));
    });
    
    editButtons.forEach((button, id) => {
      button.addEventListener("click", () => viewUser(id, edit = true));
    });
    
    deleteButtons.forEach((button, id) => {
      button.addEventListener("click", () => deleteUser(id));
    });

  } else {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td colspan="7">No users found</td>
    `;
    tableBody[0].appendChild(newRow);

  };
};

showUsersinTable();

//function to clear values in the form
const clearForm = () => {
  inputs.forEach((input) => {
    input.value = "";
  });
  selects.forEach((select) => {
    select.value = "Contrôleur de gestion";
  });
  createBtn.innerHTML = '<i class="bi bi-person-fill"></i> Valider';; 
  createBtn.style.display = "inline-block"; 
  formModal.querySelector("h2").innerHTML = '<i class="bi bi-person-fill"></i> Créer un utilisateur';
};

//function for each input, set the value frome the user of the same index in the users array
const viewUser = (id, edit) => {
  const passwordInput = inputs[inputs.length - 1].parentNode;

  //on view mode and edit mode, hide the password input
  passwordInput.style.display = "none";

  for (let i = 0; i < 4; i++) {
    inputs[i].value = typeof(users[id][inputs[i].name]) === "string" ? (users[id][inputs[i].name]).toUpperCase() : users[id][inputs[i].name];
    //
    edit === true ? inputs[i].disabled = false : inputs[i].disabled = true;
  };

  selects[0].value = users[id].position;

  edit === true 
    ? (selects[0].disabled = false, createBtn.innerHTML = '<i class="bi bi-pencil-fill"></i> Modifier', createBtn.style.display = "inline-block", formModal.querySelector("h2").innerHTML = '<i class="bi bi-pencil-fill"></i> Modifier un utilisateur')
    : (selects[0].disabled = true, createBtn.style.display = "none", formModal.querySelector("h2").innerHTML = '<i class="bi bi-person-fill"></i> Visualiser l\'utilisateur');
};

//function to delete a ligne from the table
const deleteUser = (id) => {
  const alert = (message) => {
    const main = document.querySelector("main");
    main.appendChild(document.createElement("div")).innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">' + message + '<input class="btn btn-danger" value="Supprimer"> <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
  };

  console.log('delete');
  
  alert('L\'utilisateur sélectionné sera supprimé. confirmer ?')
};

addBtn.addEventListener("click", () => clearForm());

