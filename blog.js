const btId = 'Blog'
const getHeader = () => 'Blog';
const getTitle = () => 'EnergyEarly - Blog';
function getDynamicContent(blogEntries) {
  var cards = blogEntries.map(o => BlogModule.makeBlogCardFromType(o));
  return cards;
}

function onPageLoaded() {
  let getURL = "https://script.google.com/macros/s/AKfycbwAfGOhvndD0As3kEq_a12uRCUWsc_0SxFgDRGNVaeGkCqPY8o0CozGcqFtRJq1nUt3/exec?tab=blog";
  let blogEntries = fetch(getURL, { method: 'GET' })
    .then(res => res.json())
    .then(res => getDynamicContent(res))
    .then(html => document.getElementById("dvContainer").innerHTML = html);
}