/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
  document.querySelectorAll(
    ".reveal"
  );


const revealObserver =
  new IntersectionObserver(

    (entries) => {

      entries.forEach(
        (entry) => {

          if (
            entry.isIntersecting
          ) {

            entry.target
              .classList
              .add(
                "show"
              );

          }

        }
      );

    },

    {
      threshold: 0.12
    }

  );


revealElements.forEach(
  (element) => {

    revealObserver.observe(
      element
    );

  }
);



/* =========================================================
   BACKGROUND MUSIC
========================================================= */

const bgMusic =
  document.getElementById(
    "bgMusic"
  );


const musicButton =
  document.getElementById(
    "musicButton"
  );


const musicToast =
  document.getElementById(
    "musicToast"
  );


const musicToastClose =
  document.getElementById(
    "musicToastClose"
  );


let musicPlaying =
  false;


let musicFadeInterval;


/* TARGET VOLUME

   0.18 = 18%

   Kalau nanti masih terlalu keras,
   ubah misalnya menjadi:

   0.12 = 12%

*/

const MUSIC_VOLUME =
  0.18;



/* =========================================================
   MUSIC TOAST
========================================================= */

function hideMusicToast() {

  if (
    musicToast
  ) {

    musicToast
      .classList
      .add(
        "hide"
      );

  }

}


if (
  musicToastClose
) {

  musicToastClose
    .addEventListener(
      "click",
      hideMusicToast
    );

}


/* Toast hilang otomatis */

setTimeout(
  hideMusicToast,
  10000
);



/* =========================================================
   FADE IN MUSIC
========================================================= */

function fadeMusicIn() {

  clearInterval(
    musicFadeInterval
  );


  bgMusic.volume = 0;


  const fadeDuration =
    2500;


  const intervalTime =
    50;


  const steps =
    fadeDuration /
    intervalTime;


  const volumeStep =
    MUSIC_VOLUME /
    steps;


  musicFadeInterval =
    setInterval(
      () => {

        const nextVolume =
          bgMusic.volume +
          volumeStep;


        if (
          nextVolume <
          MUSIC_VOLUME
        ) {

          bgMusic.volume =
            nextVolume;

        } else {

          bgMusic.volume =
            MUSIC_VOLUME;


          clearInterval(
            musicFadeInterval
          );

        }

      },

      intervalTime
    );

}



/* =========================================================
   MUSIC BUTTON
========================================================= */

if (
  musicButton &&
  bgMusic
) {

  musicButton
    .addEventListener(

      "click",

      async () => {

        try {

          /* PLAY */

          if (
            !musicPlaying
          ) {

            await bgMusic.play();


            fadeMusicIn();


            musicPlaying =
              true;


            musicButton.textContent =
              "❚❚";


            musicButton.title =
              "Pause music";


            hideMusicToast();

          }


          /* PAUSE */

          else {

            bgMusic.pause();


            musicPlaying =
              false;


            musicButton.textContent =
              "♫";


            musicButton.title =
              "Play music";

          }

        } catch (
          error
        ) {

          alert(
            "Musiknya belum bisa diputar. Pastikan file assets/our-song.mp3 tersedia ya ❤️"
          );

        }

      }

    );

}



/* =========================================================
   FINAL SURPRISE
========================================================= */

const surpriseButton =
  document.getElementById(
    "surpriseButton"
  );


const surpriseMessage =
  document.getElementById(
    "surpriseMessage"
  );


if (
  surpriseButton &&
  surpriseMessage
) {

  surpriseButton
    .addEventListener(

      "click",

      () => {

        surpriseMessage
          .classList
          .add(
            "show"
          );


        surpriseButton.style.display =
          "none";


        setTimeout(
          () => {

            surpriseMessage
              .scrollIntoView(
                {
                  behavior:
                    "smooth",

                  block:
                    "center"
                }
              );

          },

          100
        );

      }

    );

}



/* =========================================================
   CINEMATIC MEMORY SLIDESHOW
========================================================= */

const memorySlider =
  document.getElementById(
    "memorySlider"
  );


const memorySlides =
  document.querySelectorAll(
    ".memory-slide"
  );


const memoryDots =
  document.querySelectorAll(
    ".memory-dot"
  );


const memoryPrev =
  document.getElementById(
    "memoryPrev"
  );


const memoryNext =
  document.getElementById(
    "memoryNext"
  );


let currentMemory =
  0;


let memoryInterval;


let memoryPaused =
  false;



/* =========================================================
   SLIDESHOW SETTINGS
========================================================= */

/*

5000 = 5 detik.

Kalau ingin lebih lama:

6000 = 6 detik
7000 = 7 detik

*/

const MEMORY_INTERVAL =
  5000;



/* =========================================================
   SHOW SLIDE
========================================================= */

function showMemorySlide(
  index
) {

  if (
    memorySlides.length ===
    0
  ) {

    return;

  }


  /* LOOP TO FIRST */

  if (
    index >=
    memorySlides.length
  ) {

    index = 0;

  }


  /* LOOP TO LAST */

  if (
    index < 0
  ) {

    index =
      memorySlides.length - 1;

  }


  /* REMOVE ACTIVE SLIDE */

  memorySlides.forEach(
    (slide) => {

      slide
        .classList
        .remove(
          "active"
        );

    }
  );


  /* REMOVE ACTIVE DOT */

  memoryDots.forEach(
    (dot) => {

      dot
        .classList
        .remove(
          "active"
        );

    }
  );


  currentMemory =
    index;


  /* ACTIVE SLIDE */

  memorySlides[
    currentMemory
  ]
    .classList
    .add(
      "active"
    );


  /* ACTIVE DOT */

  if (
    memoryDots[
      currentMemory
    ]
  ) {

    memoryDots[
      currentMemory
    ]
      .classList
      .add(
        "active"
      );

  }

}



/* =========================================================
   NEXT
========================================================= */

function nextMemorySlide() {

  showMemorySlide(
    currentMemory + 1
  );

}



/* =========================================================
   PREVIOUS
========================================================= */

function previousMemorySlide() {

  showMemorySlide(
    currentMemory - 1
  );

}



/* =========================================================
   AUTOPLAY
========================================================= */

function startMemoryAutoplay() {

  clearInterval(
    memoryInterval
  );


  memoryInterval =
    setInterval(
      () => {

        if (
          !memoryPaused
        ) {

          nextMemorySlide();

        }

      },

      MEMORY_INTERVAL
    );

}



/* =========================================================
   RESET AUTOPLAY
========================================================= */

function resetMemoryAutoplay() {

  clearInterval(
    memoryInterval
  );


  startMemoryAutoplay();

}



/* =========================================================
   NEXT BUTTON
========================================================= */

if (
  memoryNext
) {

  memoryNext
    .addEventListener(
      "click",
      () => {

        nextMemorySlide();

        resetMemoryAutoplay();

      }
    );

}



/* =========================================================
   PREVIOUS BUTTON
========================================================= */

if (
  memoryPrev
) {

  memoryPrev
    .addEventListener(
      "click",
      () => {

        previousMemorySlide();

        resetMemoryAutoplay();

      }
    );

}



/* =========================================================
   DOT NAVIGATION
========================================================= */

memoryDots.forEach(
  (dot) => {

    dot.addEventListener(
      "click",
      () => {

        const slideIndex =
          Number(
            dot.dataset.slide
          );


        showMemorySlide(
          slideIndex
        );


        resetMemoryAutoplay();

      }
    );

  }
);



/* =========================================================
   PAUSE WHEN HOVER
========================================================= */

if (
  memorySlider
) {

  memorySlider
    .addEventListener(
      "mouseenter",
      () => {

        memoryPaused =
          true;

      }
    );


  memorySlider
    .addEventListener(
      "mouseleave",
      () => {

        memoryPaused =
          false;

      }
    );

}



/* =========================================================
   KEYBOARD CONTROL
========================================================= */

if (
  memorySlider
) {

  memorySlider
    .addEventListener(
      "keydown",
      (event) => {

        if (
          event.key ===
          "ArrowRight"
        ) {

          nextMemorySlide();

          resetMemoryAutoplay();

        }


        if (
          event.key ===
          "ArrowLeft"
        ) {

          previousMemorySlide();

          resetMemoryAutoplay();

        }

      }
    );

}



/* =========================================================
   MOBILE SWIPE
========================================================= */

let touchStartX =
  0;


let touchEndX =
  0;


let touchStartY =
  0;


let touchEndY =
  0;



/* TOUCH START */

if (
  memorySlider
) {

  memorySlider
    .addEventListener(

      "touchstart",

      (event) => {

        memoryPaused =
          true;


        touchStartX =
          event
            .changedTouches[0]
            .screenX;


        touchStartY =
          event
            .changedTouches[0]
            .screenY;

      },

      {
        passive: true
      }

    );

}



/* TOUCH END */

if (
  memorySlider
) {

  memorySlider
    .addEventListener(

      "touchend",

      (event) => {

        touchEndX =
          event
            .changedTouches[0]
            .screenX;


        touchEndY =
          event
            .changedTouches[0]
            .screenY;


        handleMemorySwipe();


        memoryPaused =
          false;


        resetMemoryAutoplay();

      },

      {
        passive: true
      }

    );

}



/* =========================================================
   HANDLE SWIPE
========================================================= */

function handleMemorySwipe() {

  const swipeX =
    touchEndX -
    touchStartX;


  const swipeY =
    touchEndY -
    touchStartY;


  const minimumSwipe =
    50;


  /*

  Hanya dianggap swipe slideshow
  kalau gerakan horizontal
  lebih besar daripada vertical.

  Jadi ketika user scroll ke bawah,
  slideshow tidak ikut berpindah.

  */

  if (
    Math.abs(
      swipeX
    ) >
    Math.abs(
      swipeY
    )
  ) {


    /* SWIPE LEFT */

    if (
      swipeX <
      -minimumSwipe
    ) {

      nextMemorySlide();

    }


    /* SWIPE RIGHT */

    if (
      swipeX >
      minimumSwipe
    ) {

      previousMemorySlide();

    }

  }

}



/* =========================================================
   PAUSE WHEN BROWSER TAB INACTIVE
========================================================= */

document
  .addEventListener(
    "visibilitychange",
    () => {

      if (
        document.hidden
      ) {

        memoryPaused =
          true;

      } else {

        memoryPaused =
          false;


        resetMemoryAutoplay();

      }

    }
  );



/* =========================================================
   START SLIDESHOW
========================================================= */

if (
  memorySlides.length >
  0
) {

  showMemorySlide(
    0
  );


  startMemoryAutoplay();

}