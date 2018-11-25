document.addEventListener("DOMContentLoaded", function(event) {
    const number_arr = ['one','two','three','four'];
    const date = Math.floor(new Date().getDate() / 7);
    window.scrollTo(0,document.getElementById(`week${number_arr[date]}`).offsetTop);
}); 