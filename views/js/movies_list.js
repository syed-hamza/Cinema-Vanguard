

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
            <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    `;
}


async function generateBlocks(data) {
    const bd = document.getElementById("movie_card_row");
    for (const obj of data) {
        path = await get_img(obj.mov_id);
        const code = get_block(obj,path);
        const col = document.createElement('div');
        col.className = "col-md-4"; // Adjust the column size as per your layout needs (e.g., col-md-4 for 3 columns in a row)
        col.innerHTML = code;
        bd.appendChild(col);
    }
}

document.addEventListener('DOMContentLoaded', start);
