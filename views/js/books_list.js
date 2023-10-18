

async function start() {
    try {
        const search_val = document.getElementById("name-data").getAttribute('data-name')
        const data = await generateBookList(search_val);
        generateBlocks(data);
    } catch (error) {
        console.error(error);
    }
    console.log(document.getElementById("name-data").getAttribute('data-name'));
}

async function generateBookList(search_val) {
    try {
      const response = await fetch(`/sqlbooks/${search_val}`);
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
function get_block(data,path,author) {
    return `
        <div class="card" style="width: 18rem;">
            <a href="movie/${data.b_name}">
            <img class="card-img-top" src="/images/${path}" alt="Card image cap">
            </a>
            <div class="card-body">
            <h5 class="card-title">${data.b_name}</h5>
            <h5 class="card-title">by ${author}</h5>
            </div>
        </div>
    `;
}


async function generateBlocks(data) {
    const bd = document.getElementById("book_card_row");
    for (const obj of data) {
        path = await get_img(obj.book_id);
        var query = `select CONCAT(w.f_name,w.l_name) as name from writer as w where w.writer_id = '${obj.writer_id}'`
        var author = await fetch(`/sqlquery/${query}`)
        author = await author.json()
        const code = get_block(obj,path,author[0].name);
        const col = document.createElement('div');
        col.className = "col-md-4"; // Adjust the column size as per your layout needs (e.g., col-md-4 for 3 columns in a row)
        col.innerHTML = code;
        bd.appendChild(col);
    }
}

document.addEventListener('DOMContentLoaded', start);
