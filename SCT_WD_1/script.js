//Add event listener for scrolling
window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar");
    //If Scrolled down more than 50px, add "scrolled" class
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      //remove class when scrolled back to top
      navbar.classList.remove("scrolled");
    }
  });
  