const btId = 'History'
const getHeader = () => 'History';
const getTitle = () => 'EnergyEarly - History';
function content() {
    let html = FrameModule.privacy("basic");
    return html;
}

function get() {
    
    let url = "https://script.google.com/macros/s/AKfycbwLTvXgkM9GU09lw1Uctk39GuyWNothwGQS-OcdxnHQuEEGd_ocXH6L_-HyBH6MLMMj/exec?tab=history"
  
    fetch(url, {
      method: 'GET',
     
    })
      .then(res => res.json())
      .then(res => getContentWithJson(res));
  }
  
  function onPageLoaded() {get()}