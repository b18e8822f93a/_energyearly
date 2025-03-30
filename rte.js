;//rte.js
const btId = 'RTE'
const getHeader = () => 'French Outages - Today Only';
const getTitle = () => 'EnergyEarly - RTE Outages';

function link(o) {
  return  function (record) {
    console.log(record);
    let id = record.id;
    id = id.replace("--", "-")
    id = id.slice(0,-4);
    return `https://iip.cloud-rte-france.com/production-unavailability/${id}`
}(o);
}

let requestFunction = getRte