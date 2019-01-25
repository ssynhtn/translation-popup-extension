let colorButton = document.getElementById('hello');
colorButton.onclick = function (element) {
    let color = element.target.value;
    console.log("value " + color);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });
};