function loadMarkdown(path, elementId) {
    fetch(path)
        .then(response => response.text())
        .then(md => {
            document.getElementById(elementId).innerHTML = marked.parse(md);
        })
        .catch(err => console.error("Error loading MD:", err));
}


document.addEventListener("DOMContentLoaded", () => {
  const projectItems = document.querySelectorAll(".projectItem");
  const popup = document.getElementById("projectMDPopup");
  const content = document.getElementById("projectMDContent");
  const closeMD = document.querySelector(".closeMD");

  projectItems.forEach(item => {
    item.addEventListener("click", () => {
      const mdPath = item.getAttribute("data-md");
      if (!mdPath) return;

      fetch(mdPath)
        .then(response => response.text())
        .then(text => {
          content.innerHTML = marked.parse(text);
          popup.style.display = "block";
        })
        .catch(err => {
          content.innerHTML = "<p>Error loading project content.</p>";
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
});