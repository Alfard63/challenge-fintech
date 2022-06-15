//Define some variables and constants for the table
const tableBody = [...document.querySelectorAll("#tableBody")];
const addBtn = document.querySelector("#addBtn");
const formBtn = document.querySelector("#formBtn");
const formModal = document.querySelector("#formModal");
const inputs = document.querySelectorAll("#editForm input");
const selects = document.querySelectorAll("#editForm select");
const passwordGroup = document.querySelector("#pwd-group");
let id = null;
let edit = false;
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
      position: user.position,
    };
  });
  return result;
};

//function to delete a ligne from the table
const deleteDataFromSQL = async (table, id) => {
  const primaryKeyName = "id_employee";
  const primaryKeyValue = id;
  const response = await fetch("../../action/delete_data.php", {
    method: "POST",
    body: JSON.stringify({ table, primaryKeyValue, primaryKeyName }),
  });
  const data = await response.json();
  console.log(data);
  return data;
};

//function to update data from the table
const updateDataFromSQL = async (dbTable, dbPrimaryKeyName, dbPrimaryKeyValue, dbData) => {
  const response = await fetch("../../action/update_data.php", {
    method: "POST",
    body: JSON.stringify({ dbTable, dbPrimaryKeyName, dbPrimaryKeyValue, dbData }),
  });
  const data = await response.json();
  console.log(data);
  return data;
};

/* Function asynchrone to get users from database and then show them in the table */
const showUsersinTable = async () => {
  tableBody[0].innerHTML = "";
  users =[];

  users = await getDataFromSQL("users");

  //if there are no user in users then for each user in the users array, create a new row in the table
  if (users.length > 0) {
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${user.id}</td>
        <td>${user.surname.toUpperCase()}</td>
        <td>${user.username.toUpperCase()}</td>
        <td>${user.email.toUpperCase()}</td>
        <td>${user.service.toUpperCase()}</td>
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
      button.addEventListener("click", () => viewUser(id, (edit = true)));
    });

    deleteButtons.forEach((button, id) => {
      button.addEventListener("click", () => deleteUser(users[id].id));
    });
  } else {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td colspan="7">No users found</td>
    `;
    tableBody[0].appendChild(newRow);
  }
};

//function to clear values in the form
const clearForm = () => {
  inputs.forEach((input) => {
    input.value = "";
  });
  selects.forEach((select) => {
    select.value = "Contrôleur de gestion";
  });
  formBtn.innerHTML = '<i class="bi bi-person-fill"></i> Valider';
  formBtn.style.display = "inline-block";
  document
    .querySelector("#editForm")
    .setAttribute("action", "../../action/user_creation.php");
  formModal.querySelector("h2").innerHTML =
    '<i class="bi bi-person-fill"></i> Créer un utilisateur';
  passwordGroup.classList.remove("d-none");
  passwordGroup.children[1].setAttribute("required", "");
};

//function for each input, set the value frome the user of the same index in the users array
const viewUser = (id, editMode) => {
  //on view mode and edit mode, hide the password input
  passwordGroup.classList.add("d-none");
  passwordGroup.children[1].removeAttribute("required");

  inputs.forEach((input) => {
    input.value =
      typeof users[id][input.name] === "string"
        ? users[id][input.name].toUpperCase()
        : users[id][input.name];
    editMode === true ? (input.disabled = false) : (input.disabled = true);
  });
  inputs[0].value = users[id].id;

  selects[0].value = users[id].position;

  editMode === true
    ? ((selects[0].disabled = false),
      (formBtn.innerHTML = '<i class="bi bi-pencil-fill"></i> Modifier'),
      (formBtn.style.display = "inline-block"),
      (formModal.querySelector("h2").innerHTML =
        '<i class="bi bi-pencil-fill"></i> Modifier un utilisateur'),
      document
        .querySelector("#editForm")
        .setAttribute("action", `../../action/update_data.php?`),
      (edit = true))
    : ((selects[0].disabled = true),
      (formBtn.style.display = "none"),
      (formModal.querySelector("h2").innerHTML =
        '<i class="bi bi-person-fill"></i> Visualiser l\'utilisateur'),
      (edit = false));
};

//function to delete a ligne from the table
const deleteUser = async (userId) => {
  const response = await deleteDataFromSQL("users", Number(userId));
  if (response === "success") {
    alert(
      `L'utilisateur N°${userId} a été supprimé`,
      "success",
      document.querySelector("main"),
      "div"
    );
    showUsersinTable();
  } else {
    alert(
      `Erreur lors de la suppression de l'utilisateur N°${userId}`,
      "danger",
      document.querySelector("main"),
      "div"
    );
  }
};

// function to edit a user
const editUser = async () => {
  const dbTable = "users";
  const dbPrimaryKeyName = "id_employee";
  const dbPrimaryKeyValue = inputs[0].value;
  console.log(dbPrimaryKeyValue);
  const dbData = {
      surname: inputs[1].value,
      username: inputs[2].value,
      service: inputs[4].value,
      position: selects[0].value,
    }

  const response = await updateDataFromSQL(dbTable, dbPrimaryKeyName, Number(dbPrimaryKeyValue), dbData);
  if (response === "success") {
    alert(
      `L'utilisateur N°${inputs[0].value} a été modifié`,
      "success",
      document.querySelector("main"),
      "div"
    );
    showUsersinTable();
  } else {
    alert(
      `Erreur lors de la modification de l'utilisateur N°${inputs[0].value}`,
      "danger",
      document.querySelector("main"),
      "div"
    );
  }

};

const alert = (message, color, parent, elementType) => {
  const wrapper = document.createElement(elementType);
  wrapper.setAttribute("colspan", "7");
  wrapper.innerHTML = `<div class="alert alert-${color} alert-dismissible fw-bold fs-5" role="alert"> ${message} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;

  parent.appendChild(wrapper);
};

addBtn.addEventListener("click", () => clearForm());

formBtn.addEventListener("click", (e) => {
  if (edit === true) {
    e.preventDefault();
    editUser();
  }
});

showUsersinTable();
