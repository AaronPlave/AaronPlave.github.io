var App = Ember.Application.create({});

function toggleMenu(e) {
    e.preventDefault()
    var layout = document.getElementById('layout'),
        menu = document.getElementById('menu'),
        menuLink = document.getElementById('menuLink');
    toggleClass(layout, "active");
    toggleClass(menu, "active");
    toggleClass(menuLink, "active");
}

function toggleClass(element, className) {

    var layout = document.getElementById('layout'),
        menu = document.getElementById('menu'),
        menuLink = document.getElementById('menuLink');

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

App.Router.map(function() {
    this.route('Home'),
        this.route('About')
        // this.route('product'),
        // this.route('code'),
        // this.route('contact')
});

App.ApplicationController = Ember.Controller.extend({
    currentPathChanged: function() {
        window.scrollTo(0, 0);
    }.observes('currentPath')
});