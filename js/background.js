// Set up context menu at install time.
log("log from background");
log("background js is running " + new Date().toLocaleTimeString());
chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({"title": "翻译", "contexts":["selection"],
        "id": "context_menu_dict"});
});

// add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);

// The onClicked callback function.
function onClickHandler(info, tab) {
    // alert(info.selectionText);
    // test(info.selectionText);
    let text = info.selectionText;
    translate(text, function (result) {
       sendResult(text, result, tab);
    });
    // translate(info.selectionText, tab);
    // useJquery();
    // var sText = info.selectionText;
    // // var url = "http://dict.youdao.com/search?q=" + encodeURIComponent(sText);
    // var url = "https://translate.google.com/?sl=auto&tl=zh-CN&text=" + encodeURIComponent(sText);
    // window.open(url, '_blank');
}

function sendResult(text, translation, tab) {
    log("about to find tab");
    chrome.tabs.sendMessage(tab.id, {text: text, translation: translation}, function(response) {
        // log(response.msg);
        log("sending to tab id " + tab.id + ", title " + tab.title);
        log("response is " + JSON.stringify(response));
    });
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //     log("found tab and send translation " + translation);
    //     chrome.tabs.sendMessage(tabs[0].id, {text: text, translation: translation}, function(response) {
    //         // log(response.msg);
    //         log("sending to tab id " + tabs[0].id + ", title " + tabs[0].title);
    //         log("response is " + JSON.stringify(response));
    //     });
    // });
}

function test(text) {
    let xhr = new XMLHttpRequest();
    log("first state " + xhr.readyState);
    // xhr.open('GET', "http://translate.google.cn/translate_a/single?client=at&sl=en&tl=zh-CN&dt=t&q=The present study finds that what was traditionally considered a predominantly unilateral anatomical abnormality apparently has a strikingly high bilateral prevalence (80.7%). This may suggest that we should consider varicocele a bilateral disease. The second finding is the high rate of varicocele detected by venography, thermography, and sonography when compared with physical examination results. Our study may have important implications for treatment, indicating that patients with clinical evidence of unilateral left varicocele should be carefully evaluated for bilateral varicocele");
    xhr.open('GET', "http://translate.google.cn/translate_a/single?client=at&sl=en&tl=zh-CN&dt=t&q=" + encodeURIComponent(text));
    // xhr.open('GET', "http://demo.com:8080/index/index/randomInt");
    log("open state " + xhr.readyState);
    xhr.onprogress = function () {
        log("on progress " + xhr.readyState + " " + Date.now());
    };
    xhr.onload = function () {
        log('on load ' + xhr.readyState + " " + Date.now());
    };
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                log(xhr.responseText);
                // log(extractTranslation(xhr.responseText));
                // alert(xhr.responseText);
            } else {
                log("bad " + xhr.status);
            }
        }
        // if (xhr.readyState == XMLHttpRequest.DONE) {
        //     log("is done " + Date.now());
        //     log('status ' + xhr.status);
        // } else {
        //     log("state changed to " + xhr.readyState + " " + Date.now());
        // }
    };
    xhr.send();
    log("send state " + xhr.readyState);


}

log('start time out ' + new Date().toLocaleString());
setTimeout(function () {
    log("finish after 3 seconds " + new Date().toLocaleString());
}, 3 * 1000);