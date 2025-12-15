function loadMarkdownFromURL(url, elementId) {
    fetch(url)
        .then(res => res.text())
        .then(md => {
            document.getElementById(elementId).innerHTML = marked.parse(md);
        })
        .catch(err => {
            document.getElementById(elementId).innerHTML = "<p>Failed to load README.</p>";
            console.error("MD load error:", err);
        });
}




async function loadGitHubProjects(username) {
    const container = document.getElementById("projectList");

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await response.json();

        repos.forEach(repo => {
            const repoItem = document.createElement("div");
            repoItem.className = "projectItem";

            // GitHub raw README URL
            const readmeURL = `https://raw.githubusercontent.com/${username}/${repo.name}/main/README.md`;

            repoItem.dataset.md = readmeURL;
            repoItem.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description ?? "No description available"}</p>
            `;

            container.appendChild(repoItem);
        });

        attachProjectClickEvents();

    } catch (error) {
        console.error("Error loading repos:", error);
    }
}

function attachProjectClickEvents() {
    const projectItems = document.querySelectorAll(".projectItem");
    const popup = document.getElementById("projectMDPopup");
    const content = document.getElementById("projectMDContent");
    const closeMD = document.querySelector(".closeMD");

    projectItems.forEach(item => {
        item.addEventListener("click", () => {
            const mdPath = item.getAttribute("data-md");
            fetch(mdPath)
                .then(response => response.text())
                .then(text => {
                    content.innerHTML = marked.parse(text);
                    popup.style.display = "block";
                })
                .catch(err => {
                    content.innerHTML = "<p>README not found.</p>";
                    popup.style.display = "block";
                    console.error(err);
                });
        });
    });

    // Close popup
  closeMD.addEventListener("click", () => {
    popup.style.display = "none";
    content.innerHTML = "";
  });
}

document.addEventListener("DOMContentLoaded", () => {
    loadGitHubProjects("iiizanagiii"); 
});