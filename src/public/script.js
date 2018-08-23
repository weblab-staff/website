function cycleFeatures() {
  if (window.location.pathname === "/") {
    var children = document.getElementById("carasol").childNodes;
    var len = children.length;
    var i = 0;

    children[i].classList.add("show");

    if (len > 1) {
      setInterval(function() {
        if (++i >= len) {
          i = 0;
        }
        hideFeatures();
        children[i].classList.add("show");
      }, 5000);
    }
  }
}

function hideFeatures() {
  var children = Array.prototype.slice.call(
    document.getElementById("carasol").childNodes
  );

  for (child of children) {
    child.classList.remove("show");
  }
}

function showDetail(id) {
  document.getElementById(id).classList.toggle("show");
}

function updateNavSolid() {
  var scrollTop =
    window.pageYOffset !== undefined
      ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body)
          .scrollTop;
  var navbar = document.getElementById("navbar");

  if (scrollTop > 10) {
    navbar.classList.add("solid");
  } else {
    navbar.classList.remove("solid");
  }
}

function flipSwitch(filter) {
  document.getElementById(`${filter}-filter`).classList.toggle("off");
}

console.log("hello");
// When scrolled, make background of header
window.onload = function() {
  cycleFeatures();
};

window.onscroll = updateNavSolid;
