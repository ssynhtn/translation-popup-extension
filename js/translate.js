function translate(text, callback) {
    $.ajax({
        url: "http://translate.google.cn/translate_a/single?client=at&sl=en&tl=zh-CN&dt=t&q=" + encodeURIComponent(text),
        // url: "http://demo.com:8080/index/index/randomInt",
        timeout: 5000,
        dataType: "text",
        success: function (res) {
            console.log('success ' + " input " + text + ", res " + res);
            callback(extractTranslation(res));
        },
        error: function (xhr, status, error) {
            callback(error);
        }
    })
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

let button = document.getElementById('translate');
let inputBox = document.getElementById('input');
let outputBox = document.getElementById('output');
button.onclick = function () {
    translate(inputBox.value, function (result) {
        outputBox.value = result;
    });
};