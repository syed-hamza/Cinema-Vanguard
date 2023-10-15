

async function start() {
    try {
        const names = await generatemovieList();
        generateBlocks(names);
    } catch (error) {
        console.error(error);
    }
}

async function generatemovieList() {
    try {
      const response = await fetch('/sqlmovies');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error; // Optionally rethrow the error if needed
    }
  }

function get_block(name) {
    return `
        <div class="card" style="width: 18rem;">
            <a href="movie/${name}">
            <img class="card-img-top" src="./images/shah.jpg" alt="Card image cap">
            </a>
            <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    `;
}


    function generateBlocks(names) {
        const bd = document.getElementById("movie_card_row");
        for (const name of names) {
            const code = get_block(name);
            const col = document.createElement('div');
            col.className = "col-md-4"; // Adjust the column size as per your layout needs (e.g., col-md-4 for 3 columns in a row)
            col.innerHTML = code;
            bd.appendChild(col);
        }
    }

document.addEventListener('DOMContentLoaded', start);
