const API_URL = 'https://dummyjson.com/todos';

const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-button');
const cardsContainer = document.getElementById('cards-container');

async function fetchtodos() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        displayCards(data.todos);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayCards(todos) {
    cardsContainer.innerHTML = '';
    todos.forEach(todo => { 
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="id">TODO #${todo.id}</div>
            <p class="body">${todo.todo}</p>
            <div class="status">${todo.completed}</div>
        `;
        cardsContainer.appendChild(card);
    });
}

searchButton.addEventListener('click', () => {
    const searchText = searchBar.value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const bodyText = card.querySelector('.body').textContent.toLowerCase(); // Match against the body text
        if (bodyText.includes(searchText)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});


fetchtodos();
