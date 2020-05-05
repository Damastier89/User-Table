const users = [{
        "_id": "5d220b10e8265cc978e2586b",
        "isActive": true,
        "balance": 2853.33,
        "age": 20,
        "name": "Buckner Osborne",
        "gender": "male",
        "company": "EMPIRICA",
        "email": "bucknerosborne@empirica.com",
        "phone": "+1 (850) 411-2997",
        "registered": "2018-08-13T04:28:45 -03:00",
        "nestedField": {
            total: 300
        }
    },
    {
        "_id": "5d220b10144ef972f6c2b332",
        "isActive": true,
        "balance": 1464.63,
        "age": 38,
        "name": "Rosalie Smith",
        "gender": "female",
        "company": "KATAKANA",
        "email": "rosaliesmith@katakana.com",
        "phone": "+1 (943) 463-2496",
        "registered": "2016-12-09T05:15:34 -02:00",
        "nestedField": {
            total: 400
        }
    },
    {
        "_id": "5d220b1083a0494655cdecf6",
        "isActive": false,
        "balance": 2823.39,
        "age": 40,
        "name": "Estrada Davenport",
        "gender": "male",
        "company": "EBIDCO",
        "email": "estradadavenport@ebidco.com",
        "phone": "+1 (890) 461-2088",
        "registered": "2016-03-04T03:36:38 -02:00",
        "nestedField": {
            total: 200
        }
    }
];

const tableSchema = {
    index: '#',
    name: 'Name',
    /* gender: 'Gender', */
    /* company: 'Company', */
    email: 'Email',
    phone: 'Phone',
    balance: 'Balance',
};

function generateThead(tableSchema) {
    const thead = document.createElement('thead');
    const tr = generateTr(tableSchema, 'th');
    thead.appendChild(tr);
    return thead;
}
//* Получаем все знаечения из tableSchema, перебираем их, на каждой итерации создали td и добавили в неё val(значение), добавили эту td в tr и вернули tr наружу.
function generateTr(tableSchema, tagName = 'td') {
    const tr = document.createElement('tr');
    Object.values(tableSchema).forEach(val => {
        const td = document.createElement(tagName);
        td.textContent = val;
        tr.appendChild(td);
    });
    return tr;
}

function generateTbody(tableSchema, items) {
    const tbody = document.createElement('tbody');
    items.forEach((item, index) => {
        item.index = index + 1;
        const itemSchema = generateItemsSchema(tableSchema, item);
        const tr = generateTr(itemSchema, 'td');
        tbody.appendChild(tr);
    });
    return tbody;
}
//* проверяем, если ли есть такой же ключ как в tableSchema, и если есть, то в acc добавляем под этим ключём item[key]. Так же в reduce на каждой итерации возвращаем наш acc. На выходе мы будем получать свою схему для кажного пользователя.
function generateItemsSchema(tableSchema, item) {
    const itemSchema = Object.keys(tableSchema).reduce((acc, key) => {
        if (key in item) {
            acc[key] = item[key];
        }
        return acc;
    }, {});

    return itemSchema;
}

//* функция создает таблицу
function generateTableTemplate() {
    const table = document.createElement('table');
    table.classList.add('table');
    return table;
}
//* На каждой итерации перебирая наш массив пользователей мы будем складыват в асс балан каждого пользователя.
function generateTotalBalanc(tableSchema, items) {
    const total = items.reduce((acc, item) => acc + parseFloat(item.balance), 0);
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    const columnCounts = Object.keys(tableSchema).length;
    td.insertAdjacentHTML('beforeend', `Total balance: <b>${total}</b> `);
    td.setAttribute('colspan', columnCounts);
    td.setAttribute('align', 'right');

    tr.appendChild(td);

    return tr;

}

//* функция выводит данные на страницу
function initTable(tableSchema, items) {
    const container = document.querySelector('.table-container');
    const table = generateTableTemplate();
    const header = generateThead(tableSchema);
    const body = generateTbody(tableSchema, items);
    const total = generateTotalBalanc(tableSchema, items);


    table.appendChild(header);
    table.appendChild(body);
    table.appendChild(total);

    container.appendChild(table);
}

initTable(tableSchema, users);