;// catalogue.js
function card(seriesIn) {

  var extraRows = Object.entries( seriesIn.outagesKvps).map(o => {
    console.log(o)
    return `<li class="list-group-item"><span class="searchText">${o[1]}</span><span class="mr-1 text-muted" style="float: right">${o[0]}</span></li>`});

    console.log(extraRows)

  var card = ` <div class="card mb-3" data-all="card" data-unique="${seriesIn.fuelName.toLowerCase()}" style="border-color:#ee12cd">
            <div class="card-header d-flex flex-row justify-content-between align-items-center" style="border-color:#ee12cd">${seriesIn.title}<div class="mb-auto"><a class="btn btn-outline-secondary searchText" href="${seriesIn.href}" target="_blank" role="button">Visit Source</a></div></div>
            <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <span class="searchText">${seriesIn.plant}</span>
                <span class="mr-1 text-muted" style="float: right">Plant</span>
            </li>
            <li class="list-group-item">
                <span class="searchText">${seriesIn.company}</span>
                <span class="mr-1 text-muted" style="float: right">Company</span>
            </li>
              </ul>
            <div class="card-body">
              <p class="card-text">${seriesIn.description}</p>
            </div>
             <ul class="list-group list-group-flush">
             ${extraRows.join("")}
              </ul>
            <div class="card-footer text-muted d-flex flex-row  align-items-center">
              <span style="margin-right:auto">${seriesIn.publishedDate} (${seriesIn.age} days)</span>
             
              <span class="tagSpan" style="background-color:#ee12cd; margin-left:3px">${seriesIn.fuelName}</span>
              <span class="tagSpan" style="background-color:#5b73a3; margin-left:3px">${seriesIn.country}</span>
            </div>
          </div>`;

  return card
}

function compareEntries(a, b) {
  if (a.age < b.age) {
    return -1;
  }
  if (a.age > b.age) {
    return 1;
  }
  // a must be equal to b
  return 0;
}

function getContentWithJson(jsonIn) {

  var json2 = jsonIn.map(o => { return {...o, age: datesModule.differenceFromNow(o.publishedDate), title : titles[o.region], href : hrefs[o.region]}});
  json2.sort(compareEntries);
  console.log(json2)
  let cards = json2.map(x => card(x));
  let newHtml = cards.join('</br>');

  return newHtml;
}
var groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};


function getContentWithJsonTopOne(jsonIn) {

  var json2 = jsonIn.map(o => { return {...o, age: datesModule.differenceFromNow(o.publishedDate)}});
  json2.sort(compareEntries);
  console.log(json2)
  const result = Object.values(groupBy(json2, 'id')).map(o => o[0]);

  let cards = result.map(x => card(x));
  let newHtml = cards.join('</br>');
  return newHtml;
}

