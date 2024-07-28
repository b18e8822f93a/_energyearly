;//privacy.js
const getHeader = () => 'Privacy Policy';
const getTitle = () => 'EnergyEarly - Privacy';
function getContent() {
    let html = FrameModule.privacy("basic");
    return html;
}

function onPageLoaded() {
}