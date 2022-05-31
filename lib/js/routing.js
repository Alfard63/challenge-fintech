//function asynchrone to convert adress to coordinates with geocode api
const getLatLng = async (address) => {
  const url = `https://api-adresse.data.gouv.fr/search/?q=${address}`;
  const response = await fetch(url);
  const data = await response.json();
  data !== undefined && data.features.length > 0
    ? ((lat = data.features[0].geometry.coordinates[1]),
      (lng = data.features[0].geometry.coordinates[0]))
    : (alert(
        "Au moins une des adresses renseignées n'est pas correcte. Veuillez vérifier les informations saisies!",
        "danger",
        document.querySelector("#nav-ope"),
        document.querySelector("hr")
      ),
      [...startAdressInput, ...loadAdressInput, ...unloadAdressInput].forEach(
        (input) => input.classList.add("is-invalid")
      ));
  return [lat, lng];
};

//functions to get routing about 2 waypoints
const getMatrixID = async (start, end) => {
  const API_KEY =
    "N2U3ZjYxNjEzODZlNDY4OGFiM2Q0MTRhZjhlOWZjZmI6NmNiNjM3MTMtZTUzNS00ZGE3LTkzOTItYThlOGI4YzJmMmZl";
  console.log(start);
  console.log(end);
  const url = `https://api.myptv.com/matrixrouting/v1/matrices/async?profile=EUR_TRUCK_40T&results=DISTANCES,TRAVEL_TIMES,TOLL_COSTS&options[currency]=EUR`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      apiKey: API_KEY,
      "Content-Type": "application/json",
    },
    body: `{\"origins\":[{\"latitude\":${start[0]},\"longitude\":${start[1]}},{\"latitude\":${end[0]},\"longitude\":${end[1]}}]}`,
  });
  const data = await response.json();
  return data.id;
};
const getStatus = async (id) => {
  const API_KEY =
    "N2U3ZjYxNjEzODZlNDY4OGFiM2Q0MTRhZjhlOWZjZmI6NmNiNjM3MTMtZTUzNS00ZGE3LTkzOTItYThlOGI4YzJmMmZl";
  const url = `https://api.myptv.com/matrixrouting/v1/matrices/status/${id}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      apiKey: API_KEY,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data.status);
  return data.status;
};
const getMatrix = async (id) => {
  const API_KEY =
    "N2U3ZjYxNjEzODZlNDY4OGFiM2Q0MTRhZjhlOWZjZmI6NmNiNjM3MTMtZTUzNS00ZGE3LTkzOTItYThlOGI4YzJmMmZl";
  const url = `https://api.myptv.com/matrixrouting/v1/matrices/${id}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      apiKey: API_KEY,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
};

const getRoute = async (start, end) => {
  let id = await getMatrixID(start, end);
  if (id === undefined) {
    alert(
      "Une erreur est survenue lors tu traitement. Veuillez réessayer dans un moment...",
      "danger",
      document.querySelector("#nav-ope"),
      document.querySelector("hr")
    );
    return false;
  }

  let status = await getStatus(id);
  let matrix = null;
  let i = 0;

  while (status !== "SUCCEEDED") {
    if (i > 10) {
      alert(
        "Une erreur est survenue lors tu traitement. Veuillez réessayer dans un moment...",
        "danger",
        document.querySelector("#nav-ope"),
        document.querySelector("hr")
      );
      return false;
    }
    await sleep(1000);
    status = await getStatus(id);
    i++;
  }
  matrix = await getMatrix(id);
  console.log(matrix);
  return matrix;
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
