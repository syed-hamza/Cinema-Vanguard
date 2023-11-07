document.addEventListener('DOMContentLoaded', start);

async function start() {
    const table = document.getElementById("tabledata");
    const query = 'select * from production_house';
    const data = await get_data(query);
    console.log(data);
    for (const item of data) {
        const node = await get_node(item);
        table.appendChild(node);
    }
}

async function get_node(data) {
    const row = document.createElement('tr');

    const name_col = document.createElement('td');
    name_col.textContent = data.prod_name;
    row.appendChild(name_col);

    const add_col = document.createElement('td');
    add_col.textContent = data.p_location;
    row.appendChild(add_col);

    const movieQuery = `select * from movie where mov_id = '${data.mov_id}'`;
    const moviedata = await get_data(movieQuery);

    if (moviedata.length > 0) {
        const movie_col = document.createElement('td');
        movie_col.textContent = moviedata[0].title;
        row.appendChild(movie_col);
    } else {
        const movie_col = document.createElement('td');
        movie_col.textContent = 'N/A';
        row.appendChild(movie_col);
    }

    query = `select * from sponsered_by as sb join sponser as s on s.s_id = sb.s_id where sb.prod_id='${data.prod_id}'`
    data = await get_data(query);
    const sp_col = document.createElement('td');
    console.log(data[0])
    sp_col.textContent = data[0].s_name;
    row.appendChild(sp_col);
    return row;
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
