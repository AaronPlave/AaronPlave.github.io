document.addEventListener("DOMContentLoaded", function(event) {

        // Bind menu links
        var pageHome = document.getElementById('page-home'),
            pageAbout = document.getElementById('page-about');
        // navExperience     = document.getElementById('menu'),
        // navProjects     = document.getElementById('menu');
        var allPageLinks = [
            [pageHome, 'page-home'],
            [pageAbout, 'page-about']
        ];

        function toggleHidden(targetElement, pageLinks) {
            var target = targetElement.target.id.split("-")[1];
            for (i = 0; i < pageLinks.length; i++) {
                var curr = pageLinks[i][1].split("-")[1];
                if (curr !== target) {
                    pageLinks[i][0].hidden = true;
                } else {
                    pageLinks[i][0].hidden = false;
                }
            }
        }

        var navHome = document.getElementById('nav-home'),
            navAbout = document.getElementById('nav-about');

        var allNavLinks = [navHome, navAbout];
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
})