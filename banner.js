var dataAry = ["#d01933", "#000000", "#ff6900", "#193d85"];
var banner = document.getElementById("banner"),
    bannerImg = document.getElementById("bannerImg"),
    Tip = document.getElementById("bannerTip"),
    bannerLeft = document.getElementById("bannerLeft"),
    bannerRight = document.getElementById("bannerRight");
var divList = bannerImg.getElementsByTagName("div"),
    TipList = Tip.getElementsByTagName("li");
var bannerW = (document.documentElement.clientWidth || document.body.clientWidth), totalW = (dataAry.length + 2) * bannerW,
    count = dataAry.length + 2;
utils.setGroupCss(bannerImg, {width: totalW, left: -bannerW});
var initData = function () {
    var str = "";
    str += "<div style='background-color:" + dataAry[dataAry.length - 1] + "; width:" + bannerW + "px;'" + "></div>";
    for (var i = 0; i < dataAry.length; i++) {
        str += "<div style='background-color:" + dataAry[i] + ";  width:" + bannerW + "px;'" + "></div>";
    }
    str += "<div style='background-color:" + dataAry[0] + "; width:" + bannerW + "px;'" + "></div>";
    bannerImg.innerHTML = str;
    str = "";
    for (i = 0; i < dataAry.length; i++) {
        var cName = i === 0 ? "select" : "";
        str += "<li class='" + cName + "'></li>";
    }
    Tip.innerHTML = str;
};
initData();
/*var initImg = function () {
    for (var i = 0; i < divList.length; i++) {
        ~function (i) {
            var curDiv = divList[i];
            if (!curDiv.isLoad) {
                var oImg = new Image;
                oImg.src = curDiv.getAttribute("trueImg");
                oImg.onload = function () {
                    curDiv.appendChild(oImg);
                    curDiv.isLoad = true;
                };
            }
        }(i);
    }
};
window.setTimeout(initImg, 500);*/
var setTip = function (index) {
    index < 0 ? index = TipList.length - 1 : null;
    index >= TipList.length ? index = 0 : null;
    for (var i = 0; i < TipList.length; i++) {
        TipList[i].className = i === index ? "select" : null;
    }
};
var step = 1;
var move = function (dir) {
    if (typeof dir === "undefined" || dir === "right") {
        step++;
        if (step >= count) {
            utils.setCss(bannerImg, "left", -1 * bannerW);
            step = 2;
        }
    } else if (dir === "left") {
        step--;
        if (step < 0) {
            utils.setCss(bannerImg, "left", -(count - 2) * bannerW);
            step = dataAry.length - 1;
        }
    } else if (dir === "tip") {
        step = this.index + 1;
    }
    animate(bannerImg, {left: -step * bannerW}, 500, 1);
    setTip(step - 1);
};
bannerImg.autoTimer = window.setInterval(move, 5000);
banner.onmouseenter = function () {
    window.clearInterval(bannerImg.autoTimer);
    bannerLeft.style.display = bannerRight.style.display = "block";
};
banner.onmouseleave = function () {
    bannerImg.autoTimer = window.setInterval(move, 5000);
};
bannerLeft.onclick = function () {
    move("left");
};
bannerRight.onclick = function () {
    move("right");
};
for (var i = 0; i < TipList.length; i++) {
    TipList[i].index = i;
    TipList[i].onclick = function () {
        move.call(this, "tip");
    };
}