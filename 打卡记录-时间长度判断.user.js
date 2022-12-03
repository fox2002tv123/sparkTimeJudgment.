// ==UserScript==
// @name         打卡记录-时间长度判断
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  保修项目-打卡记录-时间长度判断
// @author       You
// @match        http://vip.stock.finance.sina.com.cn/fund_center/index.html
// @icon         http://vip.stock.finance.sina.com.cn/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function TableColorJudgment(table, resultIndex, targetIndex) { // table,标记差异列,对比列
        var rows = table.rows; // 获取table的所有行
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var cells = row.cells;
            var cellTarget = cells[targetIndex];
            var cellResult = cells[resultIndex];
            var cellTargetData = cellTarget.innerText;
            var cellResultData = cellResult.innerText;
            var cellTargetNum = Number(cellTargetData);
            var cellResultNum = Number(cellResultData);
            var cellResultNumSubcellTargetNum = cellResultNum / cellTargetNum;
            if (cellResultNumSubcellTargetNum <= 1.1 && cellResultNumSubcellTargetNum >= 0.9) { //! 1.范围0.9~1.1
                cellResult.style.backgroundColor = "green";
            } else {
                cellResult.style.backgroundColor = "yellow";
            }
        }
    }

    window.setInterval(function () {

    var table = document.querySelector('#cHBPH').querySelectorAll('table')[0]; // ! 2.获取table-注意下标切换
        if (table) { // 判断table是否存在。
            TableColorJudgment(table, 7, 8); // table,标记差异列,对比列
        }
}, 1000);

})();