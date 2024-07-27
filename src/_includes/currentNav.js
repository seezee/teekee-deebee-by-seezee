let current = 0;
for (let i = 0; i < document.links.length; i++) {
    const str = document.links[i].href;
    // if (document.links[i].href === document.URL) {
    if (document.URL.startsWith(str)) {
        current = i;
    }
}
document.links[current].classList.add(`current`);
document.links[current].ariaCurrent = `page`;
