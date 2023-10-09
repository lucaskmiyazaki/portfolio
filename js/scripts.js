// --------------------------Navbar ----------------------
const navbarSections = document.querySelectorAll(".nav-item")
window.location.href = "#home"

removeActiveClass = () => {
    navbarSections.forEach(section => {
        let currentClass = section.className.replace(" active", "");
        section.className = currentClass;
    })
}

addActiveClass = (entries, observer) => {
    entries.forEach(entry => {
        let currentSection;
        if(entry.isIntersecting){
            removeActiveClass();
            currentSection = document.querySelector(`#btn-${entry.target.id}`)
        }

        if (currentSection){
            let currentClass = currentSection.className + " active";
            currentSection.className = currentClass;
        }
    })
};

const options = {
    threshold: 0.1
};

const observer = new IntersectionObserver(addActiveClass, options);
const sections = document.querySelectorAll("section");

sections.forEach(section => {
    observer.observe(section);
});

// --------------------------Contact ----------------------
copyEmail = () => {
    // Copy the text inside the text field
    navigator.clipboard.writeText("lucaskmiyazaki@hotmail.com");
    alert("email address copied to clipboard");
}

// --------------------------About ----------------------
showMore = (id) => {
    var moreText = document.getElementById("skill-" + id);
    var arrow = document.getElementById("arrow-" + id);

    if (moreText.style.display === "none"){
        moreText.style.display = "inline";
        arrow.innerHTML = "&#65087;"
    } else {
        moreText.style.display = "none";
        arrow.innerHTML = "&#65088;"
    }
}