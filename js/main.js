document.addEventListener("DOMContentLoaded", function(event) {
    var supportsMixBlendMode = window.getComputedStyle(document.body).mixBlendMode;

    var headerSection = document.getElementById('header-section');

    // Bind menu links
    var pageHome = document.getElementById('page-home'),
        pageAbout = document.getElementById('page-about'),
        pageExperience = document.getElementById('page-experience');
    // navProjects     = document.getElementById('menu');
    var allPageLinks = [
        [pageHome, 'page-home'],
        [pageAbout, 'page-about'],
        [pageExperience, 'page-experience']
    ];

    function toggleHidden(targetElement, pageLinks) {
        var target = targetElement.target.id.split("-")[1];
        for (i = 0; i < pageLinks.length; i++) {
            var curr = pageLinks[i][1].split("-")[1];
            if (curr !== target) {
                pageLinks[i][0].hidden = true;
                headerSection.innerHTML = target;
            } else {
                pageLinks[i][0].hidden = false;
            }
        }
    }

    var navHome = document.getElementById('nav-home'),
        navAbout = document.getElementById('nav-about'),
        navExperience = document.getElementById('nav-experience');

    var allNavLinks = [navHome, navAbout, navExperience];
    for (i = 0; i < allNavLinks.length; i++) {
        allNavLinks[i].onclick = function(e) {
            toggleHidden(e, allPageLinks)
        };
    }


    // Bind mobile menu listeners
    var layout = document.getElementById('layout'),
        menu = document.getElementById('menu'),
        menuLink = document.getElementById('menuLink');

    function toggleClass(element, className) {
        var classes = element.className.split(/\s+/),
            length = classes.length,
            i = 0;

        for (; i < length; i++) {
            if (classes[i] === className) {
                classes.splice(i, 1);
                break;
            }
        }
        // The className is not found
        if (length === classes.length) {
            classes.push(className);
        }

        element.className = classes.join(' ');
    }

    menuLink.onclick = function(e) {
        var active = 'active';

        e.preventDefault();
        toggleClass(layout, active);
        toggleClass(menu, active);
        toggleClass(menuLink, active);
    };

    // Set theme colors
    colorBlue = "#0EC5E5";
    colorGreen = "#69F46A";
    colorYellow = "#FCE602";
    colorMagenta = "#FA4DE4";

    themeColors = [colorBlue, colorGreen, colorYellow, colorMagenta];

    // Get list of square divs on home page
    sqDivs = document.getElementsByClassName("square");

    // Default square theme function
    function setDefault(sqs) {
        for (i = 0; i < sqs.length; i++) {
            sqs[i].style.background = colorBlue;
            sqs[i].style.mixBlendMode = "luminosity";
            sqs[i].style.color = "transparent";
        }
    }

    // Set on click listeners for 3 hats

    // Design
    lDesign = document.getElementById("sq-design");

    function setDesign(sqs) {
        var transform = getRandomTransform();
        // uniform transform?
        randTransf = false;
        if (getRandomInt(0, 2) == 1) {
            randTransf = true;
        }
        console.log("randtransf=", randTransf)
        for (i = 0; i < sqs.length; i++) {
            sqs[i].style.background = themeColors[getRandomInt(0, 4)];
            if (getRandomInt(0, 3) == 1) {
                sqs[i].style.mixBlendMode = "screen";
            } else {
                sqs[i].style.mixBlendMode = "multiply";
            }
            if (randTransf) {
                transform = getRandomTransform();
            }
            // apply transform
            sqs[i].style.transform = transform;
        }
    }

    lDesign.onmouseover = function() {
        setDesign(sqDivs)
    };
    lDesign.onmouseout = function() {
        setDefault(sqDivs)
    };


    // Web developer
    // Design
    lWeb = document.getElementById("sq-web");

    function setWeb(sqs) {
        for (i = 0; i < sqs.length; i++) {
            sqs[i].style.background = "none";
            sqs[i].style.mixBlendMode = "multiply";
            sqs[i].innerHTML = getRandomASCII();
            sqs[i].style.color = "red";
        }
    }

    lWeb.onmouseover = function() {
        setWeb(sqDivs)
    };
    lWeb.onmouseout = function() {
        setDefault(sqDivs)
    };
});

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomTransform() {
    return 'skew(' + getRandomFloat(-45, 45) + 'deg)' +
        ' scale(' + getRandomFloat(0.1, 3) + ')';
}

function getRandomASCII() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopq" +
        "rstuvwxyz0123456789!@#$%^&*()_+-=/*.,<>?[]{}";

    for (var i = 0; i < 1; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}