

async function start() {
    try {
        const search_val = document.getElementById("name-data").getAttribute('data-name')
        const data = await generatemovieList(search_val);
        generateBlocks(data);
    } catch (error) {
        console.error(error);
    }
    console.log(document.getElementById("name-data").getAttribute('data-name'));
}

async function generatemovieList(search_val) {
    try {
      const response = await fetch(`/sqlmovies/${search_val}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error; // Optionally rethrow the error if needed
    }
  }
async function get_img(id){
    const response = await fetch(`/sqlimages/${id}`)
    const data = await response.json();
    return data[0].img;
}
function get_block(data,path) {
    return `
        <div class="card" style="width: 18rem;">
            <a href="movie/${data.title}">
            <img class="card-img-top" src="/images/${path}" alt="Card image cap">
            </a>
            <div class="card-body">
            <h5 class="card-title">${data.title}</h5>
            <p class="card-text">${data.plot}</p>
            <p class="card-text">genre:${data.genre}</p>
            <a href="movie/${data.title}" class="btn btn-primary">More</a>
            </div>
        </div>
    `;
}
async function delete_movie(event) {
    const movieId = event.target.id;
    query = `delete from movie where mov_id='${movieId}';`
    const response = await fetch(`/sqlquery/${query}`);
    location.reload();
    console.log(response);
}

function get_block_admin(data, path) {
    return `
        <div class="card" style="width: 18rem;">
            <a href="movie/${data.title}">
                <img class="card-img-top" src="/images/${path}" alt="Card image cap">
            </a>
            <div class="card-body">
                <h5 class="card-title">${data.title}</h5>
                <p class="card-text">${data.plot}</p>
                <p class="card-text">genre: ${data.genre}</p>
                <a href="movie/${data.title}" class="btn btn-primary">More</a>
                <a href="update/${data.title}" class="btn btn-warning">Update</a>
                <button id="${data.mov_id}" onclick="delete_movie(event)" class="btn btn-danger">Delete</button>
            </div>
        </div>
    `;
}




async function generateBlocks(data) {
    const bd = document.getElementById("movie_card_row");
    var username = localStorage.getItem('username');
    for (const obj of data) {
        path = await get_img(obj.mov_id);
        var code =""
        if(username != "null" && username != null){
            query = `select * from accounts where username = '${username}'`;
            var res = await fetch(`/sqlquery/${query}`);
            res = await res.json();
            var auth = res[0].auth;
            console.log(auth)
            if(auth=="admin"){code = get_block_admin(obj,path);}
            else{code = get_block(obj,path);}
        }
        else{
            code = get_block(obj,path);
        }
        const col = document.createElement('div');
        col.className = "col-md-4"; // Adjust the column size as per your layout needs (e.g., col-md-4 for 3 columns in a row)
        col.innerHTML = code;
        bd.appendChild(col);
    }
}

document.addEventListener('DOMContentLoaded', start);
