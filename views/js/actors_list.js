

async function start() {
    try {
        const search_val = document.getElementById("name-data").getAttribute('data-name')
        const data = await generatemovieList(search_val);
        generateBlocks(data);
    } catch (error) {
        console.error(error);
    }
}

async function generatemovieList(search_val) {
    try {
      const response = await fetch(`/sqlactors/${search_val}`);
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
        <div class="card">
            <div class="card-img-top">
                <img src="/images/${path}" alt="Card image cap">
            </div>
            <h5 class="card-title">${data.f_name} ${data.l_name}</h5>
        </div>
    `;
}


    async function generateBlocks(data) {
        const bd = document.getElementById("movie_card_row");
        for (const obj of data) {
            path = await get_img(obj.actor_id);
            const code = get_block(obj,path);
            const col = document.createElement('div');
            col.className = "col-md-4"; // Adjust the column size as per your layout needs (e.g., col-md-4 for 3 columns in a row)
            col.innerHTML = code;
            bd.appendChild(col);
        }
    }

document.addEventListener('DOMContentLoaded', start);
