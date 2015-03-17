var currState;

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
    colorBlack = "#000000";
    colorWhite = "#fdfcfc";
    colorRed = "red";

    themeColors = [colorWhite, colorBlue, colorGreen, colorYellow, colorMagenta, colorBlack];
    themeNoBlack = [colorWhite, colorBlue, colorGreen, colorYellow, colorMagenta];
    themeNoWhite = [colorBlue, colorGreen, colorYellow, colorMagenta, colorBlack];
    themeBW = [colorWhite, colorBlack];
    themeBR = [colorRed, colorBlack];

    // Get list of square divs on home page
    sqDivs = document.getElementsByClassName("square");

    // Default square theme function
    function setDefault(sqs) {
        for (i = 0; i < sqs.length; i++) {
            sqs[i].style.background = colorBlue;
            sqs[i].style.mixBlendMode = "luminosity";
            sqs[i].style.transitionDuration = "1s";
            sqs[i].style.color = "transparent";
            sqs[i].style.boxShadow = "-3px 3px 22px rgba(170, 170, 170, 0.93)";
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
        for (i = 0; i < sqs.length; i++) {
            sqs[i].style.background = getRandomColor(themeNoBlack);
            sqs[i].style.transitionDelay = getRandomFloat(0, 0.7) + "s";

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
            // sqs[i].style
        }
    }

    lDesign.onmouseover = function() {
        currState = "design";
        setDesign(sqDivs)
    };
    lDesign.onmouseout = function() {
        currState = "";
        setDefault(sqDivs)
    };


    // Web developer
    // Design
    lWeb = document.getElementById("sq-web");

    function setWeb(sqs) {
        if (currState != "web") return;
        for (i = 0; i < sqs.length; i++) {
            var currSq = sqs[i];
            currSq.style.background = "yellow";
            if (getRandomInt(0, 3) == 1) {
                var delay = getRandomFloat(0, 2);
                var item = setTimeout(function(el) {
                    el.innerHTML = getRandomASCII();
                }, delay, currSq)
            }
            currSq.style.color = getRandomColor(themeNoWhite);
            currSq.style.boxShadow = "none";
            currSq.style.mixBlendMode = "multiply";
            currSq.style.transitionDelay = "0s"
        }
        // recurse after a bit of a time delay
        setTimeout(function() {
            if (currState != "web") return;
            setWeb(sqs);
        }, 1500);
    }

    lWeb.onmouseover = function() {
        currState = "web";
        setWeb(sqDivs)
    };
    lWeb.onmouseout = function() {
        currState = "";
        setDefault(sqDivs)
    };

    lComp = document.getElementById("sq-comp");

    function playSnake(sqs) {
        // Initialization
        var state = {};
        state.sqs = sqs;
        state.rowLen = 6;
        state.cellColor = "rgb(0,95,153)";
        state.foodColor = "rgb(0,45,103)";
        state.snakeColor = themeColors[3];
        state.snake = [];
        state.speed = 500; // ms delay between movements
        state.direction = "right"; // snake movement direction
        state.alive = true;


        document.onkeydown = function(evt) {
            if (evt.keyCode == 37 && state.direction != "right") state.direction = "left";
            else if (evt.keyCode == 38 && state.direction != "down") state.direction = "up";
            else if (evt.keyCode == 39 && state.direction != "left") state.direction = "right";
            else if (evt.keyCode == 40 && state.direction != "up") state.direction = "down";

            console.log("Move", state.direction);
        }

        // Color grid
        for (i = 0; i < state.sqs.length; i++) {
            state.currSq = state.sqs[i];
            state.currSq.style.mixBlendMode = "multiply";
            state.currSq.style.transitionDuration = "0s";
            state.currSq.style.background = state.cellColor;
        }

        // Place the snake in the middle for now
        var sqsMiddle = state.sqs.length / 2;
        state.snake = [sqsMiddle + 1, sqsMiddle + 2, sqsMiddle + 3];
        for (i = 0; i < state.snake.length; i++) {
            state.sqs[state.snake[i]].style.background = state.snakeColor;
        }

        generateFoodCell(state);
        snakeLoop(state);
    }

    function generateFoodCell(state) {
        // If there's no more room, don't add a food cell.
        if (state.snake.length >= state.sqs.length){
            console.log("Win?");
            return;
        }
        // Randomly place a target somewhere in the grid
        // not inside the snake
        var foodCell = getRandomInt(0, state.sqs.length);
        while (state.snake.indexOf(foodCell) != -1) {
            var foodCell = getRandomInt(0, state.sqs.length);
        }

        state.foodCell = foodCell;
        state.sqs[state.foodCell].style.background = "red";
    }

    function snakeLoop(state) {
        // Play!
        var state = state;
        var nIntervId = setInterval(function() {
            if (currState != "comp") clearInterval(nIntervId);
            state = snakeRound(state);
            console.log(state.alive, "Alive?")
            if (!(state.alive)) {
                console.log("HE'S DEAD JIM!");
                clearInterval(nIntervId);
            }
        }, state.speed);

    }

    function snakeRound(state) {
        // Game round 
        // Check for snake head outside of grid
        var head = state.snake[state.snake.length - 1];
        var newHead;

        if (state.direction === "right") {
            if ((((head + 1) % state.rowLen)) == 0) {
                state.alive = false;
                return state;
            } else {
                newHead = head + 1;
            }
        } else if (state.direction === "left") {
            if ((((head + 1) % state.rowLen)) == 1) {
                state.alive = false;
                return state;
            } else {
                newHead = head - 1;
            }
        } else if (state.direction === "up") {
            if ((head + 1) < state.rowLen) {
                state.alive = false;
                return state;
            } else {
                newHead = head - state.rowLen;
            }
        } else if (state.direction === "down") {
            if ((head + 1) > state.rowLen * (state.rowLen - 1)) {
                state.alive = false;
                return state;
            } else {
                newHead = head + state.rowLen;
            }
        }

        // Move the snake
        // Check if snake has consumed the food. If not, move tail.
        if (head != state.foodCell) {
            // Color tail in
            state.sqs[state.snake[0]].style.background = state.cellColor;
            // Remove tail
            state.snake = state.snake.splice(1, state.snake.length);
        } else {
            generateFoodCell(state);
            state.speed *= 2; 

        }
        // Add new head
        state.snake.push(newHead);
        state.sqs[newHead].style.background = state.snakeColor;

        return state;
    }



    function runSearch(sqs) {
        // Set initial rgb value
        var dark = {
            "r": 0,
            "g": 45,
            "b": 103
        };
        for (i = 0; i < sqs.length; i++) {
            // Generate randomly scaled values from initial.
            // wallChance is chance of generating a wall color
            var wallColor = "red";
            var wallChance = 0.2;
            var makeWall = getRandomFloat(0, 1);
            if (makeWall < wallChance) {
                resultRGB = wallColor;
            } else {
                var randVal = getRandomFloat(0, 3);
                var randRGB = {
                    "r": Math.round(Math.min(dark.r * randVal, 255)),
                    "g": Math.round(Math.min(dark.g * randVal, 255)),
                    "b": Math.round(Math.min(dark.b * randVal, 255))
                };
                var resultRGB = "rgb(" + randRGB.r +
                    "," + randRGB.g + "," + randRGB.b + ")";
            }

            var currSq = sqs[i];
            currSq.style.mixBlendMode = "multiply";
            currSq.style.background = resultRGB;
        }
    }

    function setComp(sqs) {
        if (currState != "comp") return;
        var option = getRandomInt(0, 2);
        if (option == 1) {
            playSnake(sqs);
        } else {
            playSnake(sqs);
        }
    }

    lComp.onmouseover = function() {
        currState = "comp";
        setComp(sqDivs)
    };
    lComp.onmouseout = function() {
        currState = "";
        // setDefault(sqDivs)
        setComp(sqDivs)
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

function getRandomColor(colors) {
    return colors[getRandomInt(0, colors.length)];
}

function getRandomASCII() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopq" +
        "rstuvwxyz0123456789!@#$%^&*()_+-=/*.,<>?[]{}";

    for (var i = 0; i < 1; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}