let timer = ms => new Promise(res => setTimeout(res, ms))
async function go_to_job_page(){
await timer(2000);
const current_location = document.querySelector(" div.pvs-list__outer-container > ul > li:nth-child(1) > div > div:nth-child(1) > a")
current_location.click();

await timer(2000);
let jobs_button = Array.from(document.getElementsByClassName("org-page-navigation org-page-navigation--is-scrollable org-page-navigation--horizontal org-page-navigation--48dp org-top-card__horizontal-nav-bar artdeco-card__actions")[0].querySelectorAll("a"));

jobs_button = jobs_button.filter(button => button.innerText == "Vagas");
  if (jobs_button.length == 0){
    console.log("No jobs found");
    return false;
  }
jobs_button = jobs_button[0];

jobs_button.click();


await timer(3000);
const job_list = document.getElementsByClassName("t-black--light text-body-medium-bold")
if (job_list.length != 5){
  console.log("No jobs found");
  return false
}
job_list[1].click();
await timer(3000);
return true;
}

async function search(content) {
  let found_jobs = false;
  const timer = ms => new Promise(res => setTimeout(res, ms))
  if (content == null || content == "") {
    alert("You must enter something!");
    return;
  }
  const companyNameToIgnore = "Jobot, CyberCoders";
  const companyNames = companyNameToIgnore.split(',').map(item => item.trim())
  const keywords = content.split(',').map(item => item.trim())
  let has_jobs = true
  while (has_jobs && !found_jobs) {
    const pg_button = document.getElementsByClassName("artdeco-pagination__indicator selected")
    let next = false
    if (pg_button.length == 0) {
      console.log("No more jobs to check!")
    }else{
    next = pg_button[0].nextElementSibling
    }
    const scroll = document.getElementsByClassName("jobs-search-results-list")[0]

    // go to the end of page to load all jobs
    scroll.scrollTo(0, 1000)
    await timer(300);
    scroll.scrollTo(0, 2000)
    await timer(300);
    scroll.scrollTo(0, 3000)
    await timer(300);
    scroll.scrollTo(0, 4000)
    await timer(300);

    // get list of jobs
    const jobs = document.getElementsByClassName("job-card-list__entity-lockup")
    console.log("Found " + jobs.length + " jobs")

    // loop through jobs
    for (const element of jobs) {
      const job = element;
      console.log("Checking job: ", job.innerText)
      // click on job  to see details
      job.getElementsByClassName("job-card-list__title")[0].click()
      const companyName = job.getElementsByClassName("job-card-container__company-name")
      if (companyName.length > 0) {
        console.log("Company name: ", companyName[0].innerText)
        const companyNameText = companyName[0].innerText
        const ignore = companyNames.some(companyNameToIgnore => companyNameText.toLowerCase().includes(companyNameToIgnore.toLowerCase()))
        if (ignore) {
          console.log("Ignoring job: ", job.innerText)
          continue
        }
      }
      // check if job is a match
      const detail = document.getElementsByClassName("jobs-description-content__text--stretch")[0]
      const found_keyword = keywords.some(keyword => detail.innerText.toLowerCase().includes(keyword.toLowerCase()))

      if (found_keyword) {
        console.log("Found job: ", job.innerText)
        found_jobs = true
        break ;
      }
      await timer(400);
    }
    // go to the next page
    if (next) {
      next.getElementsByTagName("button")[0].click()
      await timer(400);
    } else {
      has_jobs = false
      console.log("No more jobs to check!")
    }
  }
  return found_jobs;
}
async function back_to_profile() {
  const timer = ms => new Promise(res => setTimeout(res, ms))
while (!window.location.href.startsWith("https://www.linkedin.com/in")){
  history.back();
  await timer(1000);
}
}



async function send_invite(found_job, custom_message) {
  await timer(1000);
  if (found_job) {
    document.querySelector("div.ph5 > div.pv-top-card-v2-ctas > div > button").click();
    await timer(500);
    if (custom_message != null && custom_message != "") {
      const add_note = document.getElementsByClassName("artdeco-modal__actionbar ember-view text-align-right")[0].querySelector("button:nth-child(1)")
      add_note.focus;
      add_note.click();
      await timer(1000);
      document.getElementById("custom-message").value = custom_message;
      alert("Please add a custom message and click on send button");

    }
    const send_button =document.getElementsByClassName("artdeco-modal__actionbar ember-view text-align-right")[0].querySelector("button:nth-child(2)")

    send_button.click();
    await timer(1000);

  }
}

async function search_and_connect(){
  await timer(1000);
  const had_jobs = await go_to_job_page();
  if (!had_jobs){
    await back_to_profile();
    history.back();
    return;
  }
  const content = "python, django, fast-api, flask";
  const found_job = await search(content);
  await back_to_profile();
  const custom_message = "Hello, how are you? I noticed that you are hiring for a Python position. I'm a senior developer with more than six years of experience. Please reach out to me if I'm a good fit for your open positions. Thanks in advance!"
  await send_invite(found_job, custom_message);
  history.back();
  return i + 1;
}
async function connect() {
    let people_div = document.getElementsByClassName("reusable-search__entity-result-list list-style-none")[0];
    let add_button = Array.from(people_div.getElementsByTagName('button')).filter(button => button.innerText == "Conectar");
    for (indx in add_button) {
      let button = add_button[indx];
      console.log(button)
      if (button == null){
        break;
      }
      profile_link = button.parentElement.parentElement.parentElement.children[1].querySelector("a");
      if (profile_link == null){
        continue;
      }
      await timer(2000); 
      profile_link.click();
      await search_and_connect();
    }
}
await search_and_connect();
