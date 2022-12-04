// ==UserScript==
// @name         DMS 判断首登是否存在
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  DMS 判断首登是否存在
// @author       bob
// @match        http://vip.stock.finance.sina.com.cn/fund_center/index.html
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sina.com.cn
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var element = document.querySelector('.banner').querySelector('.logo')
function elementTextIsNullOrNot(element) {
    var elementText = element.innerText
    if (elementText == "") {
        element.style.backgroundColor = "red"
    } else {
        element.style.backgroundColor = "blue"
    }
}
window.setInterval(function () {
    elementTextIsNullOrNot(element)
}, 1000)
})();