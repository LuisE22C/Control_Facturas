const medium = document.querySelector("#medium");
const year = document.querySelector("#year");


// use the date object
const today = new Date();

year.innerHTML = `© <span class="highlight">${today.getFullYear()}</span> © 2025 🚀 Luis Cirilo 🚀 Guatemala`;

const lastModified = document.lastModified;
/*alert(document.lastModified);*/
// returns: Tuesday, December 16, 2017 11:09:42
document.querySelector('footer p').textContent = `Last Modification: ${lastModified}`;