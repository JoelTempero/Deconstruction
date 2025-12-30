// DECONSTRUCTION Card Generator Application

// State
let isAdmin = false;
let activeExpansions = ['base'];
let cardHistory = [];

// Screen Navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');

    // Initialize screen-specific content
    if (screenId === 'card-drawer') {
        initExpansionToggles();
    } else if (screenId === 'fame-cards') {
        renderFameCardsReference();
    } else if (screenId === 'admin-panel') {
        initAdminPanel();
    }
}

// Expansion Toggles for Card Drawer
function initExpansionToggles() {
    const container = document.getElementById('expansion-toggles');
    const expansions = dataManager.getExpansions();

    container.innerHTML = expansions.map(exp => `
        <label class="expansion-toggle ${activeExpansions.includes(exp.id) ? 'active' : ''}"
               style="border-color: ${exp.color}">
            <input type="checkbox"
                   ${activeExpansions.includes(exp.id) ? 'checked' : ''}
                   onchange="toggleExpansion('${exp.id}', this.checked)">
            <span>${exp.name}</span>
        </label>
    `).join('');
}

function toggleExpansion(expansionId, isActive) {
    if (isActive) {
        if (!activeExpansions.includes(expansionId)) {
            activeExpansions.push(expansionId);
        }
    } else {
        activeExpansions = activeExpansions.filter(id => id !== expansionId);
        // Ensure at least one expansion is active
        if (activeExpansions.length === 0) {
            activeExpansions = ['base'];
        }
    }
    initExpansionToggles();
}

// Card Drawing
function drawCard(type) {
    if (activeExpansions.length === 0) {
        alert('Please select at least one expansion pack.');
        return;
    }

    const card = dataManager.drawRandomCard(type, activeExpansions);
    const expansion = dataManager.getExpansions().find(e => e.id === card.expansion);

    displayCard(card, type, expansion);
    addToHistory(card, type);
}

function displayCard(card, type, expansion) {
    const container = document.getElementById('card-display');
    container.classList.remove('hidden');

    let cardHTML = '';

    if (type === 'spirit') {
        cardHTML = `
            <div class="drawn-card spirit">
                <span class="card-type-label spirit">Spirit Card</span>
                ${expansion ? `<span class="card-expansion-label">${expansion.name}</span>` : ''}
                <p class="card-text">${card.text}</p>
                <div class="card-consequence">
                    <h4>Consequence</h4>
                    <p>${card.consequence}</p>
                </div>
            </div>
        `;
    } else if (type === 'choice') {
        cardHTML = `
            <div class="drawn-card choice">
                <span class="card-type-label choice">Choice Card</span>
                ${expansion ? `<span class="card-expansion-label">${expansion.name}</span>` : ''}
                <p class="card-text">${card.text}</p>
                <div class="choice-options">
                    <div class="choice-option" onclick="selectChoice(this, 'A')">
                        <div class="choice-label">Choice A</div>
                        <div class="choice-text">${card.choiceA.text}</div>
                        <div class="choice-consequence">${card.choiceA.consequence}</div>
                    </div>
                    <div class="choice-option" onclick="selectChoice(this, 'B')">
                        <div class="choice-label">Choice B</div>
                        <div class="choice-text">${card.choiceB.text}</div>
                        <div class="choice-consequence">${card.choiceB.consequence}</div>
                    </div>
                </div>
            </div>
        `;
    }

    container.innerHTML = cardHTML;
}

function selectChoice(element, choice) {
    // Remove selection from siblings
    element.parentElement.querySelectorAll('.choice-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    // Add selection to clicked option
    element.classList.add('selected');
}

function addToHistory(card, type) {
    cardHistory.unshift({ card, type, timestamp: Date.now() });
    if (cardHistory.length > 10) {
        cardHistory.pop();
    }
    renderHistory();
}

function renderHistory() {
    const container = document.getElementById('history-list');
    container.innerHTML = cardHistory.map(item => `
        <div class="history-item">
            <span class="type-badge ${item.type}">${item.type}</span>
            <span>${item.card.text.substring(0, 60)}${item.card.text.length > 60 ? '...' : ''}</span>
        </div>
    `).join('');
}

// Fame Cards Reference
function renderFameCardsReference() {
    const container = document.getElementById('fame-cards-list');
    const fameCards = dataManager.getFameCards();

    container.innerHTML = fameCards.map(card => `
        <div class="fame-card">
            <span class="fame-roll-number">${card.roll}</span>
            <div class="fame-card-name">${card.name}</div>
            <div class="fame-card-reward">Reward: ${card.reward}</div>
            <div class="fame-card-roll">Roll a ${card.roll} to activate</div>
        </div>
    `).join('');
}

// PIN Entry
function checkPin(event) {
    if (event.key === 'Enter') {
        verifyPin();
    }
}

function verifyPin() {
    const pin = document.getElementById('pin-input').value;
    const errorEl = document.getElementById('pin-error');

    if (pin === ADMIN_PIN) {
        isAdmin = true;
        errorEl.classList.add('hidden');
        document.getElementById('pin-input').value = '';
        showScreen('admin-panel');
    } else {
        errorEl.classList.remove('hidden');
        document.getElementById('pin-input').value = '';
    }
}

function logoutAdmin() {
    isAdmin = false;
    showScreen('main-menu');
}

// Admin Panel
function initAdminPanel() {
    updateExpansionFilters();
    renderAdminSpiritCards();
    renderAdminChoiceCards();
    renderAdminFameCards();
    renderAdminExpansions();
}

function switchAdminTab(tab) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Update sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById('admin-' + tab).classList.add('active');
}

function updateExpansionFilters() {
    const expansions = dataManager.getExpansions();
    const optionsHTML = `
        <option value="all">All Expansions</option>
        ${expansions.map(exp => `<option value="${exp.id}">${exp.name}</option>`).join('')}
    `;

    document.getElementById('spirit-expansion-filter').innerHTML = optionsHTML;
    document.getElementById('choice-expansion-filter').innerHTML = optionsHTML;

    // Update card modal expansion selector
    const cardExpansionSelect = document.getElementById('card-expansion');
    cardExpansionSelect.innerHTML = expansions.map(exp =>
        `<option value="${exp.id}">${exp.name}</option>`
    ).join('');
}

function filterCards(type) {
    if (type === 'spirit') {
        renderAdminSpiritCards();
    } else {
        renderAdminChoiceCards();
    }
}

// Spirit Cards Admin
function renderAdminSpiritCards() {
    const filter = document.getElementById('spirit-expansion-filter').value;
    const cards = dataManager.getSpiritCards(filter === 'all' ? null : filter);
    const expansions = dataManager.getExpansions();

    const container = document.getElementById('spirit-cards-admin');
    container.innerHTML = cards.map(card => {
        const exp = expansions.find(e => e.id === card.expansion);
        return `
            <div class="admin-card-item">
                <div class="admin-card-content">
                    <div class="admin-card-text">${card.text}</div>
                    <div class="admin-card-meta">
                        ${card.consequence}
                        ${exp ? `<span class="expansion-badge" style="background: ${exp.color}">${exp.name}</span>` : ''}
                    </div>
                </div>
                <div class="admin-card-actions">
                    <button class="btn btn-edit" onclick="editSpiritCard('${card.id}')">Edit</button>
                    <button class="btn btn-delete" onclick="deleteSpiritCard('${card.id}')">Delete</button>
                </div>
            </div>
        `;
    }).join('');

    if (cards.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-muted);">No cards found</p>';
    }
}

function editSpiritCard(id) {
    const cards = dataManager.getSpiritCards();
    const card = cards.find(c => c.id === id);
    if (card) {
        openCardModal('spirit', card);
    }
}

function deleteSpiritCard(id) {
    if (confirm('Are you sure you want to delete this card?')) {
        dataManager.deleteSpiritCard(id);
        renderAdminSpiritCards();
    }
}

// Choice Cards Admin
function renderAdminChoiceCards() {
    const filter = document.getElementById('choice-expansion-filter').value;
    const cards = dataManager.getChoiceCards(filter === 'all' ? null : filter);
    const expansions = dataManager.getExpansions();

    const container = document.getElementById('choice-cards-admin');
    container.innerHTML = cards.map(card => {
        const exp = expansions.find(e => e.id === card.expansion);
        return `
            <div class="admin-card-item">
                <div class="admin-card-content">
                    <div class="admin-card-text">${card.text}</div>
                    <div class="admin-card-meta">
                        A: ${card.choiceA.text} | B: ${card.choiceB.text}
                        ${exp ? `<span class="expansion-badge" style="background: ${exp.color}">${exp.name}</span>` : ''}
                    </div>
                </div>
                <div class="admin-card-actions">
                    <button class="btn btn-edit" onclick="editChoiceCard('${card.id}')">Edit</button>
                    <button class="btn btn-delete" onclick="deleteChoiceCard('${card.id}')">Delete</button>
                </div>
            </div>
        `;
    }).join('');

    if (cards.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-muted);">No cards found</p>';
    }
}

function editChoiceCard(id) {
    const cards = dataManager.getChoiceCards();
    const card = cards.find(c => c.id === id);
    if (card) {
        openCardModal('choice', card);
    }
}

function deleteChoiceCard(id) {
    if (confirm('Are you sure you want to delete this card?')) {
        dataManager.deleteChoiceCard(id);
        renderAdminChoiceCards();
    }
}

// Fame Cards Admin
function renderAdminFameCards() {
    const cards = dataManager.getFameCards();

    const container = document.getElementById('fame-cards-admin');
    container.innerHTML = cards.map(card => `
        <div class="admin-card-item">
            <div class="admin-card-content">
                <div class="admin-card-text">${card.name}</div>
                <div class="admin-card-meta">
                    Roll: ${card.roll} | Reward: ${card.reward}
                </div>
            </div>
            <div class="admin-card-actions">
                <button class="btn btn-edit" onclick="editFameCard('${card.id}')">Edit</button>
                <button class="btn btn-delete" onclick="deleteFameCard('${card.id}')">Delete</button>
            </div>
        </div>
    `).join('');

    if (cards.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-muted);">No cards found</p>';
    }
}

function editFameCard(id) {
    const cards = dataManager.getFameCards();
    const card = cards.find(c => c.id === id);
    if (card) {
        openCardModal('fame', card);
    }
}

function deleteFameCard(id) {
    if (confirm('Are you sure you want to delete this card?')) {
        dataManager.deleteFameCard(id);
        renderAdminFameCards();
    }
}

// Expansions Admin
function renderAdminExpansions() {
    const expansions = dataManager.getExpansions();

    const container = document.getElementById('expansions-admin');
    container.innerHTML = expansions.map(exp => `
        <div class="admin-card-item">
            <div class="admin-card-content">
                <div class="admin-card-text" style="color: ${exp.color}">${exp.name}</div>
                <div class="admin-card-meta">${exp.description || 'No description'}</div>
            </div>
            <div class="admin-card-actions">
                ${!exp.protected ? `
                    <button class="btn btn-edit" onclick="editExpansion('${exp.id}')">Edit</button>
                    <button class="btn btn-delete" onclick="deleteExpansion('${exp.id}')">Delete</button>
                ` : '<span style="color: var(--text-muted);">Protected</span>'}
            </div>
        </div>
    `).join('');
}

function editExpansion(id) {
    const expansions = dataManager.getExpansions();
    const expansion = expansions.find(e => e.id === id);
    if (expansion) {
        openExpansionModal(expansion);
    }
}

function deleteExpansion(id) {
    if (confirm('Are you sure you want to delete this expansion? All associated cards will also be deleted.')) {
        dataManager.deleteExpansion(id);
        renderAdminExpansions();
        updateExpansionFilters();
    }
}

// Card Modal
function openCardModal(type, existingCard = null) {
    const modal = document.getElementById('card-modal');
    const title = document.getElementById('modal-title');

    // Reset form
    document.getElementById('card-form').reset();

    // Set type
    document.getElementById('card-type').value = type;

    // Show/hide appropriate fields
    document.querySelectorAll('.card-type-fields').forEach(el => el.classList.add('hidden'));

    if (type === 'spirit') {
        document.getElementById('spirit-fields').classList.remove('hidden');
        document.getElementById('expansion-select-group').classList.remove('hidden');
        title.textContent = existingCard ? 'Edit Spirit Card' : 'Add Spirit Card';
    } else if (type === 'choice') {
        document.getElementById('choice-fields').classList.remove('hidden');
        document.getElementById('expansion-select-group').classList.remove('hidden');
        title.textContent = existingCard ? 'Edit Choice Card' : 'Add Choice Card';
    } else if (type === 'fame') {
        document.getElementById('fame-fields').classList.remove('hidden');
        document.getElementById('expansion-select-group').classList.add('hidden');
        title.textContent = existingCard ? 'Edit Fame Card' : 'Add Fame Card';
    }

    // Fill in existing data if editing
    if (existingCard) {
        document.getElementById('card-id').value = existingCard.id;

        if (type === 'spirit') {
            document.getElementById('card-text').value = existingCard.text;
            document.getElementById('spirit-consequence').value = existingCard.consequence;
            document.getElementById('card-expansion').value = existingCard.expansion;
        } else if (type === 'choice') {
            document.getElementById('card-text').value = existingCard.text;
            document.getElementById('choice-a-text').value = existingCard.choiceA.text;
            document.getElementById('choice-a-consequence').value = existingCard.choiceA.consequence;
            document.getElementById('choice-b-text').value = existingCard.choiceB.text;
            document.getElementById('choice-b-consequence').value = existingCard.choiceB.consequence;
            document.getElementById('card-expansion').value = existingCard.expansion;
        } else if (type === 'fame') {
            document.getElementById('card-text').value = existingCard.name;
            document.getElementById('fame-roll').value = existingCard.roll;
            document.getElementById('fame-reward').value = existingCard.reward;
        }
    }

    modal.classList.remove('hidden');
}

function closeCardModal() {
    document.getElementById('card-modal').classList.add('hidden');
}

function saveCard(event) {
    event.preventDefault();

    const type = document.getElementById('card-type').value;
    const id = document.getElementById('card-id').value || null;

    if (type === 'spirit') {
        const card = {
            id: id,
            text: document.getElementById('card-text').value,
            consequence: document.getElementById('spirit-consequence').value,
            expansion: document.getElementById('card-expansion').value
        };
        dataManager.saveSpiritCard(card);
        renderAdminSpiritCards();
    } else if (type === 'choice') {
        const card = {
            id: id,
            text: document.getElementById('card-text').value,
            choiceA: {
                text: document.getElementById('choice-a-text').value,
                consequence: document.getElementById('choice-a-consequence').value
            },
            choiceB: {
                text: document.getElementById('choice-b-text').value,
                consequence: document.getElementById('choice-b-consequence').value
            },
            expansion: document.getElementById('card-expansion').value
        };
        dataManager.saveChoiceCard(card);
        renderAdminChoiceCards();
    } else if (type === 'fame') {
        const card = {
            id: id,
            name: document.getElementById('card-text').value,
            roll: parseInt(document.getElementById('fame-roll').value),
            reward: document.getElementById('fame-reward').value
        };
        dataManager.saveFameCard(card);
        renderAdminFameCards();
    }

    closeCardModal();
}

// Expansion Modal
function openExpansionModal(existingExpansion = null) {
    const modal = document.getElementById('expansion-modal');
    const title = document.getElementById('expansion-modal-title');

    document.getElementById('expansion-form').reset();

    if (existingExpansion) {
        title.textContent = 'Edit Expansion Pack';
        document.getElementById('expansion-id').value = existingExpansion.id;
        document.getElementById('expansion-name').value = existingExpansion.name;
        document.getElementById('expansion-description').value = existingExpansion.description || '';
        document.getElementById('expansion-color').value = existingExpansion.color || '#6b4c9a';
    } else {
        title.textContent = 'Add Expansion Pack';
        document.getElementById('expansion-id').value = '';
    }

    modal.classList.remove('hidden');
}

function closeExpansionModal() {
    document.getElementById('expansion-modal').classList.add('hidden');
}

function saveExpansion(event) {
    event.preventDefault();

    const expansion = {
        id: document.getElementById('expansion-id').value || null,
        name: document.getElementById('expansion-name').value,
        description: document.getElementById('expansion-description').value,
        color: document.getElementById('expansion-color').value
    };

    dataManager.saveExpansion(expansion);
    renderAdminExpansions();
    updateExpansionFilters();
    closeExpansionModal();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Show main menu
    showScreen('main-menu');
});
