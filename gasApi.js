const apiUrl = "https://script.google.com/macros/s/AKfycbxiKLEB_xdYuhE6yD5BYQ9o-T8i5mtERx3EJw_WKgmrun5-EykoNi9EWw2SlmdwCefc/exec?tab=";

function getJson(url) {
    
    $('#dvSpinnerContainer').toggleClass("hiding2", false);
    $('#dvContainer').toggleClass("hiding2", true);

    return fetch(url, { method: 'GET' })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        $('#dvSpinnerContainer').toggleClass("hiding2", true);
        $('#dvContainer').toggleClass("hiding2", false);
        return res;
    })
}

function getBlog() {
    
    let url = apiUrl + "blog"
    return getJson(url);
}

function getRemits() {

    let url = apiUrl + "remit"
    return getJson(url);
}

function getHistory() {

    let url = apiUrl + "history"
    return getJson(url);
}

function getLatest() {

    let url = apiUrl + "history"
    return getJson(url);
}

function getSources() {
    let url = apiUrl + "feeds"

    return fetch(url, {
      method: 'GET',
     
    })
    .then(res => res.json())
}


function getOutages() {

    let url = "https://script.google.com/macros/s/AKfycbwYlb25MOkKEnxOLmRSmwlL-mnRmIgnPioxVpP4MtFEqfEXUmHAiF5T9EPqMMae_7lR/exec?tab=outages" ;    
    return fetch(url, {
        method: 'GET',
       
      })
      .then(res => res.json())
  } 