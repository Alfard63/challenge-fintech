//define some variables
const addOfferBtn = document.querySelector("#addBtn");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

//function to get the timestamp
const getTimeStamp = (choice) => {
  const date = new Date();
  const year = date.getFullYear().toString().substr(2, 2);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()

  choice === "offer_nb"
    ? (document.querySelector(
        "#offer_nb"
      ).value = `${year}${month}${day}${hour}${minute}`)
    : (document.querySelector(
        "#offer_date"
      ).value = `${day} / ${month} / ${year}  -  ${hour}:${minute}`);
};

//function to change the actual tab and tab content when clicking to the previous or next button
const changeTab = (choice) => {
  console.log(choice);
  let newIndex = 0;
  const tabs = [...document.querySelectorAll(".tab-pane")];
  const tabLinks = [...document.querySelectorAll(".nav-link")];

  for (let i = 0; i < tabs.length; i++) {
    if (tabs[i].classList.contains("active")) {
      if (choice === "prev" && i === 0) {
        console.log("can not go back");
        return;
      }
      if (choice === "next" && i === tabs.length - 1) {
        console.log("can not go forward");
        return;
      }
      choice === "prev" ? (newIndex = i - 1) : (newIndex = i + 1);
      tabs[i].classList.remove("show");
      tabs[i].classList.remove("active");
      tabLinks[i].classList.remove("active");
      tabs[newIndex].classList.add("show");
      tabs[newIndex].classList.add("active");
      tabLinks[newIndex].classList.add("active");
      return;
    }
  }
};

//define some event listeners
addOfferBtn.addEventListener("click", () => {
  getTimeStamp("offer_nb");
  getTimeStamp("offer_date");
});
prevBtn.addEventListener("click", () => changeTab("prev"));
nextBtn.addEventListener("click", () => changeTab("next"));













//function asynchrone to convert adress to coordinates with geocode api
const getCoordinates = async (address) => {
  const url = `https://api-adresse.data.gouv.fr/search/?q=${address}`;
  const response = await fetch(url);
  const data = await response.json();
  const lat = data.features[0].geometry.coordinates[1];
  const lng = data.features[0].geometry.coordinates[0];
  return [lat, lng];
};


let id = null;
let matrixStatus= null;
let matrix= null;


//function to get routing about 2 waypoints
const getMatrixID = async (start, end) => {
  const API_KEY = "N2U3ZjYxNjEzODZlNDY4OGFiM2Q0MTRhZjhlOWZjZmI6NmNiNjM3MTMtZTUzNS00ZGE3LTkzOTItYThlOGI4YzJmMmZl"
  console.log(start);
  console.log(end);
  const url = `https://api.myptv.com/matrixrouting/v1/matrices/async?profile=EUR_TRUCK_40T&results=DISTANCES,TRAVEL_TIMES,TOLL_COSTS&options[currency]=EUR`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      apiKey: API_KEY,
      "Content-Type": "application/json",
    },
    body: `{\"origins\":[{\"latitude\":${start[0]},\"longitude\":${start[1]}},{\"latitude\":${end[0]},\"longitude\":${end[1]}}]}`
  });
  const data = await response.json();
  console.log(typeof data.id);
  return data.id;
};
const getStatus = async (id) => {
  const API_KEY = "N2U3ZjYxNjEzODZlNDY4OGFiM2Q0MTRhZjhlOWZjZmI6NmNiNjM3MTMtZTUzNS00ZGE3LTkzOTItYThlOGI4YzJmMmZl"
  const url = `https://api.myptv.com/matrixrouting/v1/matrices/status/${id}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      apiKey: API_KEY,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data.status;
};
const getMatrix = async (id) => {
  const API_KEY = "N2U3ZjYxNjEzODZlNDY4OGFiM2Q0MTRhZjhlOWZjZmI6NmNiNjM3MTMtZTUzNS00ZGE3LTkzOTItYThlOGI4YzJmMmZl"
  const url = `https://api.myptv.com/matrixrouting/v1/matrices/${id}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      apiKey: API_KEY,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

const firstAdress = document.querySelector("#firstAdress");
const secondAdress = document.querySelector("#secondAdress");
const result = document.querySelector("#result");
const btn1 = document.querySelector("#btn1");

/* btn1.addEventListener("click", async () => {
  const start = await getCoordinates(firstAdress.value);
  const end = await getCoordinates(secondAdress.value);
  id = await getMatrixID(start, end);
  matrixStatus = await getStatus(id);
  matrixStatus.status === "success" ? (matrix = await getMatrix(id)) : console.log("error");
  await console.log(matrix);
});
 */