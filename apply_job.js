/*
Enter the job saved jobs
https://www.linkedin.com/my-items/saved-jobs/
then copy the content bellow, open your console in your browser and past the script, then call it with the keywords you want, e.g.

  await apply_jobs()
*/
const timer = ms => new Promise(res => setTimeout(res, ms))

async function apply() {
  const timer = ms => new Promise(res => setTimeout(res, ms))
  const apply_button = document.getElementsByClassName("jobs-apply-button")[0]
  if (apply_button.attributes['role'] != undefined) {
    console.log("External link, please apply manually")
    return
  }
  apply_button.click()
  await timer(2000);
  // next button
  // next button
  let has_next = true
  while (has_next) {
    const modal = document.getElementsByClassName("artdeco-modal-overlay--is-top-layer")
    if (modal == undefined && modal.length == 0) {
      has_next = false
    }
    // resume selection
    const resume_button = document.getElementsByClassName("jobs-resume-picker__resume-btn-container")
    if (resume_button != undefined && resume_button.length > 0) {
      resume_button[0].getElementsByTagName("button")[0].click()
    }
    const errors = document.getElementsByClassName("artdeco-inline-feedback__message")
    if (errors.length > 0) {
      const job_url = window.location.href
      save_job(job_url)
      return
    }
    const unfollow_button = document.getElementsByClassName("ember-checkbox")
    if (unfollow_button != undefined && unfollow_button.length > 0) {
      unfollow_button[0].click()
    }

    const next_button = document.getElementsByClassName("artdeco-button--primary")[0]
    if (next_button != undefined) {
      next_button.click()
    } else {
      has_next = false
    }

    await timer(2000);
  }
  return
}


async function save_job(job_url) {
  // save job on localsotrage
  job_url = job_url.split("?")[0]
  let saved_jobs = JSON.parse(localStorage.getItem('jobs'))
  if (saved_jobs == null) {
    saved_jobs = []
  }
  if (saved_jobs.includes(job_url)) {
    console.log("Job already saved")
  } else {
    console.log("Saving job for later")
    saved_jobs.push(job_url)
    localStorage.setItem('jobs', JSON.stringify(saved_jobs))
  }
}



// iterate over jobs saved
//

function check_job(job_url) {
  job_url = job_url.split("?")[0]
  let saved_jobs = JSON.parse(localStorage.getItem('jobs'))
  if (saved_jobs == null) {
    return false
  }
  if (saved_jobs.includes(job_url)) {
    return true
  }
}

async function apply_jobs() {
  let has_jobs = true
  let number_saved_jobs = 0
  while (has_jobs) {
    const jobs = document.getElementsByClassName("reusable-search__result-container")
    if (jobs.length == 0 || number_saved_jobs == jobs.length) {
      has_jobs = false
      break
    }
    const job = jobs[number_saved_jobs]
    console.log("Checking job: ", job.innerText)
    const job_link = job.getElementsByTagName("a")[0]
    // check if already was visited
    if (check_job(job_link.attributes['href'].value)) {
      console.log("Job already visited")
      number_saved_jobs++
      continue

    }
    console.log("clicking on job")
    job_link.click()
    await timer(3000);
    await apply()
    await timer(3000);
    // window.location.href = "https://www.linkedin.com/my-items/saved-jobs/"
    window.history.back()
    await timer(5000);
    number_saved_jobs++
  }

}

await apply_jobs()

