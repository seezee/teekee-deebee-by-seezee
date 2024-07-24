let current = 0;
for (let i = 0; i < document.links.length; i++) {
    if (document.links[i].href === document.URL) {
        current = i;
    }
}
document.links[current].className += ` current`;
document.links[current].ariaCurrent = `page`;
