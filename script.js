document.addEventListener("DOMContentLoaded", () => {
    const toggleDarkMode = document.getElementById("toggle-dark-mode");
    const body = document.body;
    
    // Load user's theme preference
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        toggleDarkMode.textContent = "☀️";
    }

    toggleDarkMode.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            toggleDarkMode.textContent = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            toggleDarkMode.textContent = "🌙";
        }
    });
});


///////////////////////////////

let post = document.getElementById('post-list')
let api = " https://hacker-news.firebaseio.com/v0/item.json"
const fetchPosts = ()=>{
    fetch()
}
post.innerHTML = "hi posts"
