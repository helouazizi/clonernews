const cartDiv = document.createElement('div')
let divInfos = document.querySelector('#postInfos')
let content = document.getElementById('content')
let scrollFetchData = 1500
let id = 0
let currentId = 0
let holderId = 0

setInterval(() => {
    getMaxId()
}, 1000)

async function getMaxId() {
    let url = `https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty`;

    try {
        const response = await fetch(url);
        const maxId = await response.json();
        if (maxId != holderId) {
            document.getElementById('notifDiv').classList.remove('hidden')
            let notifDiv = document.getElementById('notifDiv')
            notifDiv.textContent = "Data updated , please reload the page !"
            document.body.appendChild(notifDiv)
            console.log("data updated")
        }
    } catch (error) {
        console.error('Error fetching max ID:', error);
        throw error;
    }
}

async function getMaxIdAfterLoaded() {
    let url = `https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty`;

    try {
        const response = await fetch(url);
        const maxId = await response.json();
        holderId = maxId;
        id = maxId
        loadContent(20)
        return id
    } catch (error) {
        console.error('Error fetching max ID:', error);
        throw error;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const toggleDarkMode = document.getElementById("toggle-dark-mode");
    const body = document.body;
    getMaxIdAfterLoaded()
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
    window.addEventListener('scroll', handleScroll);
});




function handleScroll() {
    if (window.scrollY > scrollFetchData) {
        loadContent(20);
        scrollFetchData += 1500;
    }
}

function loadContent(nbOfCards) {
    let count = 0
    for (let i = id; i >= id-nbOfCards; i--) {
        if (count === nbOfCards) {
            break
        }
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then(response => response.json())
            .then(data => {
                let status = data.type === 'story' || data.type === 'poll' || data.type === 'job'
                if (data.type === "comment" || (status && data.dead) || data.title === undefined || (status && data.deleted)) {
                    id--
                    loadContent(1)
                    return
                }
                id--
                content.append(createCards(data))
            }).catch((error) => {
                console.log(Error('error fetch data ', + error, "in :", id));
            })

        count++
    }
    id--
}





function createCards(data) {
    const div = document.createElement('div')
    div.className = 'card'
    div.id = 'news-card'
    div.dataset.idPost = data.id
    div.innerHTML = `
        <div class="title"><a href="#" id="story-title">${data.title}</a></div>
        <div class="info">
                    by <span id="story-author">${data.by}</span> | Score: <span id="story-score">${data.score}</span> | Comments: <span
                        id="story-comments">${data.kids ? data.kids.length : 0}</span> | type: <span id="type">${data.type}</span>
        </div>
        <div class="comments">
        </div>
    `

    div.addEventListener('click', e => {
        getPostInfos(div.dataset['idPost'])
    })

    return div
}




function getPostInfos(idPost) {
    document.getElementById('postInfos').classList.remove('hidden')
    fetch(`https://hacker-news.firebaseio.com/v0/item/${idPost}.json`)
        .then(response => response.json())
        .then(data => {
            divInfos.innerHTML = `
        <button id="closeBtn" >close</button>
        <div class="title"><a href="#" id="story-title">${data.title}</a></div>
        <div class="info">
        by <span id="story-author">${data.by}</span> | Score: <span id="story-score">${data.score}</span> | Comments: <span
        id="story-comments">${data.descendants}</span> | type: <span id="type">${data.type}</span>
        </div>
        <div id="pollsopt">
            <h3>options</h3>
        </div>
        <div id="comments">
        <h2>COMMENTS</h2>
        </div>
        
        
        `
            document.getElementById('closeBtn').addEventListener('click', (e) => {
                document.getElementById('postInfos').classList.add('hidden')
            })
            getPollsData(data.parts)
            getComments(data.kids)
        })
}

function getComments(idsComment) {
    if (!idsComment) {
        return ""
    }

    for (let comment of idsComment) {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${comment}.json`)
            .then(response => response.json())
            .then(data => {
                let cmts = document.querySelector('#comments')
                let cmt = document.createElement('div')
                if (!cmt.deleted) {
                    cmt.innerHTML = data.by + "<br><br>" + data.text
                }
                cmts.append(cmt)
            })
    }
}

function getPollsData(idPoll) {
    if (!idPoll) {
        return ""
    }
    
    for (let options of idPoll) {
        fetch(`https://hacker-news.firebaseio.com/v0/item/${options}.json`)
        .then(response => response.json())
        .then(data => {
                let pollsopt = document.querySelector('#pollsopt')
                let pollOpt = document.createElement('div')
                if (!pollOpt.deleted) {
                    pollOpt.innerHTML = data.by + "<br></br>" + data.text + "<br> score:" + data.score
                }
                pollsopt.append(pollOpt)
            })
    }
}