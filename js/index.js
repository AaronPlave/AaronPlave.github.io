$(document).ready(
    function() {
        initialize()
        windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        mainTitle = $("#title")[0];
        halfWindowHeight = (windowHeight / 2.0);

    }
)
var windowHeight;
var lastPos = 0;
var mainTitle;
var halfWindowHeight = (windowHeight / 2.0);

function initialize() {
    firstImage = $("#firstImage")[0];
    firstImage.style.backgroundPositionY = "0"
    window.onscroll = function() {
        diff = scrollY - lastPos;
        lastPos = scrollY;
        prevImgPos = firstImage.style.backgroundPositionY.split("%")[0];
        tmp = Math.round(parseFloat(prevImgPos) + diff * 0.075, 3);
        tmp = tmp.toString();
        if (tmp < 0) {
            // console.log("TMP < 0");
            tmp = 0;
        }
        firstImage.style.backgroundPositionY = tmp + "%"
        // console.log(scrollY, "F")

        // Stuff for title illusion O.o 
        mainTitleAnimate(scrollY);
    }
}


function mainTitleAnimate(scrollY) {
    // Function to make colors of .color and .textShadow 
    // (somewhat) inversely proportional
    var thing = scrollY / halfWindowHeight;
    if (scrollY > halfWindowHeight*.7) {
        // console.log("DONE");
        return;
    }
    // console.log(thing, "THING")
    var colorOpacity = 1 * (1.1 - thing);
    var textShadowOpacity = 0.6 + 0.6 * (thing);
    // console.log(colorOpacity, "CO")
    // console.log(textShadowOpacity, "TSO")
    mainTitle.style.color = "rgba(245, 245, 245," + colorOpacity + ")"
    mainTitle.style.textShadow = "rgba(245, 245, 245," + textShadowOpacity + ")" + "0px 15px"
}
