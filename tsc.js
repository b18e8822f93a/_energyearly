const tablesModule = {
    addTable: function (rows, columns) {
        headers = columns;
        console.log(headers);
        let header = headers.map(o => '<th>' + o + '</th>');
        header = '<thead><tr>' + header.join('') + '</tr></thead>';
        let htmlRows = rows.map(o => {
            let tr = '<tr>';
            for (const property of columns) {
                tr += `<td>${o[property.toLowerCase()]}</td>`;
                console.log(`${property}: ${o[property.toLowerCase()]}`);
            }
            return tr + "</tr>";
        });
        return '<table class="T2">' + header + '<tbody>' + htmlRows.join('') + '</tbody></table>';
    },
    addTableWithRadio: function (rows, columns) {
        headers = columns;
        console.log(headers);
        let header = headers.map(o => '<th>' + o + '</th>');
        header = '<thead><tr>' + '<th>' + '</th>' + '<th>Link</th>' + header.join('') + '</tr></thead>';
        let htmlRows = rows.map(o => {
            let checkbox = `<input type="checkbox" id="cb${o.id}" name="cbIsNewOnly" value="cbValue${o.id}"></input>`;
            let checkbox2 = `<a target="_blank" href="${o["link"]}">${o["title"].replace("https://", "").replace("http://", "")}</a>`;
            let tr = '<tr><td>' + checkbox + '</td><td>' + checkbox2 + '</td>';
            for (const property of columns) {
                tr += `<td>${o[property.toLowerCase()]}</td>`;
                console.log(`${property}: ${o[property.toLowerCase()]}`);
            }
            return tr + "</tr>";
        });
        return '<table class="T2">' + header + '<tbody>' + htmlRows.join('') + '</tbody></table>';
    },
};
;
const datesModule = {
    dateOnlyString: function (o) {
        return o.toISOString().substring(0, 10);
    },
    words: function (o) {
        let ms = Date.parse(o);
        let date = new Date(ms);
        const today = new Date(new Date().toDateString());
        const tomorrow = new Date(today.toDateString());
        const yesterday = new Date(today.toDateString());
        today.setDate(tomorrow.getDate() + 1);
        tomorrow.setDate(tomorrow.getDate() + 2);
        yesterday.setDate(tomorrow.getDate());
        if (date < yesterday)
            return this.dateOnlyString(date);
        if (date < today)
            return "today";
        else if (date < tomorrow)
            return "tomorrow";
        else
            return this.dateOnlyString(date);
    },
    inMinutes: function (d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();
        return Math.round((t2 - t1) / (60 * 1000));
    },
    inHours: function (d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();
        return Math.round((t2 - t1) / (3600 * 1000));
    },
    inDays: function (d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();
        return parseInt((t2 - t1) / (24 * 3600 * 1000));
    },
    differenceFromNow: function (o) {
        let ms = Date.parse(o.replaceAll('_', ' '));
        let date = new Date(ms);
        let now = new Date(Date.now());
        let difference = this.inDays(date, now);
        return difference;
    },
    differenceFromNowInHours: function (o) {
        let ms = Date.parse(o);
        let date = new Date(ms);
        let now = new Date(Date.now());
        let difference = this.inHours(date, now) * -1;
        return difference;
    },
    differenceFromNowInMinutes: function (o) {
        let date = new Date(o);
        let now = new Date(Date.now());
        let difference = this.inMinutes(date, now) * -1;
        return difference;
    },
    stringToDate: function (o) {
        let ms = Date.parse(o.replaceAll('_', ' '));
        var date = new Date(ms);
        var newDate = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'medium' }).format(date);
        return newDate;
    }
};
var ThemeModule;
(function (ThemeModule) {
    function addThemeSwitchComponent() {
        const theme = localStorage.getItem("theme-color");
        const isDarkThemeAlready = theme === "dark" ? true : false;
        document.body.classList.toggle("darkTheme", isDarkThemeAlready);
        document.getElementById("swTheme").checked = isDarkThemeAlready;
        console.log(theme);
        document.getElementById("swTheme").onchange = (e) => {
            console.log();
            let themeColour = e.currentTarget.checked ? "dark" : "light";
            localStorage.setItem("theme-color", themeColour);
            document.body.classList.toggle("darkTheme", e.currentTarget.checked);
        };
    }
    ThemeModule.addThemeSwitchComponent = addThemeSwitchComponent;
    function initialisThemeSwitchComponentVar() {
        const theme = localStorage.getItem("theme-color");
        const isDarkThemeAlready = theme === "dark" ? true : false;
        const themeName = isDarkThemeAlready ? "darkTheme" : "lightTheme";
        console.log(theme);
        var s = [...document.styleSheets].find((o) => o.href.indexOf("colours.css") !== -1);
        console.log(s);
        const s2 = [...s.cssRules].find((o) => o.selectorText.indexOf(themeName) !== -1);
        const root = document.querySelector(":root");
        [...s2.style].forEach((key, i) => {
            var val = s2.styleMap.get(key)[0];
            console.log(key, val);
            root.style.setProperty(key, val);
        });
    }
    ThemeModule.initialisThemeSwitchComponentVar = initialisThemeSwitchComponentVar;
    function addThemeSwitchComponentVar() {
        const theme = localStorage.getItem("theme-color");
        const isDarkThemeAlready = theme === "dark" ? true : false;
        document.getElementById("swTheme").checked = isDarkThemeAlready;
        document.getElementById("swTheme").onchange = (e) => {
            let themeColour = e.currentTarget.checked ? "dark" : "light";
            localStorage.setItem("theme-color", themeColour);
            initialisThemeSwitchComponentVar();
        };
    }
    ThemeModule.addThemeSwitchComponentVar = addThemeSwitchComponentVar;
    function setTheme() {
        let theme = localStorage.getItem("theme-color");
        if (!theme)
            theme = 'light';
        document.documentElement.dataset.appliedMode = theme;
    }
    ThemeModule.setTheme = setTheme;
    function initialisecpSwitchBox() {
        let theme = localStorage.getItem("theme-color");
        if (!theme)
            theme = 'light';
        const isDarkThemeAlready = theme === "dark" ? true : false;
        if (isDarkThemeAlready)
            document.getElementById("swTheme").setAttribute("checked", "checked");
        setTheme();
        document.getElementById("swTheme").onchange = (e) => {
            let themeColour = e.currentTarget.checked ? "dark" : "light";
            localStorage.setItem("theme-color", themeColour);
            setTheme();
        };
    }
    ThemeModule.initialisecpSwitchBox = initialisecpSwitchBox;
})(ThemeModule || (ThemeModule = {}));
var BlogModule;
(function (BlogModule) {
    function makeBlogCardFromType(blogEntry) {
        return makeBlogCard(blogEntry.title, blogEntry.txt, blogEntry.date, blogEntry.tag1, blogEntry.tag2);
    }
    BlogModule.makeBlogCardFromType = makeBlogCardFromType;
    function makeBlogCard(title, txt, date, tag1, tag2) {
        let html = `<div class="card mb-3" data-all="card" data-unique="job" style="border-color:#ee12cd">
    <div class="card-header d-flex flex-row justify-content-between align-items-center" style="border-color:#ee12cd">${title}
    <div class="mb-auto"></div></div>
    <div class="card-body">
      <p class="card-text">${txt}</p>
    </div>
    <div class="card-footer text-muted d-flex flex-row  align-items-center">
      <span style="margin-right:auto">${date}</span>
      <span class="tagSpan" style="background-color:#ee12cd; margin-left:3px">${tag2}</span>
      <span class="tagSpan" style="background-color:#6666ff; margin-left:3px">${tag1}</span>
    </div>
    </div>`;
        return html;
    }
    BlogModule.makeBlogCard = makeBlogCard;
})(BlogModule || (BlogModule = {}));
function setTemplate() {
    document.title = getTitle();
    let body = FrameModule.body();
    document.getElementsByTagName('body')[0].innerHTML = body;
    let footerHtml = FrameModule.footer(email);
    document.getElementById("dvFooter").innerHTML = footerHtml;
    let headerHtml = FrameModule.header(links, isOff);
    document.getElementById("dvHeader").innerHTML = headerHtml;
    document.getElementById("spHeaderText").innerHTML = getHeader();
    if (typeof getContent !== 'undefined')
        document.getElementById("dvContainer").innerHTML = getContent();
    if (typeof (btId) !== 'undefined') {
        let buttonId = `bt${btId}Page`;
        document.getElementById(buttonId).classList.remove('link_off');
        document.getElementById(buttonId).classList.add('link_on');
    }
}
window.onload = function () {
    ThemeModule.setTheme();
    setTemplate();
    onPageLoaded();
    ThemeModule.initialisecpSwitchBox();
    if (typeof pageStartUp !== 'undefined')
        pageStartUp();
};
const FrameModule = {
    footer: function (email) {
        let html = ` <footer>
    <div class="content-bottom w-100 d-flex align-items-center">
      <div class="container">
        <div class="d-flex flex-column flex-md-row justify-content-between">
          <span class="d-flex align-items-center footer-references">Copyright<a href="https://www.synthase.co.uk" target="_blank">&nbsp;Synthase&nbsp;</a> Limited 2023. All rights reserved</span>
          <div class="d-flex align-items-center footer-references">
            <a href="mailto:${email}" class="me-2">${email}</a>
            <a href="privacy.html" class="me-2">privacy</a>
            <div id="cpSwitchBox">
              <label class="switch">
                <input id="swTheme" type="checkbox">
                  <span class="slider round"></span>
                </input>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>`;
        return html;
    },
    header: function (links, isLinkSuffix) {
        let linkSuffix = isLinkSuffix ? ".html" : "";
        let buttons = links.map(o => {
            return `<li class="nav-item"><a class="nav-link link_off" id="bt${o}Page" href="${o.toLowerCase() + linkSuffix}">${o}</a></li>`;
        });
        console.log(buttons);
        let html = `<header>
    <div class="content">
      <nav class="navbar navbar-expand-md  navbar-light pt-1 pb-1">
        <div class="container-fluid">
          <img class="logo" src="logo.svg" />
          <button class="navbar-toggler" type="button" data-bs-target="#collapsibleNavbar" data-bs-toggle="collapse">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              ${buttons.join('')}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>`;
        return html;
    },
    body: function () {
        let html = `
    <div id="dvHeader"></div>
    <div class="container">
      <h2 class="myCss pt-2 pb-2">
        <span id="spHeaderText" class="fw-light"></span></h2>
    </div>
     <div id="dvSpinnerContainer" class="hiding2">
    <section > <div id="dvSpinner" class="loader"></div></section>
    
    </div>
    <div id="dvContainer" class="container">
      
    </div>
    <div id="dvFooter"></div>
  `;
        return html;
    },
    privacy: function (sitename) {
        let html = `<div class="card mb-3" data-all="card" data-unique="" style="border-color:">
    <div class="card-header" style="border-color:">Privacy Policy</div>
    <div class="card-body">
      <p class="card-text">No personal data is requested, retrieved or stored by this website.
    </p>
      <p class="card-text">
    </p>
      <p class="card-text">Google Analytics uses a set of cookies to collect information and report site usage statistics without personally identifying individual visitors to Google.</p>
    </div>
    <div class="card-footer text-muted d-flex flex-row justify-content-between align-items-center">
      <span>${sitename}</span>
    
    </div>
    </div>`;
        return html;
    }
};
