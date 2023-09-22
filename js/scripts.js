const navbarSections = document.querySelectorAll(".nav-item")

removeActiveClass = () => {
    navbarSections.forEach(section => {
        let currentClass = section.className.replace(" active", "");
        section.className = currentClass;
    })
}

addActiveClass = (entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            removeActiveClass();
            let currentSection = document.querySelector(`#btn-${entry.target.id}`)
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