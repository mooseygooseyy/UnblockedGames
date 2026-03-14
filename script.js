let games = [];
let currentCategory = 'All';
let searchQuery = '';

const gamesGrid = document.getElementById('games-grid');
const searchInput = document.getElementById('search-input');
const filterContainer = document.getElementById('filters');
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlay-title');
const gameFrame = document.getElementById('game-frame');
const closeBtn = document.getElementById('close-btn');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const reloadBtn = document.getElementById('reload-btn');

// Fetch games from JSON
async function loadGames() {
    try {
        const response = await fetch('./src/data/games.json');
        games = await response.json();
        renderFilters();
        renderGames();
    } catch (error) {
        console.error('Error loading games:', error);
    }
}

function renderFilters() {
    const categories = ['All', ...new Set(games.map(g => g.category))];
    filterContainer.innerHTML = '<span class="filter-label">Categories</span>';
    
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `filter-btn ${cat === currentCategory ? 'active' : ''}`;
        btn.textContent = cat;
        btn.onclick = () => {
            currentCategory = cat;
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderGames();
        };
        filterContainer.appendChild(btn);
    });
}

function renderGames() {
    const filtered = games.filter(game => {
        const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = currentCategory === 'All' || game.category === currentCategory;
        return matchesSearch && matchesCategory;
    });

    gamesGrid.innerHTML = '';
    
    if (filtered.length === 0) {
        gamesGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: #71717a;">No games found.</div>';
        return;
    }

    filtered.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.innerHTML = `
            <div class="game-thumb">
                <img src="${game.thumbnail}" alt="${game.title}" referrerPolicy="no-referrer">
            </div>
            <div class="game-info">
                <div>
                    <div class="game-title">${game.title}</div>
                    <div class="game-cat">${game.category}</div>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="color: #10b981">
                    <path d="M8 5v14l11-7z"/>
                </svg>
            </div>
        `;
        card.onclick = () => openGame(game);
        gamesGrid.appendChild(card);
    });
}

function openGame(game) {
    overlayTitle.textContent = game.title;
    gameFrame.src = game.iframeUrl;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeGame() {
    overlay.classList.remove('active');
    gameFrame.src = '';
    document.body.style.overflow = 'auto';
}

// Event Listeners
searchInput.oninput = (e) => {
    searchQuery = e.target.value;
    renderGames();
};

closeBtn.onclick = closeGame;

reloadBtn.onclick = () => {
    gameFrame.src = gameFrame.src;
};

fullscreenBtn.onclick = () => {
    if (gameFrame.requestFullscreen) {
        gameFrame.requestFullscreen();
    } else if (gameFrame.webkitRequestFullscreen) {
        gameFrame.webkitRequestFullscreen();
    } else if (gameFrame.msRequestFullscreen) {
        gameFrame.msRequestFullscreen();
    }
};

// Close on ESC
window.onkeydown = (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closeGame();
    }
};

// Init
loadGames();
