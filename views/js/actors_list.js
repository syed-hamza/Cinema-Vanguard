

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

function get_block(data,url) {
    return `
        <div class="card">
            <a href ="/actor/${data.actor_id}">
                <div class="card-img-top">
                    <img src=${url} alt="Card image cap">
                </div>
            </a>
            <h5 class="card-title">${data.f_name} ${data.l_name}</h5>
        </div>
    `;
}


async function generateBlocks(data) {
    const bd = document.getElementById("actors_card_row");
    for (const obj of data) {
        path = await get_img(obj.actor_id);
        url = await get_image_blob(path);
        const code = get_block(obj,url);
        const col = document.createElement('div');
        col.className = "col-md-4"; // Adjust the column size as per your layout needs (e.g., col-md-4 for 3 columns in a row)
        col.innerHTML = code;
        bd.appendChild(col);
    }
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
