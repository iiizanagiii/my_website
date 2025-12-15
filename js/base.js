$(document).ready(function() {
    $(".about").click(function() {
        $(".frontPage").fadeOut(500);
        $(".aboutPage").delay(500).slideDown(500);
        loadMarkdown("/my_website/assets/md/about.md", "aboutMD");
    });

    $(".skills").click(function() {
        $(".frontPage").fadeOut(500);
        $(".skillPage").delay(500).fadeIn(700);
        loadMarkdown("/my_website/assets/md/skills.md", "skillsMD");
    });

    $(".projects").click(function() {
        $(".frontPage").fadeOut(500);
        $(".projectPage").delay(500).fadeIn(700);
    });

    $(".contact").click(function() {
        $(".frontPage").fadeOut(500);
        $(".contactPage").delay(500).fadeIn(700);
        loadMarkdown("/my_website/assets/md/contacts.md", "contactMD");
    });

    $("#close").click(function() {
        $(".aboutPage").slideUp(500);
        $(".frontPage").delay(500).fadeIn(700);
    });

    $(".close").click(function() {
        $(".skillPage").fadeOut(500);
        $(".frontPage").delay(500).fadeIn(700);
    });

    $(".closer").click(function() {
        $(".projectPage").fadeOut(500);
        $(".frontPage").delay(500).fadeIn(700);
    });

    $(".closing").click(function() {
        $(".contactPage").fadeOut(500);
        $(".frontPage").delay(500).fadeIn(700);
    });
});


    function loadMarkdown(path, elementId) {
    fetch(path)
        .then(response => response.text())
        .then(md => {
            document.getElementById(elementId).innerHTML = marked.parse(md);
        })
        .catch(err => console.error("Error loading MD:", err));
    }
