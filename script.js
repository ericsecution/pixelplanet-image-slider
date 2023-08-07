const swiper = new Swiper(".odyssey-card.mySwiper", {
    effect: "coverflow", // transition effect--note: this is where I can use 'flip' for the Anime cards
    grabCursor: true, // setting to 'true' changes cursor to a grabbing hand when the user hovers over the slides, indicating that the slides can be dragged
    centeredSlides: true, // centers the active slide
    loop: true, // enables infinite loop mode for the slide's images
    slidesPerView: "1", // sets # of slides per viewport (for screens smaller than 640px, only 1 slide visible)
    coverflowEffect: { // this object contains the settings for the 'coverflow' effect
      rotate: 7, // inactive slide's rotation
      stretch: 0, // can be negative: shows the amount in pixels inactive                                                                                                                                                                                          
      depth: 100, // a measure in depth along the z-axis, to create more or less of the 3D effect
      modifier: 5, // a multiple effect on the active settings in the coverflow object
      slideShadows: false // enables or disables shadows for each slide (tested: shadows don't look good here)
    },
    breakpoints: { // an object allowing different swiper settings based on dif viewport sizes
      640: { // for 640px or higher viewport, this allows 2 slides visible at a time (looks best)
        slidesPerView: 2
      }
    }
  });
  
  // Checks to see if the current (centered, active) slide is in position, and if it is
  // *and* it's being clicked on, then it enlarges it (according to the CSS). If not, nada.
  swiper.on('click', function(swiper, e) {
  const clickedSlide = swiper.clickedSlide;
    if (clickedSlide.classList.contains('swiper-slide-active')) {
      const clickedImage = clickedSlide.querySelector('img');
      clickedImage.classList.toggle('enlarged');
    }
  });
  
  // Added this function in so that a slide can't stay enlarged when isn't centered
  // *nor* be clicked on (to become enlarged), once it's past the center viewport.
  swiper.on('slideChange', function(swiper) {
  const previousSlide = swiper.slides[swiper.previousIndex];
  const previousSlideImage = previousSlide.querySelector('img');
  previousSlideImage.classList.remove('enlarged');
  });
  