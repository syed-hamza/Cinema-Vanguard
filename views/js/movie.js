
async function start() {
    try {
        const name = document.getElementById('name-data').getAttribute('data-name');
        var details = await getMovieData(name);
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
    const head = document.getElementById("head");
    const imgh = document.getElementById("img_holder");
    const dur = document.getElementById("duration");
    const dir = document.getElementById("director");
    const prd = document.getElementById("prod");
    const act = document.getElementById("act");
    const budget = document.getElementById("budget");
    const profit = document.getElementById("profit");
    const rel = document.getElementById("rel");
    const plot = document.getElementById("plot");
    dur.innerHTML = details["duration"];
    rel.innerHTML = details.date_of_release;
    plot.innerHTML = details.plot;
    var h = document.createElement('h1');
    h.innerText = details.title;
    head.appendChild(h);
    var img = document.createElement('img');
    path = await get_img(details.mov_id);
    img.src = `/images/${path}`;
    img.style.maxWidth = "100%";
    imgh.appendChild(img);

    query = `select * from director where director.dir_id = '${details.dir_id}'`
    data = await get_data(query);
    dir.innerHTML=`${data[0].f_name} ${data[0].l_name}`;

    query = `select * from production_house where mov_id = '${details.mov_id}'`
    data = await get_data(query);
    prd.innerHTML=`${data[0].prod_name}`;

    query = `select * from actor_list as al join actor as a on a.actor_id = al.actor_id where mov_id = '${details.mov_id}'`
    data = await get_data(query);
    for(i in data){
        act.innerHTML=act.innerHTML + `${data[i].f_name} ${data[i].l_name},`;
    }
    query = `select * from budget where mov_id = '${details.mov_id}'`
    data = await get_data(query);
    budget.innerHTML=`₹${data[0].expenditure}`;
    profit.innerHTML=`₹${data[0].profit}`;
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