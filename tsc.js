;
function setupRadioButtonFilterHandlerWithKeyLookup(buttonClass, cellClass, options) {
    $("." + buttonClass).click(function () {
        var theValue = $(this).val();
        var key = options[theValue];
        $('.' + cellClass).hide();
        $('.' + cellClass + '[data-slider*=' + key + ']').show();
        console.log("here in the click event");
    });
}
function runTheFilter(cellClass) {
    let hool = $(".btn-check:checked").toArray().map(o => o.value.replaceAll(' ', '_').toLowerCase());
    let removedAll = hool.filter(x => x != "all");
    if (removedAll.length == 0) {
        $("table[data-all=" + cellClass + "]").show();
        $("tr[data-all=" + cellClass + "]").show();
    }
    else {
        $("table[data-all=" + cellClass + "]").hide();
        $("tr[data-all=" + cellClass + "]").hide();
    }
    let testing = removedAll.reduce((previousValue, currentValue) => previousValue.filter("[data-unique*='" + currentValue + "']"), $("tr[data-all=" + cellClass + "]"));
    let testing2 = removedAll.reduce((previousValue, currentValue) => previousValue.filter("[data-unique*='" + currentValue + "']"), $("table[data-all=" + cellClass + "]"));
    testing.show();
    testing2.show();
}
function setupRadioButtonFilterHandlerWithClassTableRowMultiple(buttonClass, cellClass) {
    $("." + buttonClass).click(function () {
        runTheFilter(cellClass);
    });
}
;
function setupRadioButtonFilterHandlerWithClassTableRow(buttonClass, cellClass) {
    $("." + buttonClass).click(function () {
        let theValue = $(this).val().replaceAll(' ', '_').toLowerCase();
        if (theValue.toLowerCase() == 'all')
            $("tr[data-all=" + cellClass + "]").show();
        else
            $("tr[data-all=" + cellClass + "]").hide();
        let theValueX = $("tr[data-unique=" + theValue + "]");
        if (this.checked)
            $(theValueX).show();
    });
}
;
function setupRadioButtonFilterHandlerWithClass(buttonClass, cellClass) {
    $("." + buttonClass).click(function () {
        let theValue = $(this).val().toLowerCase();
        if (theValue.toLowerCase() == 'all')
            $("div[data-all=" + cellClass + "]").show();
        else
            $("div[data-all=" + cellClass + "]").hide();
        let theValueX = $("div[data-unique=" + theValue + "]");
        if (this.checked)
            $(theValueX).show();
    });
}
;
function setupRadioButtonFilterHandlerWithClassMultiple(buttonClass, cellClass) {
    $("." + buttonClass).click(function () {
        let hool = $(".btn-check:checked").toArray().map(o => o.value.replaceAll(' ', '_').toLowerCase());
        let theValue = $(this).val().toLowerCase();
        let removedAll = hool.filter(x => x != "all");
        if (removedAll.length == 0)
            $("div[data-all=" + cellClass + "]").show();
        else {
            $("div[data-all=" + cellClass + "]").hide();
            let testing = removedAll.reduce((previousValue, currentValue) => previousValue.filter("[data-unique*='" + currentValue + "']"), $("div[data-all=" + cellClass + "]"));
            testing.show();
        }
    });
}
;
function hideShowCard(val, cellClass, dataSelector) {
    let theValue = val.toLowerCase();
    if (theValue.toLowerCase() == 'false')
        $("div[data-all=" + cellClass + "]").show();
    else {
        $("div[data-all=" + cellClass + "]").hide();
        let theValueX = $("div[data-" + dataSelector + "=" + val + "]");
        $(theValueX).show();
    }
}
;
function addNewToggleButtonFilter() {
    var checkbox = document.querySelector("input[name=cbIsNewOnly]");
    if (typeof checkbox != 'undefined') {
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                console.log("Checkbox is checked..");
                hideShowCard("true", "card", "new");
            }
            else {
                console.log("Checkbox is not checked..");
                hideShowCard("false", "card", "new");
            }
        });
    }
}
function coupledButtonAndInput() {
    let checkbox = document.querySelector("input[name=cbIsNewOnly]");
    let element = document.querySelector("#myInput");
    $("#myInput").on("keyup", function () {
        console.log("here but");
    });
    if (typeof checkbox != 'undefined') {
        checkbox.addEventListener('change', function () {
            console.log("Checkbox is here..");
            element.value = '';
        });
    }
}
function manageChangeInOrientation(func, elementToObserve, toWatch = '(orientation: landscape)') {
    function setIsLandscape() {
        const mediaQuery = window.matchMedia(toWatch);
        if (mediaQuery.matches) {
            console.log("landscape");
            if (isLandscape)
                return false;
            else
                isLandscape = true;
        }
        else {
            console.log("portrait");
            if (!isLandscape)
                return false;
            else
                isLandscape = false;
        }
        return true;
    }
    let isLandscape = false;
    function setUpPlotObserver() {
        const plotObserver = new ResizeObserver(entries => {
            if (setIsLandscape()) {
                func(isLandscape);
            }
        });
        let tableDiv = document.querySelector(elementToObserve);
        plotObserver.observe(tableDiv);
    }
    ;
    setUpPlotObserver();
}
;
const radioButtonCreate = {
    setUpEventListenersRadioButton: function setUpEventListenersRadioButton(name, onChange) {
        document.querySelectorAll(`input[type=radio][name="${name}"]`)
            .forEach(x => x.addEventListener("input", () => onChange(x.value)));
    },
    setUpEventListenersCheckboxButton: function setUpEventListenersRadioButton(name, onChange) {
        $(`input[name="${name}"]`).change(function () {
            var v = Array.from($(`input[name='${name}']:checked`)).map((o) => o.value);
            elements;
            console.log(v, "v");
            onChange(v);
        });
    },
    getAnRadioButtonLabelAsValue: function getAnRadioButton(id, label, name, isChecked, className = 'btn-outline-primary') {
        let checked = id === 0 ? "checked" : "";
        if (typeof isChecked !== 'undefined')
            checked = isChecked ? "checked" : "";
        var radioHtml = `<input class='btn-check ${name}' type='radio' id='${name}${id}' value='${label}' name='${name}' ${checked}/>`;
        var labelHtml = `<label class='btn ${className} '  for='${name}${id}'>${label}</label>`;
        return radioHtml + labelHtml;
    },
    getAnRadioButtonColour: function getAnRadioButton(id, label, name, isChecked, colour, className = 'btn-outline-primary') {
        let checked = id === 0 ? "checked" : "";
        if (typeof isChecked !== 'undefined')
            checked = isChecked ? "checked" : "";
        var radioHtml = `<input class='btn-check ' type='radio' id='${name}${id}' value='${id}' name='${name}' ${checked}/>`;
        var labelHtml = `<label style="--xy:${colour}" class='btn ${className} mb-1'  for='${name}${id}'>${label}</label>`;
        return radioHtml + labelHtml;
    },
    getAnRadioButton: function getAnRadioButton(id, label, name, isChecked, className = 'btn-outline-primary') {
        let checked = id === 0 ? "checked" : "";
        if (typeof isChecked !== 'undefined')
            checked = isChecked ? "checked" : "";
        var radioHtml = `<input class='btn-check ' type='radio' id='${name}${id}' value='${id}' name='${name}' ${checked}/>`;
        var labelHtml = `<label class='btn ${className} '  for='${name}${id}'>${label}</label>`;
        return radioHtml + labelHtml;
    },
    getAnCheckButton: function (id, label, name, className = 'btn-outline-primary') {
        let checked = id === 0 ? "checked" : "";
        var radioHtml = `<input class='btn-check' type='checkbox' id='${name}${id}' value='${id}' name='${name}' ${checked}/>`;
        var labelHtml = `<label class='btn ${className} '  for='${name}${id}'>${label}</label>`;
        return radioHtml + labelHtml;
    }
};
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
