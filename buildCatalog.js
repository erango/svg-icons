let fs = require('fs');

const ICONS_PER_ROW = 5;

function buildRows(filesArray) {
    let rows = '';
    for(let i=0; i<filesArray.length; i++) {
        if(i%ICONS_PER_ROW === 0) {
            rows += `<tr>\n`;
        }

        let iconName = filesArray[i].slice(0, -4);

        rows += `<td onclick="copyToClipboard('${iconName}');"><div class="box"><img height="80px" src="${process.env.PATH_PREFIX || ''}/assets/${filesArray[i]}" /><p class="name">${filesArray[i]}</p></div></td>\n`;

        if(i%ICONS_PER_ROW === ICONS_PER_ROW) {
            rows += `</tr>\n`;
        }
    }

    return rows;
}


function buildHtml() {
    let files = fs.readdirSync('./assets/');
    console.log(files.length);

    let resultHtml = `
<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');
body {font-family: 'Roboto Condensed', sans-serif; width: 780px; margin: auto; padding: 40px; background: #ebebeb; user-select: none}
table {box-shadow: 0 0 18px rgba(0,0,0,0.3); padding: 40px; width: 100%; background: white; border-radius: 2px; table-layout: fixed;}
table td:not(:last-of-type) {padding: 6px;}
table td {transition: background-color 0.15s; border-radius: 2px;}
table td:hover {background-color: #efefef; cursor: pointer;}
h1, p {cursor: default;}
.box {display: flex; flex-direction: column; justify-content: center; text-align: center;}
.name {color: #888; font-weight: 100; font-size: 13px;}
#copy-text-area {opacity: 0; position: absolute; z-index: -10}
#message {transition: background-color 0.3s ease-in-out; padding: 8px 4px; text-align: center; width: 100%; border-radius: 2px;}
</style>
<html>
    <body>
        <h1>Icon Catalog</h1>
        <table>
            ${buildRows(files)}
        </table>
        <p id="message">Click to copy icon name</p>
        <textarea id="copy-text-area"></textarea>
    </body>
</html>
<script>
function showError() {
    let messageArea = document.querySelector('#message');
    messageArea.style.backgroundColor = '#dd4455';
    messageArea.textContent = "Something went wrong. Do I have to do everything around here? Copy the icon name yourself!"
    resetMessageBackground();
}

function resetMessageBackground() {
    setTimeout(function() {
        let messageArea = document.querySelector('#message');
        messageArea.style.backgroundColor = 'transparent';
        messageArea.textContent = 'Click to copy icon name';
    }, 2400);
}
function copyToClipboard(text) {
  let copyTextarea = document.querySelector('#copy-text-area');
  let messageArea = document.querySelector('#message');
  copyTextarea.value = text;
  copyTextarea.select();

  try {
    let successful = document.execCommand('copy');
    if(successful) {
        messageArea.textContent = "Copied. Good job!"
        messageArea.style.backgroundColor = '#22dd88';
        resetMessageBackground();
    }
    else showError();
  } catch (err) {
    showError();
  }
}
</script>
`

    return resultHtml;
}

let fileName = './catalog.html';
let stream = fs.createWriteStream(fileName);

stream.once('open', function(fd) {
    let html = buildHtml();
    stream.end(html);
});
