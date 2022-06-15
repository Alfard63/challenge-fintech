//define some variables
//modal
const myModal = new bootstrap.Modal(document.getElementById("formModal"), {
  keyboard: false,
});
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
const contactEnterpriseNameInput = document.querySelector(
  "#customerEnterpriseName input"
);
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
let offers = [];
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

/* ************************************** */
/* FUNCTIONS ABOUT DATA FROM THE DATABASE */
/* ************************************** */

/* function to get data from php using fetch*/
const getDataFromSQL = async (table) => {
  const response = await fetch(`../../action/get_data.php?dbTable=${table}`);
  const data = await response.json();

  /* map data to return only what we need */
  const result = data.map((offer) => {
    return {
      offer_id: offer.offer_id,
      nb: offer.nb,
      date: offer.date,
      name: offer.name,
      status: offer.status,
      entreprise_name: offer.entreprise_name,
      contact_name: offer.contact_name,
      contact_phone: offer.contact_phone,
      contact_email: offer.contact_email,
      contact_street_name: offer.contact_street_name,
      contact_city: offer.contact_city,
      contact_postal_code: offer.contact_postal_code,
      comment: offer.comment,
      vehicule: offer.vehicule,
      start_street_name: offer.start_street_name,
      start_city: offer.start_city,
      start_postal_code: offer.start_postal_code,
      load_street_name: offer.load_street_name,
      load_city: offer.load_city,
      load_postal_code: offer.load_postal_code,
      download_street_name: offer.download_street_name,
      download_city: offer.download_city,
      download_postal_code: offer.download_postal_code,
      loading_time: offer.loading_time,
      downloading_time: offer.downloading_time,
      load_unit: offer.load_unit,
      load_value: offer.load_value,
      daily_working_time: offer.daily_working_time,
      route1_time: offer.route1_time,
      route2_time: offer.route2_time,
      route3_time: offer.route3_time,
      route1_dist: offer.route1_dist,
      route2_dist: offer.route2_dist,
      route3_dist: offer.route3_dist,
      route1_toll: offer.route1_toll,
      route2_toll: offer.route2_toll,
      route3_toll: offer.route3_toll,
      total_cost: offer.total_cost,
    };
  });
  return result;
};

//function to delete a ligne from the table
const deleteDataFromSQL = async (table, primaryKeyValue) => {
  const primaryKeyName = "offer_id";
  const response = await fetch("../../action/delete_data.php", {
    method: "POST",
    body: JSON.stringify({ table, primaryKeyValue, primaryKeyName }),
  });
  const data = await response.json();
  console.log(data);
  return data;
};

//function to update data from the table
const updateDataFromSQL = async (
  dbTable,
  dbPrimaryKeyName,
  dbPrimaryKeyValue,
  dbData
) => {
  const response = await fetch("../../action/update_data.php", {
    method: "POST",
    body: JSON.stringify({
      dbTable,
      dbPrimaryKeyName,
      dbPrimaryKeyValue,
      dbData,
    }),
  });
  const data = await response.json();
  console.log(data);
  return data;
};

//function to create data to the table
const createDataToSQL = async (dbTable, dbData) => {
  const response = await fetch("../../action/create_data.php", {
    method: "POST",
    body: JSON.stringify({ dbTable, dbData }),
  });
  const data = await response.json();
  console.log(data);
  return data;
};

/* ************************************** */

//function to generate pdf
const generatePdf = (offer) => {
  const content = `
  <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Devis</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    </head>
    <body>
      <!-- création d'un devis de livraison avec un tableau bootstrap -->
      <header>
        <div class="row">
          <div class="col-10">
            <h1>TRANS-COMPETENCE</h1>
            <hr class="bg-success my-0" style="height: 5px;">
            <h6>L'EXPERT DES TRANSPORTS </h6>
          </div>
          <div class="col-2 d-flex align-items-center">
            <h2 class="fs-1">DEVIS</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-12 fw-bold d-flex justify-content-center">
            <h5 class="me-4
                ">N° de l'offre: </h5>
            <p class="mx-2">${offer.nb}</p> <span>(Référence à rappeler)</span>
          </div>
        </div>
      </header>
      <div class="container-fluid">
        <div class="row fw-bold">
          <div class="col-8">
            <!-- adresse de l'entreprise -->
            <p>
              Trans-Competence<br>
              22 route du glacier<br>
              63000
              Clermont-Ferrand<br>
            </p>
            <p>
            <h6 class="fw-bold">Votre interlocuteur:</h6>
            M. John Doe<br>
            <a href="tel:+0700000000">07 00 00 00 00</a>
            <br>
            <a href="mailto:john.doe@trans-competence.fr">john.doe@trans-competence.fr</a>
            <br>
            </p>
            <p>
              <strong>Date de l'offre:</strong>${offer.date} <br>
              <strong>Référence Client:</strong>${offer.nb}
            </p>
          </div>
          <div class="col-4 d-flex justify-content-end">
            <!-- Nom et adresse du contact -->
            <div class="col-4 w-100 ">
              <p class=" p-2 border border-2 rounded-3">
              ${offer.entreprise_name}<br>
              ${offer.contact_street_name}<br>
              ${offer.contact_postal_code} ${offer.contact_city}
              </p>
              <p class="p-2">
              ${offer.contact_name}<br>
              ${offer.contact_phone}<br>
              ${offer.contact_email}
              </p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 text-center">
            Suite à votre demande, nous avons le plaisir de vous adresser, ci-après, le devis de transport de vos marchandises:
          </div>
        </div>
        <div class="row my-3">
          <div class="col-12">
            <table class="table table-success table-bordered table-striped">
              <thead class="bg-success">
                <tr>
                  <th scope="col">Information sur la livraison</th>
                  <th scope="col">Détail</th>
                  <th scope="col">Quantité</th>
                  <th scope="col">Prix unitaire</th>
                  <th scope="col">montant HT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p>
                      <strong>Adresse de chargement</strong><br>
                      <span><?= ${offer.load_street_name}</span> <br>
                      <span><?= ${offer.load_postal_code} ${offer.load_city}</span><br>
                    </p>
                    <p class="text-end">
                      <strong>Adresse de déchargement</strong><br>
                      <span><?= ${offer.download_street_name}</span> <br>
                      <span><?= ${offer.download_postal_code} ${offer.download_city}</span><br>
                    </p>
                  </td>
                  <td colspan="4">
                  </td>
                </tr>
                <tr>
                  <td>
                    <h6 class="fw-bold">Détails sur la livraison:</h6><br>
                    <p><strong>véhicule: </strong> (capacité max: 40 tonnes)<br></p>
                    <p>
                      <strong>Poid de la marchandise: </strong>${offer.load_value} ${offer.load_unit}<br>
                    </p>
                    <p>
                      <strong>Commentaire: </strong> <br>
                    ${offer.comment}
                    </p>
                  </td>
                  <td>
                    <strong>TRANSPORT</strong><br>
                    <strong>ASSURANCES</strong><br>
                  </td>
                  <td class="text-end">
                    <strong>1</strong><br>
                    <strong>1</strong><br>
                  </td>
                  <td class="text-end pe-3">
                    <strong><?= $total_cost . "€"</strong> <br>
                    <strong><?= $assurance . "€"</strong> <br>
                  </td>
                  <td>
                    <strong><?= $total_cost . "€"</strong> <br>
                    <strong><?= $assurance . "€"</strong> <br>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" class="text-end">
                    <strong>Soit en HT:</strong><br>
                    <strong>Soit en TTC:</strong><br>
                  </td>
                  <td colspan="3" class="text-end">
                    <strong><?= ($total_cost + $assurance) . "€"</strong><br>
                    <strong><?= (($total_cost + $assurance) * 1.2) . "€"</strong><br>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row">
          <div class="col-7">
            <p>
              <strong>Toutes commande est soumise aux Conditions Générales de Vente jointes à la présente offre.</strong> <br>
              Merci de joindre le présent document validé (en ayant sélectionné la -ou les- proposition de transport ) à votre bon de commande. <br><br>
              Dans l'attente de vous servir dans les meilleurs conditions. <br>
              Et restant à votre entière disposition pour tous renseignements complémentaires. <br>
              <strong>Merci de votre confiance.</strong>
    
            </p>
          </div>
          <div class="col-5">
            <div class="border d-flex flex-column justify-content-between border-2 border-dark rounded-3 h-100 text-center">
              <strong>Bon pour accord:</strong>
              <strong>Cachet et signature commercial</strong>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
  `;
  const printWindow = window.open('', '', 'height=400,width=600');
  printWindow.document.write(content);
  printWindow.document.close();
  printWindow.print();
};

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
        newIndex === tabs.length - 1 && choice === "next"
          ? (nextBtn.innerText = "Enregister le devis")
          : (nextBtn.innerText = "Suivant");
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

//function to show the offers in the table
showOffersInTable = async () => {
  offers = null;
  offers = await getDataFromSQL("offer");

  document.querySelector("#offersTableBody").innerHTML = "";

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
          <a href="#">
            <i class="bi bi-filetype-pdf text-success fw-bold pdf"></i>
          </a>
        </td>
        `;
      document.querySelector("#offersTableBody").appendChild(newRow);
    }
    /* add buttons with class .view, .edit and .delete to the arrays */
    const viewButtons = document.querySelectorAll(".view");
    const editButtons = document.querySelectorAll(".edit");
    const deleteButtons = document.querySelectorAll(".delete");
    const pdfButtons = document.querySelectorAll(".pdf");
    /* define event listener to each view button */
    viewButtons.forEach((button, id) => {
      button.addEventListener("click", () => viewOffer(id));
    });

    editButtons.forEach((button, id) => {
      button.addEventListener("click", () => viewOffer(id, (edit = true)));
    });

    deleteButtons.forEach((button, id) => {
      button.addEventListener("click", () => deleteOffer(id));
    });

    pdfButtons.forEach((button, id) => {
      button.addEventListener("click", () => {
        const offer = offers[id];
        const pdf = generatePdf(offer);
      });
    });
  } else {
    document.querySelector(
      "#offersTableBody"
    ).innerHTML = `<tr><td colspan="8">Aucune offre</td></tr>`;
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
  const total =
    Number(route1.time) +
    Number(loadTime) +
    Number(downloadTime) +
    Number(route2.time) +
    Number(route3.time);
  return total;
};
//function to calculate the total cost by time of service
const getTotalCostTime = () => {
  const total =
    getTotalTime() * Number(vehicules[vehiculeSelect.value].cost_time);
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
    getTotalTime() * Number(vehicules[vehiculeSelect.value].cost_cold_group);
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
    input.classList.add("is-invalid");
  });
  allFormSelects.forEach((select) => {
    select.value = "0";
  });
  tabs.forEach((tab) => {
    tab.classList.remove("active");
    tab.classList.remove("show");
  });
  tabLinks.forEach((link) => {
    link.classList.remove("active");
  });
  tabs[0].classList.add("show");
  tabs[0].classList.add("active");
  tabLinks[0].classList.add("active");
  nextBtn.innerText = "Suivant";
  commentsArea.innerText = "";
};

//function to show the offer in the form
const viewOffer = (id, edit) => {
  clearForm();
  //set disabled for all inputs, selects and textareas if edit is false
  allFormInputs.forEach((input) => {
    input.classList.remove("is-invalid");
    edit === true ? (input.disabled = false) : (input.disabled = true);
  });
  allFormSelects.forEach((select) => {
    edit === true ? (select.disabled = false) : (select.disabled = true);
  });
  edit === true
    ? ((commentsArea.disabled = false), (calculateBtn.disabled = ""))
    : ((commentsArea.disabled = true), (calculateBtn.disabled = true));

  offerNameInput.value = offers[id].name;
  offerDateInput.value = offers[id].date;
  offerNbInput.value = offers[id].nb;
  statusSelect.value = offers[id].status;

  contactEnterpriseNameInput.value = offers[id].entreprise_name;

  contactNameInput.value = offers[id].contact_name;
  contactPhoneInput.value = offers[id].contact_phone;
  contactEmailInput.value = offers[id].contact_email;

  contactAdressInputs[0].value = offers[id].contact_street_name;
  contactAdressInputs[1].value = offers[id].contact_city;
  contactAdressInputs[2].value = offers[id].contact_postal_code;

  offers[id].comment !== "" ? (commentsArea.value = offers[id].comment) : null;
  vehiculeSelect.value = offers[id].vehicule;

  startAdressInputs[0].value = offers[id].start_street_name;
  startAdressInputs[1].value = offers[id].start_city;
  startAdressInputs[2].value = offers[id].start_postal_code;

  loadAdressInputs[0].value = offers[id].load_street_name;
  loadAdressInputs[1].value = offers[id].load_city;
  loadAdressInputs[2].value = offers[id].load_postal_code;

  downloadAdressInputs[0].value = offers[id].download_street_name;
  downloadAdressInputs[1].value = offers[id].download_city;
  downloadAdressInputs[2].value = offers[id].download_postal_code;

  loadTimeInput.value = offers[id].loading_time;
  downloadTimeInput.value = offers[id].downloading_time;
  loadUnitInput.value = offers[id].load_unit;
  loadValueInput.value = offers[id].load_value;
  dailyWorkingTimeInput.value = offers[id].daily_working_time;

  route1.time = offers[id].route1_time;
  route1.dist = offers[id].route1_dist;
  route1.toll = offers[id].route1_toll;
  route1.wrapper = `
    <tr>
      <td class="fw-bold">Trajet (A) => (B)</td>
      <td id="routeDist1"><input class="form-control-sm border-0 bg-transparent" name="nb" value="${route1.dist} KM" disabled></td>
      <td id="routeToll1"><input class="form-control-sm border-0 bg-transparent" name="nb" value=${route1.toll} €" disabled></td>
      <td id="routeTime1"><input class="form-control-sm border-0 bg-transparent" name="nb" value=${route1.time} heures" disabled></td>
    </tr>`;

  route2.time = offers[id].route2_time;
  route2.dist = offers[id].route2_dist;
  route2.toll = offers[id].route2_toll;
  route2.wrapper = `
    <tr>
      <td class="fw-bold">Trajet (B) => (C)</td>
      <td id="routeDist1"><input class="form-control-sm border-0 bg-transparent" name="nb" value="${route2.dist} KM" disabled></td>
      <td id="routeToll1"><input class="form-control-sm border-0 bg-transparent" name="nb" value=${route2.toll} €" disabled></td>
      <td id="routeTime1"><input class="form-control-sm border-0 bg-transparent" name="nb" value=${route2.time} heures" disabled></td>
    </tr>`;

  route3.time = offers[id].route3_time;
  route3.dist = offers[id].route3_dist;
  route3.toll = offers[id].route3_toll;
  route3.wrapper = `
    <tr>
      <td class="fw-bold">Trajet (C) => (A)</td>
      <td id="routeDist1"><input class="form-control-sm border-0 bg-transparent" name="nb" value="${route3.dist} KM" disabled></td>
      <td id="routeToll1"><input class="form-control-sm border-0 bg-transparent" name="nb" value=${route3.toll} €" disabled></td>
      <td id="routeTime1"><input class="form-control-sm border-0 bg-transparent" name="nb" value=${route3.time} heures" disabled></td>
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

  txtKm.textContent =
    Math.round((vehicules[vehiculeSelect.value].cost_km + Math.EPSILON) * 100) /
    100;
  txtTime.textContent =
    Math.round(
      (vehicules[vehiculeSelect.value].cost_time + Math.EPSILON) * 100
    ) / 100;
  txtDay.textContent =
    Math.round(
      (vehicules[vehiculeSelect.value].cost_day + Math.EPSILON) * 100
    ) / 100;
  txtColdGroup.textContent =
    Math.round(
      (vehicules[vehiculeSelect.value].cost_cold_group + Math.EPSILON) * 100
    ) / 100;

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
  document.querySelector("#totalCostWithTolls").textContent =
    gettotalOperationCost() + " €";
};

//function to save the offer in the offers array
const saveOffer = async () => {
  console.log("saveOffer");
  const offer = {
    nb: offerNbInput.value,
    date: offerDateInput.value,
    name: offerNameInput.value,
    status: statusSelect.value,

    entreprise_name: contactEnterpriseNameInput.value,

    contact_name: contactNameInput.value,
    contact_phone: contactPhoneInput.value,
    contact_email: contactEmailInput.value,

    contact_street_name: contactAdressInputs[0].value,
    contact_city: contactAdressInputs[1].value,
    contact_postal_code: contactAdressInputs[2].value,

    comment: commentsArea.value,
    vehicule: vehiculeSelect.value,

    start_street_name: startAdressInputs[0].value,
    start_city: startAdressInputs[1].value,
    start_postal_code: startAdressInputs[2].value,

    load_street_name: loadAdressInputs[0].value,
    load_city: loadAdressInputs[1].value,
    load_postal_code: loadAdressInputs[2].value,

    download_street_name: downloadAdressInputs[0].value,
    download_city: downloadAdressInputs[1].value,
    download_postal_code: downloadAdressInputs[2].value,

    loading_time: loadTime,
    downloading_time: downloadTime,
    load_unit: loadUnitInput.value,
    load_value: loadValueInput.value,
    daily_working_time: dailyWorkingTime,

    route1_time: route1.time,
    route1_dist: route1.dist,
    route1_toll: route1.toll,

    route2_time: route2.time,
    route2_dist: route2.dist,
    route2_toll: route2.toll,

    route3_time: route3.time,
    route3_dist: route3.dist,
    route3_toll: route3.toll,

    total_cost: document.querySelector("#totalCostWithTolls").innerText,
  };
  //if this offer nb already exist in the offers table, update it
  if (offers.find((obj) => obj.nb === offer.nb)) {
    const update = await updateDataFromSQL("offer", "nb", offer.nb, offer);
    console.log(update);
  } else {
    const create = await createDataToSQL("offer", offer);
    console.log(create);
  }

  showOffersInTable();
};

//function to delete an offer
const deleteOffer = async (id) => {
  const deleteOffer = await deleteDataFromSQL(
    "offer",
    Number(offers[id].offer_id)
  );
  showOffersInTable();
};

/* *************** */
/* EVENT LISTENERS */
/* *************** */

window.addEventListener("load", () => {
  //show the offers
  showOffersInTable();
});

addOfferBtn.addEventListener("click", () => {
  clearForm();
  allFormInputs.forEach((input) => {
    input.disabled = "";
  });
  allFormSelects.forEach((select) => {
    select.disabled = "";
  });
  commentsArea.disabled = "";
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
  if (e.target.innerText === "Suivant") {
    e.preventDefault();
    changeTab("next");
  } else {
    e.preventDefault();
    saveOffer();
    clearForm();
    myModal.hide();
  }
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
          <td id="routeDist1"><input class="form-control-sm border-0 bg-transparent" name="nb" value="${
            route1.dist
          } KM" disabled></td>
          <td id="routeToll1"><input class="form-control-sm border-0 bg-transparent" name="nb" value=${
            route1.toll
          } €" disabled></td>
          <td id="routeTime1"><input class="form-control-sm border-0 bg-transparent" name="nb" value=${timeConvert(
            route1.time
          )} heures" disabled></td>
        </tr>`;
      //save the value of the second route
      route2.time = secondRoute.travelTimes[1] / 3600;
      route2.dist = Math.round(secondRoute.distances[1] / 1000, 2);
      route2.toll = secondRoute.tollCosts[1];
      route2.wrapper = `
        <tr>
          <td class="fw-bold">Trajet (B) => (C)</td>
          <td id="routeDist1"><input class="form-control-sm border-0 bg-transparent" name="nb" value="${
            route2.dist
          } KM" disabled></td>
          <td id="routeToll1"><input class="form-control-sm border-0 bg-transparent" name="nb" value=${
            route2.toll
          } €" disabled></td>
          <td id="routeTime1"><input class="form-control-sm border-0 bg-transparent" name="nb" value=${timeConvert(
            route2.time
          )} heures" disabled></td>
        </tr>`;

      //save the value of the second route
      route3.time = thirdRoute.travelTimes[1] / 3600;
      route3.dist = Math.round(thirdRoute.distances[1] / 1000, 2);
      route3.toll = thirdRoute.tollCosts[1];
      route3.wrapper = `
        <tr>
          <td class="fw-bold">Trajet (C) => (A)</td>
          <td id="routeDist1"><input class="form-control-sm border-0 bg-transparent" name="nb" value="${
            route3.dist
          } KM" disabled></td>
          <td id="routeToll1"><input class="form-control-sm border-0 bg-transparent" name="nb" value=${
            route3.toll
          } €" disabled></td>
          <td id="routeTime1"><input class="form-control-sm border-0 bg-transparent" name="nb" value=${timeConvert(
            route3.time
          )}" disabled></td>
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
