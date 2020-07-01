const fs = require('fs');
const needle = require("needle");
const path = require('path');
const zlib = require('zlib');
var pako = require('pako');

function encode64(data) {
    let r = '';
    for (let i = 0; i < data.length; i += 3) {
        if (i + 2 === data.length) {
            r += append3bytes(data.charCodeAt(i), data.charCodeAt(i + 1), 0);
        }
        else if (i + 1 === data.length) {
            r += append3bytes(data.charCodeAt(i), 0, 0);
        }
        else {
            r += append3bytes(data.charCodeAt(i), data.charCodeAt(i + 1), data.charCodeAt(i + 2));
        }
    }
    return r;
}

function append3bytes(b1, b2, b3) {
    const c1 = b1 >> 2;
    const c2 = ((b1 & 0x3) << 4) | (b2 >> 4);
    const c3 = ((b2 & 0xF) << 2) | (b3 >> 6);
    const c4 = b3 & 0x3F;
    let r = "";
    r += encode6bit(c1 & 0x3F);
    r += encode6bit(c2 & 0x3F);
    r += encode6bit(c3 & 0x3F);
    r += encode6bit(c4 & 0x3F);
    return r;
}

function encode6bit(b) {
    if (b < 10) {
        return String.fromCharCode(48 + b);
    }
    b -= 10;
    if (b < 26) {
        return String.fromCharCode(65 + b);
    }
    b -= 26;
    if (b < 26) {
        return String.fromCharCode(97 + b);
    }
    b -= 26;
    if (b === 0) {
        return '-';
    }
    if (b === 1) {
        return '_';
    }
    return '?';
}

async function renderuml() {

    const sourceFolder = 'images';
    const sourceExt = '.iuml';
    const destFolder = 'images';
    const destFormat = 'png';
    const urlPrefix = 'http://www.plantuml.com/plantuml/';

    let filenames = fs.readdirSync(sourceFolder);
    const promises = filenames
        .filter((inFilename) => {
            return path.extname(inFilename) === sourceExt
        })
        .map((inFilename) => {
            const inPath = path.join(sourceFolder, inFilename);
            const outPath = path.join(destFolder, `${path.basename(inFilename, path.extname(inFilename))}.${destFormat}`)

            let content = unescape(encodeURIComponent(fs.readFileSync(inPath, 'utf-8')));
            content = pako.deflate(content, { to: 'string' });
            content = encode64(content.toString());

            const url = `${urlPrefix}${destFormat}/~1${content}`;

            return needle('get', url)
                .then(function(resp) {
                    fs.writeFileSync(outPath, resp.body);
                    console.log(`${inPath} => ${outPath} converted!`);
                })
                .catch(function(err) {
                    console.log(`${inPath} => ${outPath} error: ${err.message}`);
                });
        });
    await Promise.all(promises);
}

exports.renderuml = renderuml;
