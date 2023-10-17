
async function start() {
    try {
        const id = document.getElementById('id_val').getAttribute('data-name');
        console.log(id);
        var details = await getActorData(id);
        console.log(details);
        generateData(details);
    } catch (error) {
        console.error(error);
    }
}
async function get_img(id){
    const response = await fetch(`/sqlimages/${id}`)
    const data = await response.json();
    return data[0].img;
}

async function getActorData(id) {
    try {
        const response = await fetch(`/sqlgetactor/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error; // Optionally rethrow the error if needed
    }
}

async function generateData(details) {
    details = details[0];
    const head = document.getElementById("head");
    const imgh = document.getElementById("img_holder");
    const dur = document.getElementById("gender");

    dur.innerHTML = details.gender;

    var h = document.createElement('h1');
    h.innerText = `${details.f_name} ${details.l_name}`;
    head.appendChild(h);
    var img = document.createElement('img');
    path = await get_img(details.actor_id);
    img.src = `/images/${path}`;
    img.style.maxWidth = "100%";
    imgh.appendChild(img);

}

document.addEventListener('DOMContentLoaded', start);