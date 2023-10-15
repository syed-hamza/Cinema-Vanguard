
async function start() {
    try {
        const name = document.getElementById('name-data').getAttribute('data-name');
        var details = await getMovieData(name);
        generateData(details);
    } catch (error) {
        console.error(error);
    }
}

async function getMovieData(name) {
    try {
        const response = await fetch(`/sqlgetmovie/${name}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error; // Optionally rethrow the error if needed
    }
}

async function generateData(details) {
    details = details[0];
    console.log(details);
    const head = document.getElementById("head");
    const imgh = document.getElementById("img_holder");
    const dur = document.getElementById("duration");

    dur.innerHTML = details["duration"];

    var h = document.createElement('h1');
    h.innerText = details.name;
    head.appendChild(h);

    var img = document.createElement('img');
    img.src = "/images/shah.jpg";
    img.style.maxWidth = "100%";
    imgh.appendChild(img);

}

document.addEventListener('DOMContentLoaded', start);