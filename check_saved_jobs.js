function checkSavedJobs() {
  const jobs = window.localStorage.getItem('jobs')
  window.localStorage.removeItem('jobs')
  if (jobs == null) {
    return []
  }
  else {
    return JSON.parse(jobs)
  }
}
for (const job of checkSavedJobs()) {
  console.log(job)
}
