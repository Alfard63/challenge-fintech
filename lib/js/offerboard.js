
//function to get the timestamp
const getTimeStamp = (choice) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minute =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const second = date.getSeconds();
  const millisecond = date.getMilliseconds();

  choice === "offer_nb"
    ? (document.querySelector(
        "#offer_nb"
      ).value = `${year}${month}${day}${hour}${minute}${second}${millisecond}`)
    : (document.querySelector(
        "#offer_date"
      ).value = `${day} / ${month} / ${year}  -  ${hour}:${minute}`);
};

const addOfferBtn = document.querySelector("#addOfferBtn");
addOfferBtn.addEventListener("click", () => {
  getTimeStamp("offer_nb");
  getTimeStamp("offer_date");
});

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

const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

prevBtn.addEventListener("click", () => changeTab("prev"));
nextBtn.addEventListener("click", () => changeTab("next"));
