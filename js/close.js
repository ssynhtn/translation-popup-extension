console.log("doc " + document.documentElement.innerHTML);

let closeButton = document.getElementById("close");
let iframe = document.getElementById("just_we");
console.log("just we is " + iframe);
closeButton.onclick = function () {
    parent.window.postMessage({
        action: "close",
        extension_id: chrome.runtime.id,
    }, "*");
    // console.log(JSON.stringify(document.rootElement));
    // console.log(document.rootElement.innerHTML);
    // document.rootElement.hidden = true;
    // console.log(JSON.stringify(document));
    // iframe.hidden = true;
};


var inBox = document.getElementById("input");
var outBox = document.getElementById("output");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");
    if (request.hasOwnProperty("text") && request.hasOwnProperty("translation")) {
        inBox.value = request.text;
        outBox.value = request.translation;

        parent.window.postMessage({
            action: "show",
            extension_id: chrome.runtime.id,
        }, "*");

        sendResponse({farewell: "goodbye"});
    }
});