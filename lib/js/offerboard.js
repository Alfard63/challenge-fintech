//define some variables
//btn
const addOfferBtn = document.querySelector("#addBtn");
const calculateBtn = document.querySelector("#calculateBtn");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
//tabs
const tabs = [...document.querySelectorAll(".tab-pane")];
const tabLinks = [...document.querySelectorAll(".nav-link")];
//inputs
const allFormInputs = document.querySelectorAll(".modal-body input");
const offerNameInput = document.querySelector("#offerName input");
const offerNbInput = document.querySelector("#offerNb input");
const offerDateInput = document.querySelector("#offerDate input");
const contactEnterpriseNameInput = document.querySelector("#customerEnterpriseName input");
const contactNameInput = document.querySelector("#customerName input");
const contactPhoneInput = document.querySelector("#customerPhone input");
const contactEmailInput = document.querySelector("#customerEmail input");
const contactAdressInputs = document.querySelectorAll("#customerAdress input");
const startAdressInputs = document.querySelectorAll("#startAdress input");
const loadAdressInputs = document.querySelectorAll("#loadAdress input");
const downloadAdressInputs = document.querySelectorAll("#downloadAdress input");
const loadTimeInput = document.querySelector("#loadingTime input");
const downloadTimeInput = document.querySelector("#downloadingTime input");
const loadUnitInput = document.querySelector("#loadUnit input");
const loadValueInput = document.querySelector("#loadValue input");
const dailyWorkingTimeInput = document.querySelector("#dailyWorkingTime input");
const totalKmInput = document.querySelector("#totalKm");
const nbCostByKmInput = document.querySelector("#nbCostByKm");
const totalTimeInput = document.querySelector("#totalTime");
const nbCostByTimeInput = document.querySelector("#nbCostByTime");
const totalDayInput = document.querySelector("#totalDay");
const nbCostByDayInput = document.querySelector("#nbCostByDay");
const totalColdGroupInput = document.querySelector("#totalColdGroup");
const nbCostByColdGroupInput = document.querySelector("#nbCostByColdGroup");
const totalCostInput = document.querySelector("#totalCost");
const totalTollsInput = document.querySelector("#totalTolls");
//text where the unit cost will be displayed
const txtKm = document.querySelector("#costKm");
const txtTime = document.querySelector("#costTime");
const txtDay = document.querySelector("#costDay");
const txtColdGroup = document.querySelector("#costColdGroup");
//variables
let dailyWorkingTime = null;
let loadTime = null;
let downloadTime = null;
//interval
let myInterval = null;
//select
const allFormSelects = document.querySelectorAll(".modal-body select");
const statusSelect = document.querySelector("#offerStatus select");
const vehiculeSelect = document.querySelector("#vehiculeSelect select");
//textArea
const commentsArea = document.querySelector("#comments textarea");

//routes
let route1 = {
  time: null,
  dist: null,
  toll: null,
};
let route2 = {
  time: null,
  timeReturn: null,
  dist: null,
  distReturn: null,
  toll: null,
  tollReturn: null,
};
let route3 = {
  time: null,
  dist: null,
  toll: null,
};
//arrays to store the data from the database
let offers =[];
let vehicules = [
  {
    id: "0",
    name: "Frigo surgelé",
    cost_km: 0.534,
    cost_time: 24.51,
    cost_day: 232.87,
    cost_cold_group: 2.6,
  },
  {
    id: "1",
    name: "Frigo frais",
    cost_km: 0.539,
    cost_time: 26.03,
    cost_day: 218.42,
    cost_cold_group: 2.17,
  },
];

/* ********* */
/* FUNCTIONS */
/* ********* */

//function to get the timestamp
const getTimeStamp = (choice) => {
  const date = new Date();
  const year = date.getFullYear().toString().substr(2, 2);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minute =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  choice === "offerNb"
    ? (document.querySelector(
        "#offerNb input"
      ).value = `${year}${month}${day}${hour}${minute}`)
    : (document.querySelector(
        "#offerDate input"
      ).value = `${day} / ${month} / ${year}  -  ${hour}:${minute}`);
};

//function to change the actual tab and tab content when clicking to the previous or next button
const changeTab = (choice) => {
  let newIndex = 0;

  for (let i = 0; i < tabs.length; i++) {
    if (tabs[i].classList.contains("active")) {
      if (choice === "prev" && i === 0) {
        return;
      }
      if (choice === "next" && i === tabs.length - 1) {
        return;
      }
      const inputs = [...document.querySelectorAll(".tab-pane.active input")];
      if (choice === "next" && checkInputs(inputs)) {
        alert(
          "Veuillez remplir tous les champs avant de passer à l'onglet suivant.",
          "warning",
          document.querySelector(".tab-content"),
          document.querySelector(".tab-pane")
        );
        return;
      } else {
        choice === "prev" ? (newIndex = i - 1) : (newIndex = i + 1);
        newIndex === tabs.length -1 && choice === "next" ? nextBtn.innerText = "Enregister le devis" : nextBtn.innerText = "Suivant";
        tabs[i].classList.remove("show");
        tabs[i].classList.remove("active");
        tabLinks[i].classList.remove("active");
        tabs[newIndex].classList.add("show");
        tabs[newIndex].classList.add("active");
        tabLinks[newIndex].classList.add("active");
      }
      return;
    }
  }
};
//function to create an alert message
const alert = (message, type, parentNode, beforeNode) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML =
    '<div class="alert alert-' +
    type +
    ' alert-dismissible fw-bold fs-5" role="alert">' +
    message +
    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

  parentNode.insertBefore(wrapper, beforeNode);
};

//function to convert the time in minutes to hours and minutes
const timeConvert = (n) => {
  var hours = n;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return rhours + " h " + rminutes + " min";
};

//function check if inputs are empty
const checkInputs = (inputs) => {
  inputs.forEach((input) => {
    if (input.value === "") {
      input.classList.add("is-invalid");
      input.classList.remove("is-valid");
    } else {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    }
  });
  const empty = inputs.some((input) => {
    return input.classList.contains("is-invalid");
  });
  return empty; //empty
};

/* //function to get data from from the database
const getDataFromSQL = async (table) => {
  const response = await fetch(`../../action/get_data.php?dbTable=${table}`);
  const data = await response.json();
  return data;
};*/

/* //function to get offers
const getOffers = async () => {
  offers = await getDataFromSQL("offers");
  return offers;
}; */

//function to get the offers from json file
const getOffers = async () => {
  if (offers.length === 0) {
    const response = await fetch("../../json/offers.json");
    const data = await response.json();
    offers = data;
  }
    return offers;
};

//function to update an existing offer in the json file
const updateOffer = async (offer) => {
};

//function to add a new offer in the json file
const addOffer = async (offer) => {

};

/* //function to get vehicles
const getVehicles = async () => {
  vehicles = await getDataFromSQL("vehicle");
  return vehicles;
}; */

//function to show the offers in the table
showOffers = async (uptdate) => {
  /* const offers = await getOffers(); */
  offers = await getOffers();
  if (uptdate) {
    document.querySelector("#offersTableBody").innerHTML = "";
  }
  if (offers.length > 0) {
    for (let i = 0; i < offers.length; i++) {
      const offer = offers[i];
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${offer.nb}</td>
        <td>${offer.name}</td>
        <td>${offer.date}</td>
        <td>${offer.entreprise_name}</td>
        <td>${offer.contact_name}</td>
        <td>${offer.total_cost} €</td>
        <td class="text-primary fw-bold">
          <select class="form-select-sm bg-transparent disabled" value="${offer.status}" name="status_select" disabled>
            <option value="0">En cours</option>
            <option value="1">Validé</option>
            <option value="2">Refusé</option>
          </select>
        </td>
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
      document.querySelector("#offersTableBody").appendChild(newRow);
    }
    /* add buttons with class .view, .edit and .delete to the arrays */
    const viewButtons = document.querySelectorAll(".view");
    const editButtons = document.querySelectorAll(".edit");
    const deleteButtons = document.querySelectorAll(".delete");
    /* define event listener to each view button */
    viewButtons.forEach((button, id) => {
      button.addEventListener("click", () => viewOffer(id));
    });

    editButtons.forEach((button, id) => {
      button.addEventListener("click", () => viewOffer(id, (edit = true)));
    });

/*     deleteButtons.forEach((button, id) => {
      button.addEventListener("click", () => deleteOffer(id));
    }); */
  }


};

//function to calculate the total distance
const getTotalKm = () => {
  const total = Number(route1.dist) + Number(route2.dist) + Number(route3.dist);
  return total;
};
//function to calculate the total cost by kilometers
const getTotalCostKm = () => {
  const total = getTotalKm() * Number(vehicules[vehiculeSelect.value].cost_km);
  return Math.round((total + Number.EPSILON) * 100) / 100;
};


// function to caculate the total service time
const getTotalTime = () => {
  const total = Number(route1.time) + Number(loadTime) + Number(downloadTime) + Number(route2.time) + Number(route3.time);
  return total;
};
//function to calculate the total cost by time of service
const getTotalCostTime = () => {
  const total = getTotalTime() * Number(vehicules[vehiculeSelect.value].cost_time);
  return Math.round((total + Number.EPSILON) * 100) / 100;
};


//function to calculate the total of used days
const getTotalDay = () => {
  const total = getTotalTime() / Number(dailyWorkingTime);
  return Math.round((total + Number.EPSILON) * 100) / 100;
};
//function to calculate the total cost by used days
const getTotalCostDays = () => {
  const total =
    getTotalDay() * Number(vehicules[vehiculeSelect.value].cost_day);
  return Math.round((total + Number.EPSILON) * 100) / 100;
};


//function to calculate the total cost by cold group
const getTotalCostColdGroup = () => {
  const total =
    getTotalTime() *
    Number(vehicules[vehiculeSelect.value].cost_cold_group);
  return Math.round((total + Number.EPSILON) * 100) / 100;
};

//function to calculate the total cost price
const getTotalCost = () => {
  const total =
    getTotalCostKm() +
    getTotalCostTime() +
    getTotalCostDays() +
    getTotalCostColdGroup();
  return Math.round((total + Number.EPSILON) * 100) / 100;
};

//function to calculate the total tolls cost
const getTotalTolls = () => {
  const total = Number(route1.toll) + Number(route2.toll) + Number(route3.toll);
  return Math.round((total + Number.EPSILON) * 100) / 100;
};

const gettotalOperationCost = () => {
  const total = getTotalCost() + getTotalTolls();
  return Math.round((total + Number.EPSILON) * 100) / 100;
};

//function to clear values in the form
const clearForm = () => {
  allFormInputs.forEach((input) => {
    input.value = "";
  });
  allFormSelects.forEach((select) => {
    select.value = "0";
  });
};

//function to show the offer in the form
const viewOffer = (id, edit) => {

//set disabled for all inputs, selects and textareas if edit is false
  allFormInputs.forEach((input) => {
    edit === true ? (input.disabled = false) : (input.disabled = true);
  });
  allFormSelects.forEach((select) => {
    edit === true ? (select.disabled = false) : (select.disabled = true);
  });
  edit === true 
    ? (
        commentsArea.disabled = false,
        calculateBtn.disabled = ""
      )
    : (
        commentsArea.disabled = true,
        calculateBtn.disabled = true
      );

  offerNameInput.value = offers[id].name;
  offerDateInput.value = offers[id].date;
  offerNbInput.value = offers[id].nb;
  statusSelect.value = offers[id].status;
  contactEnterpriseNameInput.value = offers[id].entreprise_name;
  contactNameInput.value = offers[id].contact_name;
  contactPhoneInput.value = offers[id].contact_phone;
  contactEmailInput.value = offers[id].contact_email;
  contactAdressInputs.forEach((input, index) => {
    input.value = offers[id].contact_adress[index];
  });
  offers[id].comment !== "" ?  commentsArea.value = offers[id].comment : null;
  vehiculeSelect.value = offers[id].vehicule;
  startAdressInputs.forEach((input, index) => {
    input.value = offers[id].start_adress[index];
  });
  loadAdressInputs.forEach((input, index) => {
    input.value = offers[id].load_adress[index];
  });
  downloadAdressInputs.forEach((input, index) => {
    input.value = offers[id].download_adress[index];
  });
  loadTimeInput.value = offers[id].loading_time;
  downloadTimeInput.value = offers[id].downloading_time;
  loadUnitInput.value = offers[id].load_unit;
  loadValueInput.value = offers[id].load_value;
  dailyWorkingTimeInput.value = offers[id].daily_working_time;
  route1.time = offers[id].route1.time;
  route1.dist = offers[id].route1.dist;
  route1.toll = offers[id].route1.toll;
  route1.wrapper = `
    <tr>
      <td class="fw-bold">Trajet (A) => (B)</td>
      <td id="routeDist1">${route1.dist} KM</td>
      <td id="routeToll1">${route1.toll} €</td>
      <td id="routeTime1">${route1.time}</td>
    </tr>`;
  route2.time = offers[id].route2.time;
  route2.dist = offers[id].route2.dist;
  route2.toll = offers[id].route2.toll;
  route2.wrapper = `
    <tr>
      <td class="fw-bold">Trajet (B) => (C)</td>
      <td id="routeDist2">${route2.dist} KM</td>
      <td id="routeToll2">${route2.toll} €</td>
      <td id="routeTime2">${route2.time}</td>
    </tr>`;
  route3.time = offers[id].route3.time;
  route3.dist = offers[id].route3.dist;
  route3.toll = offers[id].route3.toll;
  route3.wrapper = `
    <tr>
      <td class="fw-bold">Trajet (C) => (A)</td>
      <td id="routeDist3">${route3.dist} KM</td>
      <td id="routeToll3">${route3.toll} €</td>
      <td id="routeTime3">${route3.time}</td>
    </tr>`;
  document.querySelector("tbody#routesTable").innerHTML =
    route1.wrapper + route2.wrapper + route3.wrapper;
  viewCost();
};

//function to show the unit cost in the form
const viewCost = () => {
  //get the times values
  loadTime = loadTimeInput.value;
  downloadTime = downloadTimeInput.value;
  dailyWorkingTime = dailyWorkingTimeInput.value;

  txtKm.textContent = vehicules[vehiculeSelect.value].cost_km;
  txtTime.textContent = vehicules[vehiculeSelect.value].cost_time;
  txtDay.textContent = vehicules[vehiculeSelect.value].cost_day;
  txtColdGroup.textContent = vehicules[vehiculeSelect.value].cost_cold_group;

  totalKmInput.value = getTotalKm() + " KM";
  nbCostByKmInput.value = getTotalCostKm() + " €";

  totalTimeInput.value = getTotalTime() + " H";
  nbCostByTimeInput.value = getTotalCostTime() + " €";

  totalDayInput.value = getTotalDay() + " jour(s)";
  nbCostByDayInput.value = getTotalCostDays() + " €";

  totalColdGroupInput.value = getTotalTime() + " H";
  nbCostByColdGroupInput.value = getTotalCostColdGroup() + " €";

  totalCostInput.value = getTotalCost() + " €";
  totalTollsInput.value = getTotalTolls() + " €";
  document.querySelector("#totalCostWithTolls").textContent = gettotalOperationCost() + " €";
};

//function to save the offer in the offers array
const saveOffer = () => {
  const offer = {
    nb: offerNbInput.value,
    date: offerDateInput.value,
    name: offerNameInput.value,
    status: statusSelect.value,
    entreprise_name: contactEnterpriseNameInput.value,
    contact_name: contactNameInput.value,
    contact_phone: contactPhoneInput.value,
    contact_email: contactEmailInput.value,
    contact_adress: [
      contactAdressInputs[0].value,
      contactAdressInputs[1].value,
      contactAdressInputs[2].value,
    ],
    comment: commentsArea.value,
    vehicule: vehiculeSelect.value,
    start_adress: [
        startAdressInputs[0].value,
        startAdressInputs[1].value,
        startAdressInputs[2].value,
    ],
    load_adress: [
        loadAdressInputs[0].value,
        loadAdressInputs[1].value,
        loadAdressInputs[2].value,
    ],
    download_adress: [
        downloadAdressInputs[0].value,
        downloadAdressInputs[1].value,
        downloadAdressInputs[2].value,
    ],
    loading_time: loadTime,
    downloading_time: downloadTime,
    load_unit: loadUnitInput.value,
    load_value: loadValueInput.value,
    daily_working_time: dailyWorkingTime,
    route1: {
      time: route1.time,
      dist: route1.dist,
      toll: route1.toll,
    },
    route2: {
      time: route2.time,
      dist: route2.dist,
      toll: route2.toll,
    },
    route3: {
      time: route3.time,
      dist: route3.dist,
      toll: route3.toll,
    },
    total_cost: document.querySelector("#totalCostWithTolls").innerText,
  };
  //if this offer nb already exist in the offers table, update it
  if (offers.find((obj) => obj.nb === offer.nb)) {
    const index = offers.findIndex((obj) => obj.nb === offer.nb);
    offers[index] = offer;
    console.log(offers);
  } else {
    offers.push(offer);
  }

  showOffers(update=true);
};

/* *************** */
/* EVENT LISTENERS */
/* *************** */

window.addEventListener("load", () => {
  //show the offers
  showOffers();
});

addOfferBtn.addEventListener("click", () => {
  clearForm();
  getTimeStamp("offerNb");
  getTimeStamp("offerDate");
});

vehiculeSelect.addEventListener("change", (e) => {
  const selectedVehicle = vehicules.find(
    (vehicule) => vehicule.id === e.target.value
  );
  txtKm.textContent = selectedVehicle.cost_km;
  txtTime.textContent = selectedVehicle.cost_time;
  txtDay.textContent = selectedVehicle.cost_day;
  txtColdGroup.textContent = selectedVehicle.cost_cold_group;
});

prevBtn.addEventListener("click", () => changeTab("prev"));
nextBtn.addEventListener("click", (e) => {
  e.target.innerText === "Suivant" ? changeTab("next") : saveOffer();
});

calculateBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  //get the inputs values
  loadTime = loadTimeInput.value;
  downloadTime = downloadTimeInput.value;
  dailyWorkingTime = dailyWorkingTimeInput.value;

  //show the loading spinner
  document.querySelector(
    "tbody#routesTable"
  ).innerHTML = `<tr><td colspan="4"><div class="spinner-border text-center text-success" role="status"><span class="visually-hidden">Loading...</span></div></td></tr>`;

  //get coordinates from adress
  const startAdressLatLng = await getLatLng(
    `${startAdressInputs[0].value} ${startAdressInputs[1].value} ${startAdressInputs[2].value}`
  );
  const loadAdressLatLng = await getLatLng(
    `${loadAdressInputs[0].value} ${loadAdressInputs[1].value} ${loadAdressInputs[2].value}`
  );
  const downloadAdressLatLng = await getLatLng(
    `${downloadAdressInputs[0].value} ${downloadAdressInputs[1].value} ${downloadAdressInputs[2].value}`
  );
  //first route: start to load adress
  const firstRoute = await getRoute(startAdressLatLng, loadAdressLatLng);
  //second route: load to unload adress
  const secondRoute = await getRoute(loadAdressLatLng, downloadAdressLatLng);
  //third route: unload to start adress
  const thirdRoute = await getRoute(downloadAdressLatLng, startAdressLatLng);
  let i = 0;
  [firstRoute, secondRoute, thirdRoute].forEach((route) => {
    i++;
    if (route !== false) {
      //save the value of the first route and show them in the table
      route1.time = firstRoute.travelTimes[1] / 3600;
      route1.dist = Math.round(firstRoute.distances[1] / 1000, 2);
      route1.toll = firstRoute.tollCosts[1];
      route1.wrapper = `
        <tr>
          <td class="fw-bold">Trajet (A) => (B)</td>
          <td id="routeDist1">${route1.dist} KM</td>
          <td id="routeToll1">${route1.toll} €</td>
          <td id="routeTime1">${timeConvert(route1.time)}</td>
        </tr>`;
      //save the value of the second route
      route2.time = secondRoute.travelTimes[1] / 3600;
      route2.dist = Math.round(secondRoute.distances[1] / 1000, 2);
      route2.toll = secondRoute.tollCosts[1];
      route2.wrapper = `
        <tr>
          <td class="fw-bold">Trajet (B) => (C)</td>
          <td id="routeDist2">${route2.dist} KM</td>
          <td id="routeToll2">${route2.toll} €</td>
          <td id="routeTime2">${timeConvert(route2.time)}</td>
        </tr>`;

      //save the value of the second route
      route3.time = thirdRoute.travelTimes[1] / 3600;
      route3.dist = Math.round(thirdRoute.distances[1] / 1000, 2);
      route3.toll = thirdRoute.tollCosts[1];
      route3.wrapper = `
        <tr>
          <td class="fw-bold">Trajet (C) => (A)</td>
          <td id="routeDist3">${route3.dist} KM</td>
          <td id="routeToll3">${route3.toll} €</td>
          <td id="routeTime3">${timeConvert(route3.time)}</td>
        </tr>`;
      document.querySelector("tbody#routesTable").innerHTML =
        route1.wrapper + route2.wrapper + route3.wrapper;
      viewCost();
      
      return;
    }
    document.querySelector(
      "tbody#routesTable"
    ).innerHTML = `<tr><td colspan="4">Calcul imposible</td></tr>`;
  });
});
