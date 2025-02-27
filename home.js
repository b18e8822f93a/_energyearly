;//blog.js
const btId = 'Home'
const getHeader = () => 'Energy Early';
const getTitle = () => 'Energy Early';

function getDynamicContent(blogEntries) {
  console.log(blogEntries)
  var cards = blogEntries.map(o => BlogModule.makeBlogCardSimple(o.txt));
  return cards;
}

function onPageLoaded() { 
  getHome()
  .then(res => getDynamicContent(res))
  .then(html => document.getElementById("dvContainer").innerHTML = html.join(""))
}