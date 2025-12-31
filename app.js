// DECONSTRUCTION Card Generator Application

// State
let isAdmin = false;
let activeExpansions = ['base'];
let currentCard = null;
let currentCardType = null;
let choiceMade = false;

// Screen Navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');

    if (screenId === 'card-drawer') {
        initExpansionToggles();
        resetCardDraw();
    } else if (screenId === 'admin-panel') {
        initAdminPanel();
    }
}

function resetAndGoBack() {
    resetCardDraw();
    showScreen('main-menu');
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

    currentCard = dataManager.drawRandomCard(type, activeExpansions);
    currentCardType = type;
    choiceMade = false;

    const expansion = dataManager.getExpansions().find(e => e.id === currentCard.expansion);

    // Hide card buttons, show card
    document.getElementById('card-buttons').classList.add('hidden');
    document.getElementById('card-display').classList.remove('hidden');
    document.getElementById('draw-new-container').classList.add('hidden');

    displayCard(currentCard, type, expansion);
}

function displayCard(card, type, expansion) {
    const container = document.getElementById('card-display');

    if (type === 'spirit') {
        const rewardsHTML = renderRewardIcons(card.rewards);
        const specialHTML = card.special ? `<div class="special-effect">${card.special}</div>` : '';

        container.innerHTML = `
            <div class="drawn-card spirit">
                <span class="card-type-label spirit">Spirit Card</span>
                ${expansion ? `<span class="card-expansion-label">${expansion.name}</span>` : ''}
                <p class="card-text">${card.text}</p>
                <div class="card-consequence">
                    <h4>Consequence</h4>
                    <div class="reward-icons">${rewardsHTML}</div>
                    ${specialHTML}
                </div>
            </div>
        `;
        // Show draw new button immediately for spirit cards
        document.getElementById('draw-new-container').classList.remove('hidden');

    } else if (type === 'choice') {
        container.innerHTML = `
            <div class="drawn-card choice">
                <span class="card-type-label choice">Choice Card</span>
                ${expansion ? `<span class="card-expansion-label">${expansion.name}</span>` : ''}
                <p class="card-text">${card.text}</p>
                <div class="choice-options">
                    <div class="choice-option" onclick="makeChoice('A')" data-choice="A">
                        <div class="choice-label">Choice A</div>
                        <div class="choice-text">${card.choiceA.text}</div>
                        <div class="choice-consequence hidden-consequence" id="consequence-a">
                            <h5>Result:</h5>
                            <div class="reward-icons">${renderRewardIcons(card.choiceA.rewards)}</div>
                            ${card.choiceA.special ? `<div class="special-effect">${card.choiceA.special}</div>` : ''}
                        </div>
                    </div>
                    <div class="choice-option" onclick="makeChoice('B')" data-choice="B">
                        <div class="choice-label">Choice B</div>
                        <div class="choice-text">${card.choiceB.text}</div>
                        <div class="choice-consequence hidden-consequence" id="consequence-b">
                            <h5>Result:</h5>
                            <div class="reward-icons">${renderRewardIcons(card.choiceB.rewards)}</div>
                            ${card.choiceB.special ? `<div class="special-effect">${card.choiceB.special}</div>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

function makeChoice(choice) {
    if (choiceMade) return;
    choiceMade = true;

    const options = document.querySelectorAll('.choice-option');
    options.forEach(opt => {
        const optChoice = opt.dataset.choice;
        if (optChoice === choice) {
            opt.classList.add('selected', 'revealed');
            opt.querySelector('.choice-consequence').classList.remove('hidden-consequence');
        } else {
            opt.classList.add('disabled');
        }
    });

    // Show draw new button after choice is made
    document.getElementById('draw-new-container').classList.remove('hidden');
}

function renderRewardIcons(rewards) {
    if (!rewards) return '';

    const icons = [];
    for (const [key, value] of Object.entries(rewards)) {
        if (value !== 0) {
            const iconData = REWARD_ICONS[key];
            if (iconData) {
                const isGain = value > 0;
                icons.push(`
                    <div class="reward-icon ${key} ${isGain ? 'gain' : 'lose'}">
                        <span class="icon">${iconData.icon}</span>
                        <span class="amount ${isGain ? 'positive' : 'negative'}">${isGain ? '+' : ''}${value}</span>
                        <span class="label">${iconData.label}</span>
                    </div>
                `);
            }
        }
    }
    return icons.length > 0 ? icons.join('') : '<span style="color: var(--text-muted)">No token changes</span>';
}

function resetCardDraw() {
    currentCard = null;
    currentCardType = null;
    choiceMade = false;

    document.getElementById('card-buttons').classList.remove('hidden');
    document.getElementById('card-display').classList.add('hidden');
    document.getElementById('card-display').innerHTML = '';
    document.getElementById('draw-new-container').classList.add('hidden');
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
    renderAdminExpansions();
}

function switchAdminTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

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
        const rewardSummary = summarizeRewards(card.rewards);
        return `
            <div class="admin-card-item">
                <div class="admin-card-content">
                    <div class="admin-card-text">${card.text}</div>
                    <div class="admin-card-meta">
                        ${rewardSummary}${card.special ? ' | ' + card.special : ''}
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

function summarizeRewards(rewards) {
    if (!rewards) return 'No rewards';
    const parts = [];
    for (const [key, value] of Object.entries(rewards)) {
        if (value !== 0) {
            const label = REWARD_ICONS[key]?.label || key;
            parts.push(`${value > 0 ? '+' : ''}${value} ${label}`);
        }
    }
    return parts.length > 0 ? parts.join(', ') : 'No token changes';
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

    // Reset all number inputs to 0
    const rewardTypes = ['elder', 'grandparent', 'family', 'staff', 'youth', 'endurance', 'church', 'complaint', 'fame'];

    document.getElementById('card-form').reset();
    document.getElementById('card-type').value = type;

    // Reset all reward inputs
    rewardTypes.forEach(r => {
        const spiritEl = document.getElementById(`spirit-${r}`);
        const choiceAEl = document.getElementById(`choice-a-${r}`);
        const choiceBEl = document.getElementById(`choice-b-${r}`);
        if (spiritEl) spiritEl.value = 0;
        if (choiceAEl) choiceAEl.value = 0;
        if (choiceBEl) choiceBEl.value = 0;
    });

    document.querySelectorAll('.card-type-fields').forEach(el => el.classList.add('hidden'));

    if (type === 'spirit') {
        document.getElementById('spirit-fields').classList.remove('hidden');
        document.getElementById('expansion-select-group').classList.remove('hidden');
        title.textContent = existingCard ? 'Edit Spirit Card' : 'Add Spirit Card';
    } else if (type === 'choice') {
        document.getElementById('choice-fields').classList.remove('hidden');
        document.getElementById('expansion-select-group').classList.remove('hidden');
        title.textContent = existingCard ? 'Edit Choice Card' : 'Add Choice Card';
    }

    if (existingCard) {
        document.getElementById('card-id').value = existingCard.id;
        document.getElementById('card-text').value = existingCard.text;
        document.getElementById('card-expansion').value = existingCard.expansion;

        if (type === 'spirit') {
            if (existingCard.rewards) {
                rewardTypes.forEach(r => {
                    const el = document.getElementById(`spirit-${r}`);
                    if (el && existingCard.rewards[r] !== undefined) {
                        el.value = existingCard.rewards[r];
                    }
                });
            }
            document.getElementById('spirit-special').value = existingCard.special || '';
        } else if (type === 'choice') {
            document.getElementById('choice-a-text').value = existingCard.choiceA.text;
            document.getElementById('choice-b-text').value = existingCard.choiceB.text;

            if (existingCard.choiceA.rewards) {
                rewardTypes.forEach(r => {
                    const el = document.getElementById(`choice-a-${r}`);
                    if (el && existingCard.choiceA.rewards[r] !== undefined) {
                        el.value = existingCard.choiceA.rewards[r];
                    }
                });
            }
            if (existingCard.choiceB.rewards) {
                rewardTypes.forEach(r => {
                    const el = document.getElementById(`choice-b-${r}`);
                    if (el && existingCard.choiceB.rewards[r] !== undefined) {
                        el.value = existingCard.choiceB.rewards[r];
                    }
                });
            }
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
    const rewardTypes = ['elder', 'grandparent', 'family', 'staff', 'youth', 'endurance', 'church', 'complaint', 'fame'];

    if (type === 'spirit') {
        const rewards = {};
        rewardTypes.forEach(r => {
            rewards[r] = parseInt(document.getElementById(`spirit-${r}`).value) || 0;
        });

        const card = {
            id: id,
            text: document.getElementById('card-text').value,
            rewards: rewards,
            special: document.getElementById('spirit-special').value || '',
            expansion: document.getElementById('card-expansion').value
        };
        dataManager.saveSpiritCard(card);
        renderAdminSpiritCards();

    } else if (type === 'choice') {
        const choiceARewards = {};
        const choiceBRewards = {};
        rewardTypes.forEach(r => {
            choiceARewards[r] = parseInt(document.getElementById(`choice-a-${r}`).value) || 0;
            choiceBRewards[r] = parseInt(document.getElementById(`choice-b-${r}`).value) || 0;
        });

        const card = {
            id: id,
            text: document.getElementById('card-text').value,
            choiceA: {
                text: document.getElementById('choice-a-text').value,
                rewards: choiceARewards
            },
            choiceB: {
                text: document.getElementById('choice-b-text').value,
                rewards: choiceBRewards
            },
            expansion: document.getElementById('card-expansion').value
        };
        dataManager.saveChoiceCard(card);
        renderAdminChoiceCards();
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
    showScreen('main-menu');
});
