;//blog.js
const btId = 'Blog'
const getHeader = () => 'Blog';
const getTitle = () => 'EnergyEarly - Blog';

function getDynamicContent(blogEntries) {
  console.log(blogEntries)
  var cards = blogEntries.reverse().map(o => BlogModule.makeBlogCardFromType(o));
  return cards;
}

function onPageLoaded() { 
  getBlog()
  .then(res => getDynamicContent(res))
  .then(html => document.getElementById("dvContainer").innerHTML = html)
}