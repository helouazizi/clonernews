let data;

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

const url = "https://hacker-news.firebaseio.com/v0/askstories.json";

async function fetchHackerNewsItem() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data); // Output the fetched data
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchHackerNewsItem();




const urll = "https://hacker-news.firebaseio.com/v0/item/126810.json";

async function fetchone() {
    try {
        const response = await fetch(urll);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        document.getElementById("story-title").textContent = data.title;
        document.getElementById("story-title").href = data.url || "#";
        document.getElementById("story-author").textContent = data.by;
        document.getElementById("story-score").textContent = data.score;
        document.getElementById("story-comments").textContent = data.descendants;
        document.getElementById("type").textContent = data.type;

    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("news-card").innerHTML = "<p>Failed to load story.</p>";
    }
}

fetchone();
