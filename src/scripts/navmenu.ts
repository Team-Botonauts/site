const menuBtn = document.querySelector("#menubtn") as HTMLDivElement;
const menu = document.querySelector("#menu") as HTMLDivElement;

function openMenu() {
    menu.classList.replace("hidden", "fixed")
    menu.classList.add("flex")
}

function closeMenu() {
    menu.classList.replace("fixed", "hidden")
    menu.classList.remove("flex")
}

menuBtn.addEventListener("click", () => {
    if (menu.classList.contains("hidden")) {
        openMenu()
    } else {
        closeMenu()
    }
})

document.addEventListener("click", (event) => {
    const target = event.target as Node;

    if (!menu.contains(target) && !menuBtn.contains(target)) {
        closeMenu();
    }
})