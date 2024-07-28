const btId = 'Request'
const getTitle = () => 'EnergyEarly - Request';
const getHeader = () => 'Request a new alert';

function getContent() {
    let html = `
        <div class="flexContainer2">
        <div></div>
        <div style="  padding-left: 1rem; padding-right: 1rem;">
        <form id='fm1' onsubmit="rssUrlSubmission2()"">  
            <fieldset >
                <legend>Please use this form to request a data source you require an alert for, we will add it to our work item backlog</legend>
            <div class=" mb-3">
        <label for="formGroupExampleInput1" class="form-label">Link to web page</label>
        <input required type="text" class="form-control" id="formGroupExampleInput1" placeholder="Example input placeholder">
        </div>
        <div class="mb-3">
        <label id="formGroupExampleInput1" for="formGroupExampleInput2" class="form-label">Description</label>
        <textarea class="form-control" rows="3" id="formGroupExampleInput2"
        placeholder="any helpful addition information e.g. location on page or post-processing required e.g. grouping, averaging etc"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        </fieldset>
        <div id='dvFeedback'></div>
        </form>

        </div>
        <div></div>
        </div>`;
    return html;
}

function rssUrlSubmission2() {

    let url = document.getElementById('formGroupExampleInput1').value;
    let description = document.getElementById('formGroupExampleInput2').value;
    var thanksBox = document.getElementById("dvFeedback");

    console.log(url);
    console.log(description);
    event.preventDefault()
    event.stopPropagation()

    let packet = { key: 'request', data: [{ link: url, description: description }] }
    let getURL = "https://script.google.com/macros/s/AKfycbxWZSVT7EZxBtavefN_pm4g76Rb9zuASowH-jFp87c7tP1QHGkRXrcl49aNPAzDRgtu/exec";

    fetch(getURL, {
        method: 'POST',
        body: JSON.stringify(packet)
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);

            let isSuccessful = res.okay;
            if (isSuccessful == 0) {
                thanksBox.innerHTML = "Sorry your request could not be completed at this time.";
                thanksBox.classList.add('alert')
                thanksBox.classList.add('alert-secondary')
                document.getElementById('fm1').classList.add('was-validated')
            }
            else if (isSuccessful == 1) {
                thanksBox.innerHTML = "You have successfully submitted a data source for consideration. Thank you.";
                thanksBox.classList.add('alert')
                thanksBox.classList.add('alert-primary')
                document.getElementById('fm1').classList.add('was-validated')
            }
        });
}

function onPageLoaded() {
}