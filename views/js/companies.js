document.addEventListener('DOMContentLoaded', start);

async function start() {
    var query = ` SELECT nested.prod_id,nested.s_id,nested.amount FROM (SELECT sb.prod_id,s.s_id,s.amount FROM (SELECT sb.s_id,sb.prod_id FROM sponsered_by sb JOIN sponser s ON sb.s_id = s.s_id) sb JOIN production_house pc ON sb.prod_id = pc.prod_id JOIN sponser s ON sb.s_id = s.s_id) nested;`
    const data2 = await get_data(query);
    const table = document.getElementById("tabledata");
    query = 'select * from production_house';
    const data = await get_data(query);
    var i=0;
    for (const item of data) {
        const node = await get_node(item,data2,i);
        table.appendChild(node);
        i =i+1;
    }
    
}

async function get_node(data,ndata,i) {
    const row = document.createElement('tr');

    const name_col = document.createElement('td');
    name_col.textContent = data.prod_name;
    row.appendChild(name_col);

    const add_col = document.createElement('td');
    add_col.textContent = data.p_location;
    row.appendChild(add_col);

    query = `select * from sponsered_by as sb join sponser as s on s.s_id = sb.s_id where sb.prod_id='${data.prod_id}'`
    var data2 = await get_data(query);
    const sp_col = document.createElement('td');
    sp_col.textContent = data2[0].s_name;
    row.appendChild(sp_col);

    const amount = document.createElement('td');
    amount.textContent = ndata[i].amount; // Corrected from sp_col to amount
    row.appendChild(amount);

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
