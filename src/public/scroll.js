function clearSelect() {
  let DOMmarks = document.getElementById("sidebar");
  if (DOMmarks !== null) {
    let marks = DOMmarks.childNodes;

    for (let mark of marks) {
      mark.classList.remove("select");
    }
  }
}

// inspired by codyhouse.co
function updateProgress() {
  let articles = document.getElementsByTagName("article");
  let progress = false;

  for (let article of articles) {
    let articleTop = article.getBoundingClientRect().top;
    console.log(article.id, articleTop);
    if (articleTop < 1) {
      // Update as current article
      clearSelect();
      document.getElementById(`${article.id}_mark`).classList.add("select");
      progress = true;
    }
  }

  if (!progress) {
    // At the top of the page
    clearSelect();
    document.getElementById(`head_mark`).classList.add("select");
  }
}

window.onload = function() {
  updateProgress();
  window.onscroll = updateProgress;
};
