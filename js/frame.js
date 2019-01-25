console.log("frame doc " + JSON.stringify(document));
console.log("frame doc root " + JSON.stringify(document.documentElement));
console.log("frame doc root " + document.documentElement.innerHTML);
let iframe = document.createElement('iframe');
// // Must be declared at web_accessible_resources in manifest.json
iframe.src = chrome.runtime.getURL('frame.html');
console.log("origin: " + chrome.runtime.getURL(""));
iframe.id = "just_we";
console.log("url " + chrome.runtime.getURL('frame.html'));
// // Some styles for a fancy sidebar
let showStyle = 'position:fixed;top:20px;right:20px;display:block;' +
    'width:300px;height:480px;z-index:2147483647;';
let hideStyle = showStyle + "display: none;";

iframe.style.cssText = hideStyle;
document.body.appendChild(iframe);

window.addEventListener("message", function (e) {
    console.log("e origin " + e.origin);
    let data = e.data;
    if (data && data.hasOwnProperty("action") && data.action === "close" && data.extension_id === chrome.runtime.id) {
        var iframe = window.parent.document.getElementById('just_we');
        iframe.style.cssText = hideStyle;
        // iframe.parentNode.removeChild(iframe);
    } else if (data && data.hasOwnProperty("action") && data.action === "show" && data.extension_id === chrome.runtime.id) {
        var iframe = window.parent.document.getElementById('just_we');
        iframe.style.cssText = showStyle;
    }

    console.log("on message " + JSON.stringify(e.data));
});
