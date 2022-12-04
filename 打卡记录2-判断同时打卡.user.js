

// ==UserScript==
// @name         打卡记录-重复打卡
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  保修项目-打卡记录-时间长度判断
// @author       You
// @match        http://vip.stock.finance.sina.com.cn/fund_center/index.html
// @icon         http://vip.stock.finance.sina.com.cn/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
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

    // 添加一个新的函数。传入的table。列号下标。当该类的数字有相同的是。字体颜色变为红色。
    function tableColorJudgment2(table, targetIndex) {
        var rows = table.rows; // 获取table的所有行
        // 将该列的所有字体颜色重置为黑色-目的是用用于数据修改时能变化。
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var cells = row.cells;
            var cellTarget = cells[targetIndex];
            cellTarget.style.color = "black";
        }

        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var cells = row.cells;
            var cellTarget = cells[targetIndex];
            var cellTargetData = cellTarget.innerText;
            var cellTargetNum = Number(cellTargetData);
            for (var j = i+1; j < rows.length; j++) {
                var row2 = rows[j];
                var cells2 = row2.cells;
                var cellTarget2 = cells2[targetIndex];
                var cellTargetData2 = cellTarget2.innerText;
                var cellTargetNum2 = Number(cellTargetData2);
                if (cellTargetNum == cellTargetNum2) {
                    cellTarget.style.color = "blue";
                    cellTarget2.style.color = "blue";
                }
            }
        }
    }
    window.setInterval(function () {

        // var table = document.querySelector('#cHBPH').querySelectorAll('table')[0]; // ! 2.获取table-注意下标切换
        var table = document.querySelectorAll('table')[0]; // ! 2.获取table-注意下标切换
        if (table) { // 判断table是否存在。
            try {
                TableColorJudgment(table, 7, 8); // table,标记差异列,对比列
                tableColorJudgment2(table, 7); // 标记重复数字
            } catch (e) {
                console.log(e);
            }
    }
}, 1000);

})();