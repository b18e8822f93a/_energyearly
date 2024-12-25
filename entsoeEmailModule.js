;const EntsoeEmailModule = {


    link(unit) {
      return `https://transparency.entsoe.eu/outage-domain/r2/unavailabilityOfProductionAndGenerationUnits/show?areaType=CTA&area.values=CTY|10YES-REE------0!CTA|10YES-REE------0&assetType.values=PU&assetType.values=GU&outageType.values=A54&outageType.values=A53&outageStatus.values=A05&masterDataFilterName=${unit}&dv-datatable_length=100`
    },
    formatTable(data) {
      let table = data.map(o => this.formatRow(o)).join('');
      let tb = `<table class="T2">  <thead>
        <tr>
        <th>UNIT NAME</th>
        <th>START</th>
        <th>END</th>
       
        <th>INSTALLED</th>
        <th>AVAILABLE</th>
        <th>UNIT TYPE</th>
        <th>OUTAGE TYPE</th>
        <th>FUEL TYPE</th>
        <th>TIMESTAMP UTC</th>
              </thead>
        </tr>${table}</table>`.split("\n").join('');
      return tb;
    },
    formatRow(o) {
      let outageType = o[10] === 'A54' ? "FORCED" : "SCHEDULED";
      let unitType = o[0] === ' A05' ? "PRODUCTION" : "GENERATION"
      let tr = `<tr data-unique="${o[14].replaceAll(' ', '_').toLowerCase()}" data-all="card">
        <td>
        <a href="${this.link(o[11])}" target="_blank">${o[11]}</a>
        </td>
        <td>${o[1]} CET</td>
        <td>${o[2]} CET</td>
        
        <td>${o[6]}</td>
        <td>${o[7]}</td>
        <td>${unitType}</td>
        <td>${outageType}</td>
        <td>${o[14].toUpperCase()}</td>
       
        <td>${new Date(o[12]).toUTCString()}</td>
        </tr>`.split("\n").join('')
  
      console.log(tr)
      return tr;
    }
  }