;// catalogue.js
function card(seriesIn) {
  var card = ` <div class="card mb-3" data-all="card" data-unique="${seriesIn.fuel.toLowerCase()}" style="border-color:${seriesIn.tag1Colour}">
            <div class="card-header d-flex flex-row justify-content-between align-items-center" style="border-color:${seriesIn.tag1Colour}">${seriesIn.title}<div class="mb-auto"><a class="btn btn-outline-secondary searchText" href="${seriesIn.link}" target="_blank" role="button">Visit Source</a></div></div>
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
             
              <span class="tagSpan" style="background-color:${seriesIn.tag1Colour}; margin-left:3px">${seriesIn.fuel}</span>
              <span class="tagSpan" style="background-color:${seriesIn.tag2Colour}; margin-left:3px">${seriesIn.country}</span>
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

  let json2 = jsonIn.map(o => { return { content: o.content, timestamp: datesModule.stringToDate(o.timestamp), age: datesModule.differenceFromNow(o.timestamp), ...o.author, tag1Colour : outageTagColours[o.author.fuel.toLowerCase()], tag2Colour : countryTagColours[o.author.country.toLowerCase()] } });
  json2.sort(compareEntries);
  console.log(json2)
  let cards = json2.map(x => card(x));
  let newHtml = cards.join('</br>');

  return newHtml;
}



function getContentWithJsonTopOne(jsonIn) {

  let json2 = jsonIn.map(o => { return { content: o.content, timestamp: datesModule.stringToDate(o.timestamp), age: datesModule.differenceFromNow(o.timestamp), ...o.author, id : o.id } });
  json2.sort(compareEntries);
  console.log(json2)
  const result = Object.values(groupBy(json2, 'id')).map(o => o[0]);

  let cards = result.map(x => card(x));
  let newHtml = cards.join('</br>');
  return newHtml;
}