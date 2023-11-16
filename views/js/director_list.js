

async function start() {
    try {
        const search_val = document.getElementById("name-data").getAttribute('data-name')
        const data = await generatedirectorsList(search_val);
        generateBlocks(data);
    } catch (error) {
        console.error(error);
    }
   
}

async function generatedirectorsList(search_val) {
    try {
      const response = await fetch(`/sqldirectors/${search_val}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error; // Optionally rethrow the error if needed
    }
  }
  async function get_img(id){
    console.log(id)
    const response = await fetch(`/sqlimages/${id}`)
    const data = await response.json();
    return data[0].img;
}

function get_block(data,path) {
    return `
        <div class="card">
            <a href ="/director/${data.dir_id}">
                <div class="card-img-top">
                    <img src="/images/${path}" alt="Card image cap">
                </div>
            </a>
            <h5 class="card-title">${data.f_name} ${data.l_name}</h5>
        </div>
    `;
}


    async function generateBlocks(data) {
        const bd = document.getElementById("actors_card_row");
        for (const obj of data) {
            path = await get_img(obj.dir_id);
            const code = get_block(obj,path);
            const col = document.createElement('div');
            col.className = "col-md-4"; // Adjust the column size as per your layout needs (e.g., col-md-4 for 3 columns in a row)
            col.innerHTML = code;
            bd.appendChild(col);
        }
    }

document.addEventListener('DOMContentLoaded', start);
