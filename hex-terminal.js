const LINES = 28;
const HEX_PAIRS_PER_LINE = 60;
const DISPLAY_LINES = 28;

let buffer = [];
var terminal = document.getElementById('hex-terminal');

function getRandomHex()
{
    return Math.floor(Math.random() * 16).toString(16);
}

function generateHexPair()
{
    return getRandomHex() + getRandomHex();
}

function generateLine()
{
    let line = '';
    for (let i = 0; i < HEX_PAIRS_PER_LINE; i++)
    {
        line += generateHexPair() + ' ';
    }
    let lineDiv = document.createElement('div');
    lineDiv.textContent = line;
    return lineDiv;
}

function fillBuffer()
{
    for (let i = 0; i <= LINES; i++)
    {
        buffer.push(generateLine());
    }
}

function initializeTerminal()
{
    for (let i = 0; i < DISPLAY_LINES; i++)
    {
        terminal.append(buffer[i]);
    }
}

function updateTerminal()
{
    // rotate the buffer
    buffer.push(buffer.shift());
    // remove the first line
    terminal.removeChild(terminal.firstChild);
    // append at the end of the terminal
    terminal.appendChild(buffer[LINES]);
}

fillBuffer();
initializeTerminal();
setInterval(updateTerminal, 100);