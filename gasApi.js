const url = "https://script.google.com/macros/s/AKfycby92iDh1N9QvciSgRVZmsk-ZmU4OYCSJ8MO9DYX0nsB3C8p49SIUd9KnIzVV0p6p6Nh/exec";

function getBlog() {
    
    let url = "https://script.google.com/macros/s/AKfycbyQRexeP_tBYPZlwzQzFdRO6YQL3dZ6ygw5LDmJp4Emmqg4cU6fOxS0zgoDu5lJy1jR/exec?tab=blog"
   return fetch(url, { method: 'GET' })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            return res;
        })
}


function getRemits() {
    let url = "https://script.google.com/macros/s/AKfycbyQRexeP_tBYPZlwzQzFdRO6YQL3dZ6ygw5LDmJp4Emmqg4cU6fOxS0zgoDu5lJy1jR/exec?tab=remit"
  
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
