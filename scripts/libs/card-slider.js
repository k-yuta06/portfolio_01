class CardSlider {
    constructor(el) {
      this.el = el;
      this.swiper = this._initSwiper();
    }
    _initSwiper() {
      return new Swiper(this.el, {
        loop: true,
        grabCursor: true,
        effect: 'coverflow',
        centeredSlides: true,
        slidePerView: 1,
        speed: 1000,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },  
        breakpoints: {
          600: {
            slidesPerView: 2
          },
          960: {
            slidesPerView: 4 
          }
        }
      });
    }
  }