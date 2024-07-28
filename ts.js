;//radioButtonCreate
const radioButtonCreate = {

    setUpEventListenersRadioButton: function setUpEventListenersRadioButton(name, onChange) {

        document.querySelectorAll(`input[type=radio][name="${name}"]`)
        .forEach(x => x.addEventListener("input", () => onChange(x.value)));
    },

    setUpEventListenersCheckboxButton: function setUpEventListenersRadioButton(name, onChange) {
        $(`input[name="${name}"]`).change(function () {
            var v = Array.from($(`input[name='${name}']:checked`)).map((o) => o.value);elements
            console.log(v, "v")
            onChange(v);
        });
    },

    getAnRadioButtonLabelAsValue: function getAnRadioButton(id, label, name, isChecked, className = 'btn-outline-primary') {

        let checked =  id === 0 ? "checked" : "";

        if(typeof isChecked !== 'undefined')
             checked =  isChecked ? "checked" : ""; 
       
        var radioHtml = `<input class='btn-check ' type='radio' id='${name}${id}' value='${label}' name='${name}' ${checked}/>`;
        var labelHtml = `<label class='btn ${className} '  for='${name}${id}'>${label}</label>`;

        return radioHtml + labelHtml;
    },
    
    getAnRadioButton: function getAnRadioButton(id, label, name, isChecked, className = 'btn-outline-primary') {

        let checked =  id === 0 ? "checked" : "";

        if(typeof isChecked !== 'undefined')
             checked =  isChecked ? "checked" : ""; 
       
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
}// declare var $: any;


function setupRadioButtonFilterHandlerWithKeyLookup(buttonClass, cellClass, options) {
    //add event for the radio buttons, get the id, get the key, hide all, show with key
    $("." + buttonClass).click(function () {
        var theValue = $(this).val();
        var key = options[theValue];
        $('.' + cellClass).hide();
        // $('.rolesection[data-slider=' + key + ']').show();
        $('.' + cellClass + '[data-slider*=' + key + ']').show();
        console.log("here in the click event");
    });
}

function setupRadioButtonFilterHandlerWithClassTableRow(buttonClass, cellClass) {
    $("." + buttonClass).click(function () {
        
        let theValue = $(this).val().replaceAll(' ','_').toLowerCase();
        if (theValue.toLowerCase() == 'all')
            $("tr[data-all=" + cellClass + "]").show();
        else
            $("tr[data-all=" + cellClass + "]").hide();

        let theValueX = $("tr[data-unique=" + theValue + "]");

        if (this.checked)
            $(theValueX).show()
    });
};

function setupRadioButtonFilterHandlerWithClass(buttonClass, cellClass) {
    $("." + buttonClass).click(function () {

        let theValue = $(this).val().toLowerCase();
        if (theValue.toLowerCase() == 'all')
            $("div[data-all=" + cellClass + "]").show();
        else
            $("div[data-all=" + cellClass + "]").hide();

        let theValueX = $("div[data-unique=" + theValue + "]");

        if (this.checked)
            $(theValueX).show()
    });
};

function setupRadioButtonFilterHandlerWithClassMultiple(buttonClass, cellClass) {
    $("." + buttonClass).click(function () {

        let hool = $(".btn-check:checked").toArray().map(o => o.value.replaceAll(' ','_').toLowerCase());
        let theValue = $(this).val().toLowerCase();
        // arrayOfDivs = $("div[data-all=" + cellClass + "][data-unique*=" + theValue + "]").toArray();
        // console.log(arrayOfDivs);
        //  console.log(theValue);
        // arrayOfDivs.forEach(o => {
        //     o.show.push(theValue);


        // })
        // z.filter("[data-unique*='open']" )
        // console.log(arrayOfDivs);
        let removedAll = hool.filter(x => x != "all")
        if (removedAll.length == 0)
            $("div[data-all=" + cellClass + "]").show();
        else {
            $("div[data-all=" + cellClass + "]").hide();

            // removedAll.forEach(x => {

            let testing = removedAll.reduce((previousValue, currentValue) =>
                previousValue.filter("[data-unique*='" + currentValue + "']"), $("div[data-all=" + cellClass + "]"))
            testing.show();

            // });
        }
    });
};

function hideShowCard(val, cellClass, dataSelector) {

    let theValue = val.toLowerCase();
    if (theValue.toLowerCase() == 'false')
        $("div[data-all=" + cellClass + "]").show();
    else {
        $("div[data-all=" + cellClass + "]").hide();

        let theValueX = $("div[data-" + dataSelector + "=" + val + "]");
        $(theValueX).show()
    }
};

function addNewToggleButtonFilter() {
    var checkbox = document.querySelector("input[name=cbIsNewOnly]");
    if (typeof checkbox != 'undefined') {
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                console.log("Checkbox is checked..");
                hideShowCard("true", "card", "new")

            } else {
                console.log("Checkbox is not checked..");
                hideShowCard("false", "card", "new")
            }
        });

    }
}
// jobs specific, need to replace with elm

function coupledButtonAndInput() {
    let checkbox = document.querySelector("input[name=cbIsNewOnly]");
    let element = document.querySelector("#myInput");
    $("#myInput").on("keyup", function () {
        console.log("here but")
    });

    if (typeof checkbox != 'undefined') {
        checkbox.addEventListener('change', function () {

            console.log("Checkbox is here..");
            element.value = '';

        });

    }

}