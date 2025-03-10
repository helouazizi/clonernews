document.addEventListener("DOMContentLoaded", () => {
    const toggleDarkMode = document.getElementById("toggle-dark-mode");
    const body = document.body;
   loadContent(20)

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

let id = 9130260
function loadContent(nbOfCards) {
    let content = document.getElementById('content')
    let count = 0

    for (let i = id; i >= id-20; i--) {
        console.log(id);
        if (count === nbOfCards) {
            break
        }
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then(response => response.json())
            .then(data => content.append(createCards(data)))

        id--
        count++
    }

    id--

    console.log("--------------------------------------------------------");
}

let scrollFetchData = 1500

addEventListener('scroll', e => {
   
    if (scrollY > scrollFetchData) {
        loadContent(20)
        scrollFetchData += 1500
    }
})

function createCards(data) {
    const div = document.createElement('div')
    div.className = 'card'
    div.id = 'news-card'
    div.innerHTML = `
        <div class="title"><a href="#" id="story-title">${data.title}</a></div>
        <div class="info">
                    by <span id="story-author">${data.by}</span> | Score: <span id="story-score">${data.score}</span> | Comments: <span
                        id="story-comments">${data.descendants}</span> <span id="type">${data.type}</span>
        </div>
        <div class="comments">
                    <a href="" target="_blank">ALL COMMENTS HERE</a>
        </div>
    `

    return div
}


// fetch("https://hacker-news.firebaseio.com/v0/item/0.json")

// async function fetchone() {
//     try {
//         const response = await fetch(urll);
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();

//         document.getElementById("story-title").textContent = data.title;
//         document.getElementById("story-title").href = data.url || "#";
//         document.getElementById("story-author").textContent = data.by;
//         document.getElementById("story-score").textContent = data.score;
//         document.getElementById("story-comments").textContent = data.descendants;
//         document.getElementById("type").textContent = data.type;

//     } catch (error) {
//         console.error("Error fetching data:", error);
//         document.getElementById("news-card").innerHTML = "<p>Failed to load story.</p>";
//     }
// }

// fetchone();
