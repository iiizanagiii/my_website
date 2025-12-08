function loadMarkdown(path, elementId) {
    fetch(path)
        .then(response => response.text())
        .then(md => {
            document.getElementById(elementId).innerHTML = marked.parse(md);
        })
        .catch(err => console.error("Error loading MD:", err));
}


