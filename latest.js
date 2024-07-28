const btId = 'Index'
const getHeader = () => 'Latest';
const getTitle = () => 'EnergyEarly - Latest';
function getContent() {
    let html = `
    <div class="container p-1 mt-1 mb-2">
        <div class="btn-group btn-group-lg btn-group-justified w-100" role="group">
          <input class="rbIndustry btn-check" id="btnradiorbIndustry0" type="radio" name="rbIndustry" value="All" autocomplete="off" checked="checked"></input>
          <label class="btn btn-outline-success" for="btnradiorbIndustry0">All</label>
          <input class="rbIndustry btn-check" id="btnradiorbIndustry1" type="radio" name="rbIndustry" value="GAS" autocomplete="off"></input>
          <label class="btn btn-outline-success" for="btnradiorbIndustry1">GAS</label>
          <input class="rbIndustry btn-check" id="btnradiorbIndustry2" type="radio" name="rbIndustry" value="POWER" autocomplete="off"></input>
          <label class="btn btn-outline-success" for="btnradiorbIndustry2">POWER</label>
        </div>
      </div>
    <div id="dvListings"></div>`
    console.log(html, "here html")
    return html;
}

function onPageLoaded() { getLatest().then(res => document.getElementById('dvListings').innerHTML = getContentWithJson(res));}