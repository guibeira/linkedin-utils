/*
Enter the job saved jobs
https://www.linkedin.com/my-items/saved-jobs/
then copy the content bellow, open your console in your browser and past the script, then call it with the keywords you want, e.g.

  await remove()
*/

async function remove() {
  const timer = ms => new Promise(res => setTimeout(res, ms))
  n = 0
  total_jobs_saved = document.getElementsByClassName('reusable-search__result-container').length
  console.log("Total jobs saved: " + total_jobs_saved)
  while (n < total_jobs_saved) {
    const button = document.getElementsByClassName("artdeco-dropdown")[1]
    button.getElementsByTagName('button')[0].click()
    await timer(1000);
    const exclude = document.getElementsByClassName("image-text-lockup__text")[3]
    exclude.click()
    await timer(1000);
    n++
  }
  console.log("All jobs removed")
}
await remove()
