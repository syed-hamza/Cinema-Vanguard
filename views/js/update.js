
var id;
async function start() {
    try {
        const name = document.getElementById('name-data').getAttribute('data-name');
        console.log(name)
        var details = await getMovieData(name);
        console.log(details[0])
        id = details[0].mov_id;
        generateData(details[0]);
    } catch (error) {
        console.error(error);
    }
}
async function get_img(id){
    const response = await fetch(`/sqlimages/${id}`)
    const data = await response.json();
    return data[0].img;
}
async function update(button) {
    var inp_id = button.getAttribute('data-inp_id');
    var inputElement = document.getElementById(inp_id);
    var inputValue = inputElement.value;
    console.log(id);
    console.log(inputValue);
    query = `update movie set ${inp_id}='${inputValue}' where mov_id = '${id}';`
    console.log(query)
    const response = await fetch(`/sqlquery/${query}`);
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
    const head = document.getElementById("head");
    const imgh = document.getElementById("img_holder");
    const dur = document.getElementById("duration");
    const rel = document.getElementById("rel");
    const plot = document.getElementById("plot");
    var h = document.createElement('h1');
    h.innerText = details.title;
    head.appendChild(h);
    var img = document.createElement('img');
    path = await get_img(details.mov_id);
    img.src = `/images/${path}`;
    img.style.maxWidth = "100%";
    imgh.appendChild(img);
}
async function get_data(query) {
    try {
        const response = await fetch(`/sqlquery/${query}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}
document.addEventListener('DOMContentLoaded', start);