document.addEventListener('DOMContentLoaded', () => {
    // Lista de perfis GitHub
    const usernames = [
        'Paulo-VieiraDev', // Seu perfil
        'torvalds',        // Linus Torvalds
        'mojombo',         // Tom Preston-Werner
        'defunkt',         // Josh Peek
        'pjhyett'          // PJ Hyett
    ];

    const cardsContainer = document.getElementById('cards-container');

    async function fetchUserData(username) {
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar dados do usuário: ' + response.statusText);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async function displayCards() {
        for (const username of usernames) {
            const userData = await fetchUserData(username);
            if (userData) {
                const card = document.createElement('div');
                card.className = 'card';

                card.innerHTML = `
                    <img src="${userData.avatar_url}" alt="${userData.login}">
                    <h3>${userData.name || userData.login}</h3>
                    <p>${userData.bio ? userData.bio : 'Sem bio disponível'}</p>
                    <a href="${userData.html_url}" target="_blank">Ver Perfil</a>
                `;

                cardsContainer.appendChild(card);
            }
        }
    }

    displayCards();
});
