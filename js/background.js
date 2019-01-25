// Set up context menu at install time.
console.log("background js is running " + new Date().toLocaleTimeString());
chrome.runtime.onInstalled.addListener(function() {
    var id = chrome.contextMenus.create({"title": "翻译", "contexts":["selection"],
        "id": "context_menu_dict"});
});

// add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);

// The onClicked callback function.
function onClickHandler(info, tab) {
    // alert(info.selectionText);
    // test(info.selectionText);
    translate(info.selectionText);
    // useJquery();
    // var sText = info.selectionText;
    // // var url = "http://dict.youdao.com/search?q=" + encodeURIComponent(sText);
    // var url = "https://translate.google.com/?sl=auto&tl=zh-CN&text=" + encodeURIComponent(sText);
    // window.open(url, '_blank');
}

function translate(text) {
    $.ajax({
        url: "http://translate.google.cn/translate_a/single?client=at&sl=en&tl=zh-CN&dt=t&q=" + encodeURIComponent(text),
        // url: "http://demo.com:8080/index/index/randomInt",
        timeout: 5000,
        dataType: "text",
        success: function (res) {
            var result = extractTranslation(res);
            console.log("jquery ajax res " + result);
            sendResult(text, result);
        },
        error: function (xhr, status, error) {
            // console.log('error status ' + status);
            console.log('error ' + error);
            sendResult(text, error);
            // console.log('error xhr status ' + xhr.status);
        }
    })
}

function sendResult(text, translation) {
    console.log("about to find tab");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log("found tab and send translation " + translation);
        chrome.tabs.sendMessage(tabs[0].id, {text: text, translation: translation}, function(response) {
            // console.log(response.msg);
            console.log("sending to tab id " + tabs[0].id + ", title " + tabs[0].title);
            console.log("response is " + JSON.stringify(response));
        });
    });
}

function test(text) {
    var xhr = new XMLHttpRequest();
    console.log("first state " + xhr.readyState);
    // xhr.open('GET', "http://translate.google.cn/translate_a/single?client=at&sl=en&tl=zh-CN&dt=t&q=The present study finds that what was traditionally considered a predominantly unilateral anatomical abnormality apparently has a strikingly high bilateral prevalence (80.7%). This may suggest that we should consider varicocele a bilateral disease. The second finding is the high rate of varicocele detected by venography, thermography, and sonography when compared with physical examination results. Our study may have important implications for treatment, indicating that patients with clinical evidence of unilateral left varicocele should be carefully evaluated for bilateral varicocele");
    xhr.open('GET', "http://translate.google.cn/translate_a/single?client=at&sl=en&tl=zh-CN&dt=t&q=" + encodeURIComponent(text));
    // xhr.open('GET', "http://demo.com:8080/index/index/randomInt");
    console.log("open state " + xhr.readyState);
    xhr.onprogress = function () {
        console.log("on progress " + xhr.readyState + " " + Date.now());
    };
    xhr.onload = function () {
        console.log('on load ' + xhr.readyState + " " + Date.now());
    };
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log(xhr.responseText);
                // console.log(extractTranslation(xhr.responseText));
                // alert(xhr.responseText);
            } else {
                console.log("bad " + xhr.status);
            }
        }
        // if (xhr.readyState == XMLHttpRequest.DONE) {
        //     console.log("is done " + Date.now());
        //     console.log('status ' + xhr.status);
        // } else {
        //     console.log("state changed to " + xhr.readyState + " " + Date.now());
        // }
    };
    xhr.send();
    console.log("send state " + xhr.readyState);


}

function extractTranslation(jsonRes) {
    var result = "";
    var jsonArray = JSON.parse(jsonRes);
    var list = jsonArray[0];
    for (let i = 0; i < list.length; i++) {
        var item = list[i];
        var translation = item[0];
        result += translation;
    }

    return result;
}

console.log('start time out ' + new Date().toLocaleString());
setTimeout(function () {
    console.log("finish after 3 seconds " + new Date().toLocaleString());
}, 3 * 1000);