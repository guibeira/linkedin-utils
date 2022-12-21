/*
Enter the job search page:
https://www.linkedin.com/jobs/search/
do your pre - filter, then copy the content bellow, open your console in your browser and past the script, then call it with the keywords you want, e.g.

  await search(['python', 'django', 'flask'])
*/

const timer = ms => new Promise(res => setTimeout(res, ms))
async function search(content) {
  let has_jobs = true
  while (has_jobs) {
    const pg_button = document.getElementsByClassName("artdeco-pagination__indicator selected")
    const next = pg_button[0].nextElementSibling
    const scroll = document.getElementsByClassName("jobs-search-results-list")[0]

    // go to the end of page to load all jobs
    scroll.scrollTo(0, 1000)
    await timer(200);
    scroll.scrollTo(0, 2000)
    await timer(200);
    scroll.scrollTo(0, 3000)
    await timer(200);
    scroll.scrollTo(0, 4000)
    await timer(200);

    // get list of jobs
    const jobs = document.getElementsByClassName("job-card-list__entity-lockup")
    console.log("Found " + jobs.length + " jobs")

    // loop through jobs
    for (const element of jobs) {
      const job = element;
      console.log("Checking job: ", job.innerText)
      // click on job  to see details
      job.getElementsByClassName("job-card-list__title")[0].click()
      // check if job is a match
      const detail = document.getElementsByClassName("jobs-description-content__text--stretch")[0]
      for (const element of content) {
        const word = element;
        if (detail.innerText.includes(word.capitalize()) || detail.innerText.includes(word.toLowerCase())) {

          const button_save = document.getElementsByClassName("jobs-save-button");

          if (button_save.length > 0) {
            if (button_save[0].innerText.split("\n")[0] == "Salvar") {
              button_save[0].click()
              console.log("Saving job: ", job.innerText)
            } else {
              console.log("Job already saved: ", job.innerText)
            }
          }
        }
      }
      await timer(1000);
    }
    // go to the next page
    if (next) {
      next.getElementsByTagName("button")[0].click()
    } else {
      has_jobs = false
      alert("No more jobs to check!")
    }
  }
}
