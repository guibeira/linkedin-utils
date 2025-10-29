// get list of buttons
let global_count = 0;
const day = new Date();
const date_fomated = day.getDate() + "-" + (day.getMonth() + 1) + "-" + day.getFullYear();
const local_storage_key = parseInt(localStorage.getItem("count_" + date_fomated));

if (local_storage_key) {
  global_count = parseInt(local_storage_key) + parseInt(global_count);
}

let limit = prompt("Please enter the amount connections you want to send", "20");
if (limit == null || limit == "") {
  alert("You must enter something!");
}
limit = parseInt(limit);
const timer = ms => new Promise(res => setTimeout(res, ms));

async function connect() {
  let main_div = document.querySelectorAll('[data-testid="lazy-column"]')[0]
  let people_div = main_div.children[0].children[0]
  let add_button = people_div.getElementsByTagName('button');
  for (let i = 0; i < add_button.length; i++) {
    if (global_count >= limit) {
      console.log("Limit reached");
      break;
    }
    let button = add_button[i];
    if (button.innerText == "Conectar") {
      button.click();
      await timer(1000);
      global_count += 1;
      localStorage.setItem("count_" + date_fomated, global_count);
    }
  }
}

while (true) {
  if (global_count >= limit) {
    console.log("Limit reached");
    break;
  }
  window.scroll({
    top: 1000,
    left: 100,
    behavior: "smooth",
  });
  await timer(1000);
  let next_button = document.querySelectorAll('[data-testid="pagination-controls-next-button-visible"]');
  await connect();
  console.log("next_button", next_button);
  if (next_button.length == 0) {
    console.log("No more pages");
    break;
  }
  console.log("Next page");
  next_button[0].click();
  await timer(6000);
}

