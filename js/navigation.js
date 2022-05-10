const navigation = document.querySelector("aside > nav");
const navigationParts = document.querySelectorAll("aside > nav > a:not(#menu)");
const scrollButtons = document.querySelectorAll("[data-to]");

const scrollTo = (element, to, duration) => {
    if (duration <= 0) {
        return;
    }

    const difference = to - element.scrollTop;
    const perTick = difference / duration * 10;

    setTimeout(() => {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) {
            return;
        }
        scrollTo(element, to, duration - 10);
    }, 1);
}

document.addEventListener("scroll", (event) => {
    const top = window.pageYOffset || document.documentElement.scrollTop;

    let current;
    for (let part of navigationParts) {
        const element = document.querySelector(part.getAttribute("data-to"));
        const fromTop = element.offsetTop;
        const fromTopTreshold = fromTop - window.innerHeight * 0.5;

        if (fromTopTreshold <= top)
            current = part;
        else
            break;
    }

    for (let part of navigationParts) {
        if (part == current)
            part.classList.add("active");
        else
            part.classList.remove("active");
    }
});

const handleClick = (event) => {
    const link = event.target.closest("a");
    const target = document.querySelector(link.getAttribute("data-to"));

    scrollTo(document.documentElement, target.offsetTop, 500)
};

for (let part of scrollButtons) {
    part.addEventListener("click", handleClick);
}


const mobileNavigationButton = document.getElementById("menu");

mobileNavigationButton.addEventListener("click", () => {
    navigation.classList.toggle("mobile");

    const classes = mobileNavigationButton.querySelector("i").classList;

    classes.remove("fa-caret-down");
    classes.remove("fa-caret-up");
    classes.add(navigation.classList.contains("mobile") ? "fa-caret-up" : "fa-caret-down");
});