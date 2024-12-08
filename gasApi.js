const url = "https://script.google.com/macros/s/AKfycby92iDh1N9QvciSgRVZmsk-ZmU4OYCSJ8MO9DYX0nsB3C8p49SIUd9KnIzVV0p6p6Nh/exec";

function getBlog() {
    
    let getURL =  url + "?tab=blog";
    return fetch(getURL, { method: 'GET' })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            return res;
        })
}


function getRemits() {
    let url = "https://script.google.com/macros/s/AKfycbyQndB7xAMH22QYwS-95lrO-i0ttbLnHD7O6b00CGSQlSi_IPZJDct8uS3mgAwN-Gsq/exec?tab=remit"
  
    return fetch(url, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            return res;
        })
        ;
}


function getHistory() {

    let url = "https://script.google.com/macros/s/AKfycbwLTvXgkM9GU09lw1Uctk39GuyWNothwGQS-OcdxnHQuEEGd_ocXH6L_-HyBH6MLMMj/exec?tab=history"

    return fetch(url, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            return res;
        })
        ;
}

function getLatest() {

    let url = "https://script.google.com/macros/s/AKfycbwLTvXgkM9GU09lw1Uctk39GuyWNothwGQS-OcdxnHQuEEGd_ocXH6L_-HyBH6MLMMj/exec?tab=history"
  
    return fetch(url, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            return res;
        })
        ;
}

function getSources() {
    let url = "https://script.google.com/macros/s/AKfycbxEEgvMb0TQUk3bqp-DAnXRgkYAKmvjF0A6HvHJRFQsyweBbJbn0EPuhdMqxJMRhpJU/exec?tab=feeds"

    return fetch(url, {
      method: 'GET',
     
    })
      .then(res => res.json())
}


function getOutages() {
    let url = "https://script.google.com/macros/s/AKfycbxrECqIzoMP7bfTGUBIFLaKuOXszs4pNJXqugmxIyYh-yR9z14-TtRBbqb2_Y_VVdFB/exec"

    return fetch(url, {
      method: 'GET',
     
    })
      .then(res => res.json())
     // .then(res => addContentToPage(res));
}
