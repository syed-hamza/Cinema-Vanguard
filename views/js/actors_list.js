

async function start() {
    try {
        const data = await generatemovieList();
        generateBlocks(data);
    } catch (error) {
        console.error(error);
    }
}

async function generatemovieList() {
    try {
      const response = await fetch('/sqlactors');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error; // Optionally rethrow the error if needed
    }
  }

function get_block(data) {
    return `
        <div class="card">
            <div class="card-img-top">
                <img src="./images/shah.jpg" alt="Card image cap">
            </div>
            <h5 class="card-title">${data.f_name} ${data.l_name}</h5>
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
