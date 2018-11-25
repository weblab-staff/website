const FILTERS = new Set(["block", "date", "lec", "oh", "event", "milestone"]);

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
  if (FILTERS.has(filter)) {
    FILTERS.delete(filter);
  } else {
    FILTERS.add(filter);
  }

  let days = document.getElementsByClassName("day");
  for (let day of days) {
    checkFilterMatch(day);
  }
}

function checkFilterMatch(day) {
  // Display day if matches a filter
  let show = false;
  day.style.display = "none";
  for (let filter of FILTERS) {
    if (day.classList.contains(filter)) {
      day.style.display = "block";
      show = true;
      break;
    }
  }

  if (!show) {
    return;
  }

  // Only display relevant events
  let nodes = Array.prototype.slice.call(day.childNodes);
  for (let node of nodes) {
    console.log(node);
    node.style.display = "none";
    for (let filter of FILTERS) {
      if (node.classList.contains(filter)) {
        node.style.display = "grid";
        break;
      }
    }
  }
}

function toggleMenu() {
  let menu = document.getElementById("mainmenu");

  menu.classList.toggle("open");
}

console.log("Hello, World!");
// When scrolled, make background of header
window.onload = function() {
  updateNavSolid();
};

window.onscroll = updateNavSolid;
