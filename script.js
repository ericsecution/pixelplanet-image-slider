let warpDirection = 0; // 0 = no warp, 1 = forward, -1 = backward

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
  

const starfield = document.querySelector(".starfield");

// Create 300 stars
for (let i = 0; i < 300; i++) {
  const star = document.createElement("div");
  star.classList.add("star");

  // Position stars randomly within the viewport
  star.style.left = `${Math.random() * 100}vw`;
  star.style.top = `${Math.random() * 100}vh`;

  // Set random size for the star
  const size = Math.random() * 2; // Adjust range as needed

  star.style.width = `${size}px`;
  star.style.height = `${size}px`;

  // Start the animation for each star
  moveStar(star);
  starfield.appendChild(star);
}

function moveStar(star) {
  const duration = 5 + Math.random() * 5;

  // Determine the direction of movement based on the warpDirection variable
  let direction =
    warpDirection === 1 ? "-100vw" : warpDirection === -1 ? "100vw" : "0vw";

  // Animate the star
  star.animate(
    [
      { transform: "translateX(0vw)" },
      { transform: `translateX(${direction})` }
    ],
    {
      duration: duration * 1000,
      easing: "linear",
      fill: "forwards"
    }
  ).onfinish = () => {
    // Reset star position and scale
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    moveStar(star);
  };
}

function animateZoom(scaleStart, scaleEnd) {
  return new Promise(resolve => {
    starfield.animate(
      [
        { transform: `scale(${scaleStart})` },
        { transform: `scale(${scaleEnd})` }
      ],
      {
        duration: 6000, // Adjust this duration as needed
        fill: "forwards"
      }
    ).onfinish = resolve;
  });
}

/*
  Ok, so... do NOT try to use regular JS event handlers
  but, if you're attempting anything on your Swiper library
  objects, make sure you're only also using the official 
  Swiper API's event handlers (i.e. like `touches` for example).

  Lol. Hopefully, this saves you a lot of headaches and time!
*/

// Listen to the touchstart event to determine the initial touch position
let initialTouchPos = null;

swiper.on('touchStart', function() {
    initialTouchPos = swiper.touches.startX;
});

swiper.on('touchMove', function() {
    if (initialTouchPos === null) return;
    const currentTouchPos = swiper.touches.currentX;
    if (currentTouchPos > initialTouchPos) {
        warpDirection = -1; // backward
    } else {
        warpDirection = 1; // forward
    }
    // Restart all star animations for the new warp speed
    document.querySelectorAll('.star').forEach(star => moveStar(star));
    // Zoom the starfield in or out
    animateZoom(1, 1.2); // Adjust this scale factor as needed
});

swiper.on('touchEnd', function() {
    initialTouchPos = null;
    animateZoom(1.2, 1) // Adjust this scale factor as needed
        .then(() => {
            warpDirection = 0; // reset to no warp
            // Restart all star animations for the normal speed
            document.querySelectorAll('.star').forEach(star => moveStar(star));
        });
});
