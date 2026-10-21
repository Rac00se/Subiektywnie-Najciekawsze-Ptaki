const teleport_top_button = document.getElementById("teleport_top_button");


window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        teleport_top_button.style.display = "block"; 
    } else {
        teleport_top_button.style.display = "none"; 
    }
});

// wykrywanie eventu
teleport_top_button.addEventListener("click", () => {
    window.scrollTo({
        top: 0, 
        behavior: "smooth"
    });
});