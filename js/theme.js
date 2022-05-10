const THEME_KEY = "theme";
const THEME_LIGHT = "light";
const THEME_DARK = "dark";
let theme = localStorage.getItem(THEME_KEY);
const themeSwitcher = document.querySelector("#switcher");


if(theme == undefined) {
    localStorage.setItem(THEME_KEY, THEME_DARK);
    theme = THEME_DARK;
}

if(theme == THEME_LIGHT) {
    document.body.classList.add(THEME_LIGHT);
    const classes = themeSwitcher.querySelector("i").classList;

    classes.remove("fa-sun");
    classes.add("fa-moon");
}

themeSwitcher.addEventListener("click", () => {
    document.body.classList.toggle(THEME_LIGHT);

    const isLight = document.body.classList.contains(THEME_LIGHT);
    const classes = themeSwitcher.querySelector("i").classList;

    classes.remove("fa-sun");
    classes.remove("fa-moon");

    classes.add(isLight ? "fa-moon" : "fa-sun");

    localStorage.setItem(THEME_KEY, isLight ? THEME_LIGHT : THEME_DARK);
});