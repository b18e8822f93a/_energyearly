const btId = 'Messages'
const getHeader = () => 'Messages';
const getTitle = () => 'EnergyEarly - Messages';

function content() {
    let html = FrameModule.privacy("basic");
    return html;
}

function onPageLoaded() {getHistory().then(res => document.getElementById('dvContainer').innerHTML = getContentWithJson(res))}