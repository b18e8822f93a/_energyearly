;//entsoe.js
const btId = 'Entsoe'
const getHeader = () => 'Spanish Outages - Today Only';
const getTitle = () => 'EnergyEarly - Entsoe';

function link(o) {
  return  function (record) {
    console.log(record);
    let fromDate = record.startDate;
    let toDate = record.endDate;
    let area = 'CTY|10YES-REE------0!CTA|10YES-REE------0';
    let unitName = record.unit;
    return `https://transparency.entsoe.eu/outage-domain/r2/unavailabilityOfProductionAndGenerationUnits/show?name=&defaultValue=true&viewType=TABLE&areaType=CTA&atch=false&dateTime.dateTime=${fromDate}|UTC|DAY&dateTime.endDateTime=${toDate}|UTC|DAY&area.values=${area}&assetType.values=PU&assetType.values=GU&outageType.values=A54&outageType.values=A53&masterDataFilterName=${unitName}&masterDataFilterCode=&DataTables_Table_4_length=10&DataTables_Table_3_length=10&dv-datatable_length=10`
}(o);
}

let requestFunction = getEntsoe