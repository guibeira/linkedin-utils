// get list of buttons
const people_div = document.getElementsByClassName("reusable-search__entity-result-list list-style-none")[0];
const add_button = people_div.getElementsByTagName('button');
for (let i = 0; i < add_button.length; i++) {
  let button = add_button[i];
  if (button.innerText == "Conectar") {
    button.click();
    await timer(1000);
    document.getElementsByClassName("artdeco-button artdeco-button--2 artdeco-button--primary ember-view ml1")[0].click();
    global_count++;
  }
}

const timer = ms => new Promise(res => setTimeout(res, ms))
let global_count = 0;
while (true) {
  window.scroll({
    top: 1000,
    left: 100,
    behavior: "smooth",
  });
  await timer(1000);
  let next_button = document.getElementsByClassName("artdeco-pagination__button artdeco-pagination__button--next artdeco-button artdeco-button--muted artdeco-button--icon-right artdeco-button--1 artdeco-button--tertiary ember-view")
  await connect();
  console.log("next_button", next_button);
  if (next_button[0].classList.contains("artdeco-button--disabled")) {
    console.log("No more pages");
    const day = new Date();
    const date_fomated = day.getDate() + "-" + (day.getMonth() + 1) + "-" + day.getFullYear();
    const local_storage_key = localStorage.getItem("count_" + date_fomated);
    if (local_storage_key) {
      global_count = parseInt(local_storage_key) + global_count;
    }
    localStorage.setItem("count_" + date_fomated, global_count);
    break;
  }
  console.log("Next page");
  next_button[0].click();
  await timer(6000);
}
async function connect() {
  let people_div = document.getElementsByClassName("reusable-search__entity-result-list list-style-none")[0];
  let add_button = people_div.getElementsByTagName('button');
  for (let i = 0; i < add_button.length; i++) {
    let button = add_button[i];
    if (button.innerText == "Conectar") {
      button.click();
      await timer(1000);
      document.getElementsByClassName("artdeco-button artdeco-button--2 artdeco-button--primary ember-view ml1")[0].click();
      global_count++;
    }
  }
}
