'use strict';

document.addEventListener('DOMContentLoaded', () => {
    new Main();
});

class Main {
    constructor() {
        this.el = {};
        this.el.hamburgerBtn = document.querySelector('.hamburger-btn');
        this.el.mobileMenu = document.querySelector('.mobile-menu');
        this.el.mobileMenuItem = document.querySelectorAll('.mobile-menu__item');
        this.el.smoothScrollElements = document.querySelectorAll('a[href^="#"]');
        this.el.targetElements = document.querySelectorAll('.trigger');
        this.slider = new CardSlider('.swiper');
        this.init();
    }
    init() {
        this.addEvent();
        this.scrollObserver();
    }
    toggleMobileMenu() {
        this.el.hamburgerBtn.classList.toggle('menu-open');
        this.el.mobileMenu.classList.toggle('menu-open');
    }
    closeMobileMenu() {
        this.el.hamburgerBtn.classList.remove('menu-open');
        this.el.mobileMenu.classList.remove('menu-open');
    }
    resizeMobileMenu() {
        if(window.innerWidth > 960) {
            this.closeMobileMenu();
        }
    }
    smoothScroll(event) {
        event.preventDefault();

        let href = this.getAttribute('href');
        let targetElement = document.getElementById(href.replace('#', ''));

        if(targetElement === null) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        } else {
            let rect = targetElement.getBoundingClientRect().top;
            let offset = window.pageYOffset;
            const gap = 94;
            const target = rect + offset - gap;
    
            window.scrollTo({
                top: target,
                behavior: "smooth"
            })
        }
    }
    scrollObserver() {
        const callBack = (entries, observer) => {
            entries.forEach( entry => {
                if(entry.isIntersecting) {
                entry.target.classList.add('inview');
            } else {
                entry.target.classList.remove('inview');
                }
            });
        }

        const options = {
            root: null,
            rootMargin: "-100px 0px -200px 0px",
            threshold: 0
        }

        const observer = new IntersectionObserver(callBack, options);

        this.el.targetElements.forEach( element => observer.observe(element));
    }
    addEvent() {
        this.el.hamburgerBtn.addEventListener('click', this.toggleMobileMenu.bind(this));
        window.addEventListener('resize', this.resizeMobileMenu.bind(this));

        for(let i = 0; i < this.el.mobileMenuItem.length; i++) {
            this.el.mobileMenuItem[i].addEventListener('click', this.closeMobileMenu.bind(this));
        }
        for(let i = 0; i < this.el.smoothScrollElements.length; i++) {
            this.el.smoothScrollElements[i].addEventListener('click', this.smoothScroll);
        }
    }
}