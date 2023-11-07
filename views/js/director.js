
async function start() {
    try {
        const id = document.getElementById('id_val').getAttribute('data-name');
        var details = await getActorData(id);
        generateData(details);
    } catch (error) {
        console.error(error);
    }
}
async function get_img(id){
    console.log(id);
    const response = await fetch(`/sqlimages/${id}`)
    const data = await response.json();
    return data[0].img;
}

async function getActorData(id) {
    try {
        query = `select * from director where dir_id = '${id}'`
        const response = await fetch(`/sqlquery/${query}`);
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
    const dur = document.getElementById("gender");
    const movies = document.getElementById("movies");
    const con = document.getElementById("contact");
    dur.innerHTML = details.gender;

    var h = document.createElement('h1');
    h.innerText = `${details.f_name} ${details.l_name}`;
    head.appendChild(h);
    var img = document.createElement('img');
    path = await get_img(details.dir_id);
    img.src = `/images/${path}`;
    img.style.maxWidth = "100%";
    imgh.appendChild(img);
    movies.innerHTML = details.works;
    con.innerHTML = details.contact_no;

}

document.addEventListener('DOMContentLoaded', start);