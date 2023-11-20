
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
    console.log(details);
    const head = document.getElementById("head");
    const imgh = document.getElementById("img_holder");
    const dur = document.getElementById("gender");
    const movies = document.getElementById("movies");
    const con = document.getElementById("contact");
    const age = document.getElementById("age");
    const ratings = document.getElementById("ratings");
    
    dur.innerHTML = details.gender;

    var h = document.createElement('h1');
    h.innerText = `${details.f_name} ${details.l_name}`;
    head.appendChild(h);
    var img = document.createElement('img');
    path = await get_img(details.actor_id);
    img.src = await get_image_blob(path)
    //img.src = `/images/${path}`;
    img.style.maxWidth = "100%";
    imgh.appendChild(img);
    movies.innerHTML = details.works;
    con.innerHTML = details.contact_no;

    age.innerHTML = details.age;
    ratings.innerHTML = details.ratings;

}
async function get_image_blob(id){
    obj =await fetch(`/sqlblob/${id}`) // Replace 'your_image_id' with the actual image ID you want to retrieve
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(blob => {
        // Create an object URL from the blob
        const objectURL = URL.createObjectURL(blob);
        return objectURL
      })
      .catch(error => {
        console.error('There was a problem fetching the image:', error);
      });
    return obj;
}

document.addEventListener('DOMContentLoaded', start);