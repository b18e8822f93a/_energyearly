;//remits.js
const btId = 'Remits'
const getHeader = () => 'UK Remits - Today Only';
const getTitle = () => 'EnergyEarly - Remits';

function link(o) {
  return  function (record) {
    return `https://bmrs.elexon.co.uk/remit/details/${record.mrid}?messageId=${record.id}`
}(o);
}

let requestFunction = getRemits