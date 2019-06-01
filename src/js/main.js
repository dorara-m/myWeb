//hello
console.log('Welcome, Re:may');

// load
$(function() {
  setTimeout(() => {
    $('.p-top__title p').addClass('active');
  }, 1000);
});

// scroll in animation
var controller = new ScrollMagic.Controller();

new ScrollMagic.Scene({triggerElement: ".p-intro"})
  .on("enter", function (event) {
    $('.p-intro').addClass('active');
  })
  .addTo(controller);
new ScrollMagic.Scene({triggerElement: ".p-works"})
  .on("enter", function (event) {
    $('.p-works').addClass('active');
  })
  .addTo(controller);
new ScrollMagic.Scene({triggerElement: ".p-skills"})
  .on("enter", function (event) {
    $('.p-skills').addClass('active');
  })
  .addTo(controller);
new ScrollMagic.Scene({triggerElement: ".p-links"})
  .on("enter", function (event) {
    $('.p-links').addClass('active');
  })
  .addTo(controller);