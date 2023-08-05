const swiper = new Swiper(".odyssey-card.mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: "1",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 4,
      slideShadows: false
    },
    breakpoints: {
      640: {
        slidesPerView: 2
      }
    },
    on: {
      slideChange: function () {
        const activeSlideElement = this.slides[this.activeIndex];
        const imgElement = activeSlideElement.querySelector('img');
  
        imgElement.addEventListener('click', function() {
          this.classList.toggle('enlarged');
        });
      },
    }
  });
  
  // Edge caase: Get the img element of the initial slide
  const initialSlideImgElement = document.querySelector('.odyssey-card.mySwiper .swiper-slide img');
  
  // Add a click event listener
  initialSlideImgElement.addEventListener('click', function() {
    this.classList.toggle('enlarged');
  });
  