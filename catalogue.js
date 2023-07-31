


function card(seriesIn) {
    var card = ` <div class="card mb-3" data-all="card" data-unique="job" style="border-color:#ee12cd">
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
              <p class="card-text">${seriesIn.content}</p>
            </div>
            <div class="card-footer text-muted d-flex flex-row  align-items-center">
              <span style="margin-right:auto">${seriesIn.timestamp} (${seriesIn.age} days)</span>
             
              <span class="tagSpan" style="background-color:#ee12cd; margin-left:3px">${seriesIn.fuel}</span>
              <span class="tagSpan" style="background-color:#5b73a3; margin-left:3px">${seriesIn.country}</span>
            </div>
          </div>`;
    
          return card
}

function compareEntries(a, b) {
  if (a.age < b.age) {
    return -1;
  }
  if (a .age >  b.age) {
    return 1;
  }
  // a must be equal to b
  return 0;
}


function getContentWithJson(jsonIn) {
 
  var json2 = jsonIn.map( o=> {return {content : o.content, timestamp : datesModule.stringToDate(o), age : datesModule.differenceFromNow(o), ...o.author }});
  json2.sort(compareEntries);
  console.log(json2)
  let cards = json2.map( x => card(x));
  let newHtml = cards.join('</br>');
  document.getElementById('dvContainer').innerHTML = newHtml;
  return newHtml;
  }
  var groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };
function getContentWithJsonTopOne(jsonIn) {
 
var json2 = jsonIn.map( o=> {return {content : o.content, timestamp : datesModule.stringToDate(o), age : datesModule.differenceFromNow(o), ...o.author }});
json2.sort(compareEntries);
console.log(json2)
const result = Object.values( groupBy(json2, 'id')).map(o => o[0]);

console.log(result)
let cards = result.map( x => card(x));
let newHtml = cards.join('</br>');
document.getElementById('dvContainer').innerHTML = newHtml;
return newHtml;
}

