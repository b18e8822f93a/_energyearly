;//remitEmailModule.js
const RemitEmailModule = {

    link(mrid, id) {
      return `https://bmrs.elexon.co.uk/remit/details/${mrid}?messageId=${id}`
    },
    formatTable(data) {
      let table = data.map(o => this.formatRow(o)).join('');
      let tb = `<table class="T2">  <thead>
        <tr>
         <th>ID</th>
        <th>UNIT NAME</th>
        <th>START</th>
        <th>END</th>
        <th>INSTALLED</th>
        <th>AVAILABLE</th>
        <th>UNAVAILABLE</th>
        <th>UNIT TYPE</th>
        <th>OUTAGE TYPE</th>
        <th>FUEL TYPE</th>
        <th>PUBLISHED</th>
        </tr>
         </thead>
        ${table}</table>`.split("\n").join('');
      return tb;
    },
    formatRow(o) {
      
      let outageType = o[10] === 'A54' ? "FORCED" : "SCHEDULED";
      let unitType = o[0] === ' A05' ? "PRODUCTION" : "GENERATION"
      let tr = `<tr data-unique="${o[16].replaceAll(' ', '_').toLowerCase()},${o[4].replaceAll(' ', '_').toLowerCase()}" data-all="card">
        <td>
        <a href="${this.link(o[21], o[15])}" target="_blank">${o[15]}</a>
        </td>
          <td>${o[4]}</td>
        <td>${o[1]}UTC</td>
        <td>${o[2]}UTC</td>
        <td>${o[13]}</td>
        <td>${o[12]}</td>
        <td>${o[11]}</td>
         <td>${o[10]}</td>
        <td>${outageType}</td>
        <td>${o[16].toUpperCase()}</td>
        <td>${new Date(o[7]).toUTCString()}</td>
        </tr>`.split("\n").join('')
  
    
      return tr;
    },
    formatLongTable(data) {
      let tables = data.map(o => this.formatLongRow(o)).join('');
   
      return tables;
    },
    formatLongRow(o) {
      
      let outageType = o[10] === 'A54' ? "FORCED" : "SCHEDULED";
      let unitType = o[0] === ' A05' ? "PRODUCTION" : "GENERATION";
      let tr = `
      <tr>
      <th>ID</th>
  
      <td>
        <a href="${this.link(o[21], o[15])}" target="_blank">${o[15]}</a>
        </td>
        <tr></tr>
        <th>UNIT NAME</th>
        <td>${o[4]}</td> </tr><tr>
        <th>START</th>
        <td>${o[1]}UTC</td></tr><tr>
        <th>END</th>
        <td>${o[2]}UTC</td></tr><tr>
        <th>INSTALLED</th>
        <td>${o[13]}</td></tr><tr>
        <th>AVAILABLE</th>
        <td>${o[12]}</td></tr><tr>
        <th>UNAVAILABLE</th>
        <td>${o[11]}</td></tr><tr>
        <th>UNIT TYPE</th>
        <td>${o[10]}</td></tr><tr>
        <th>OUTAGE TYPE</th>
        <td>${outageType}</td></tr><tr>
        <th>FUEL TYPE</th>
        <td>${o[16].toUpperCase()}</td></tr><tr>
        <th>PUBLISHED</th>
        <td>${new Date(o[7]).toUTCString()}</td></tr>`
        .split("\n").join('')
        ;
  
      let tb = `<table data-unique="${o[16].replaceAll(' ', '_').toLowerCase()},${o[4].replaceAll(' ', '_').toLowerCase()}" data-all="card" class="T2 T3">  
     
       <tbody>
      ${tr} </tbody>
      </table>`
      .split("\n").join('');
      return tb;
    }
  }