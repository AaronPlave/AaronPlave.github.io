$(document).ready(
    function() {
        initialize()
    }
)

var lastPos = 0;

function initialize() {
    firstImage = $("#firstImage")[0];
    firstImage.style.backgroundPositionY= "0"
    window.onscroll = function() {
    	diff = scrollY - lastPos;
    	lastPos = scrollY;
    	prevImgPos = firstImage.style.backgroundPositionY.split("%")[0];
        tmp = parseFloat(prevImgPos) + diff*0.075;
        firstImage.style.backgroundPositionY = tmp.toString() + "%"
        console.log(firstImage.style.backgroundPositionX,"F")
    }
}
