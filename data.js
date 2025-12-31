// DECONSTRUCTION Card Data
// Data management and storage for the card generator

const ADMIN_PIN = '9743';

// Reward types with their icons
const REWARD_ICONS = {
    elder: { icon: '👴', label: 'Elder' },
    grandparent: { icon: '👵', label: 'Grandparent' },
    family: { icon: '👨‍👩‍👧', label: 'Family' },
    staff: { icon: '👔', label: 'Staff' },
    youth: { icon: '🧑', label: 'Youth' },
    endurance: { icon: '💪', label: 'Endurance' },
    church: { icon: '⛪', label: 'Church Piece' },
    complaint: { icon: '📋', label: 'Complaint' },
    fame: { icon: '⭐', label: 'Fame' }
};

// Default Expansion Packs
const DEFAULT_EXPANSIONS = [
    { id: 'base', name: 'Base Game', description: 'Core game cards', color: '#e94560', protected: true },
    { id: 'divine', name: 'Divine Intervention', description: 'Situations caused by divine intervention', color: '#f4d03f' },
    { id: 'covid', name: 'COVID', description: 'Pandemic-related situations to navigate as church leader', color: '#3498db' }
];

// Helper to parse old text consequences into structured format
function parseConsequence(text) {
    const rewards = { elder: 0, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 0, fame: 0 };
    if (!text) return { rewards, special: '' };

    const lowerText = text.toLowerCase();

    // Parse gains
    const gainPatterns = [
        { regex: /gain\s+(\d+)\s+elder/gi, key: 'elder' },
        { regex: /gain\s+(\d+)\s+grandparent/gi, key: 'grandparent' },
        { regex: /gain\s+(\d+)\s+famil/gi, key: 'family' },
        { regex: /gain\s+(\d+)\s+staff/gi, key: 'staff' },
        { regex: /gain\s+(\d+)\s+youth/gi, key: 'youth' },
        { regex: /gain\s+(\d+)\s+young/gi, key: 'youth' },
        { regex: /gain\s+(\d+)\s+endurance/gi, key: 'endurance' },
        { regex: /gain\s+(\d+)\s+church/gi, key: 'church' },
        { regex: /gain\s+(\d+)\s+complaint/gi, key: 'complaint' },
        { regex: /gain\s+(\d+)\s+fame/gi, key: 'fame' },
        { regex: /gain\s+1\s+elder/gi, key: 'elder', val: 1 },
        { regex: /gain\s+1\s+fame\s+card/gi, key: 'fame', val: 1 },
    ];

    // Parse losses
    const losePatterns = [
        { regex: /lose\s+(\d+)\s+elder/gi, key: 'elder', neg: true },
        { regex: /lose\s+(\d+)\s+grandparent/gi, key: 'grandparent', neg: true },
        { regex: /lose\s+(\d+)\s+famil/gi, key: 'family', neg: true },
        { regex: /lose\s+(\d+)\s+staff/gi, key: 'staff', neg: true },
        { regex: /lose\s+(\d+)\s+youth/gi, key: 'youth', neg: true },
        { regex: /lose\s+(\d+)\s+young/gi, key: 'youth', neg: true },
        { regex: /lose\s+(\d+)\s+endurance/gi, key: 'endurance', neg: true },
        { regex: /lose\s+(\d+)\s+church/gi, key: 'church', neg: true },
        { regex: /lose\s+(\d+)\s+complaint/gi, key: 'complaint', neg: true },
        { regex: /lose\s+(\d+)\s+fame/gi, key: 'fame', neg: true },
    ];

    // Check for special effects
    let special = '';
    if (lowerText.includes('roll') || lowerText.includes('pick another') || lowerText.includes('steal') || lowerText.includes('set endurance')) {
        special = text;
    }

    return { rewards, special };
}

// Default Spirit Cards with structured rewards
const DEFAULT_SPIRIT_CARDS = [
    { id: 'spirit-1', text: 'You send an email to the assistant pastor planning an elders retreat and suggest that his wife bakes everyone biscuits, maybe 300.', rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 1, complaint: 0, fame: 0 }, special: '', expansion: 'base' },
    { id: 'spirit-2', text: "You've gained 4 new tithers this week, you even remember one of their names!", rewards: { elder: 0, grandparent: 0, family: 2, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 0, fame: 0 }, special: '', expansion: 'base' },
    { id: 'spirit-3', text: "You read Rob Bell's 'Love Wins' and feel that you need to rethink some things", rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: -3, complaint: 0, fame: 0 }, special: '', expansion: 'base' },
    { id: 'spirit-4', text: "Your youth pastor quotes 'The Shack' in his sunday night sermon", rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 }, special: '', expansion: 'base' },
    { id: 'spirit-5', text: 'A video of your assistant pastor yelling at a Starbucks employee goes viral', rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: -4, endurance: 0, church: 0, complaint: 0, fame: 1 }, special: '', expansion: 'base' },
    { id: 'spirit-6', text: 'Somebody is playing Gungor in the church cafe', rewards: { elder: 0, grandparent: -2, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 0, fame: 0 }, special: '', expansion: 'base' },
    { id: 'spirit-7', text: "Somebody is playing King's Kaleidoscope in the church cafe, the worship song with the F word in it", rewards: { elder: -1, grandparent: 0, family: 0, staff: 0, youth: 4, endurance: 0, church: 0, complaint: 0, fame: 0 }, special: '', expansion: 'base' },
    { id: 'spirit-8', text: 'You buy the worship team McDonalds Happy Meals to thank them for being there at 5am and leaving at 10pm every week', rewards: { elder: 0, grandparent: 0, family: 0, staff: 2, youth: 0, endurance: -2, church: 0, complaint: 0, fame: 0 }, special: '', expansion: 'base' },
    { id: 'spirit-9', text: 'Your staff make a sick baptism recruitment video that gets a lot of online buzz', rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 0, fame: 0 }, special: 'Roll the dice, collect this many Youth tokens', expansion: 'base' },
    { id: 'spirit-10', text: 'You preach at a different church, they like your refreshing style', rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 0, fame: 0 }, special: 'Pick another player to steal 2 Family tokens from', expansion: 'base' },
    { id: 'spirit-11', text: 'A visiting pastor delivers a powerful sermon that resonates with your congregation.', rewards: { elder: 1, grandparent: 0, family: 1, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 0, fame: 0 }, special: '', expansion: 'base' },
    { id: 'spirit-12', text: "Your church's worship band releases an album that becomes an overnight sensation.", rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 0, fame: 1 }, special: '', expansion: 'base' },
    { id: 'spirit-13', text: "The church's new small groups initiative brings in more engaged members.", rewards: { elder: 0, grandparent: 0, family: 1, staff: 1, youth: 0, endurance: 0, church: 0, complaint: 0, fame: 0 }, special: '', expansion: 'base' },
    { id: 'spirit-14', text: 'A mission trip overseas strengthens the faith of your congregation members.', rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 2, church: 0, complaint: 0, fame: 0 }, special: '', expansion: 'base' },
    { id: 'spirit-15', text: "Your church hosts a successful charity event, raising funds for a local cause.", rewards: { elder: 0, grandparent: 1, family: 1, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 0, fame: 0 }, special: '', expansion: 'base' },
    { id: 'spirit-16', text: 'You invite a well-known Christian speaker to your church, drawing in new visitors.', rewards: { elder: 1, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 0, fame: 1 }, special: '', expansion: 'base' },
    { id: 'spirit-17', text: "Your church's children's ministry experiences a sudden surge in attendance.", rewards: { elder: 0, grandparent: 0, family: 2, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 0, fame: 0 }, special: '', expansion: 'base' },
    { id: 'spirit-18', text: 'An anonymous donor contributes a large sum of money to your church.', rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 1, complaint: 0, fame: 0 }, special: '', expansion: 'base' },
    { id: 'spirit-19', text: 'Your sermon series on forgiveness leads to reconciliation among feuding church members.', rewards: { elder: 0, grandparent: 0, family: 1, staff: 0, youth: 0, endurance: 1, church: 0, complaint: 0, fame: 0 }, special: '', expansion: 'base' },
    { id: 'spirit-20', text: "A local news outlet features your church's community outreach program.", rewards: { elder: 0, grandparent: 0, family: 0, staff: 1, youth: 0, endurance: 0, church: 0, complaint: 0, fame: 1 }, special: '', expansion: 'base' },
    { id: 'spirit-21', text: 'Your congregation bands together to help a family in need.', rewards: { elder: 0, grandparent: 0, family: 1, staff: 0, youth: 1, endurance: 0, church: 0, complaint: 0, fame: 0 }, special: '', expansion: 'base' },
    { id: 'spirit-22', text: 'You lead a powerful prayer meeting that uplifts and encourages your congregation.', rewards: { elder: 1, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 1, church: 0, complaint: 0, fame: 0 }, special: '', expansion: 'base' },
    { id: 'spirit-23', text: 'A member of your congregation shares a testimony of healing, inspiring faith in others.', rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 2, church: 0, complaint: 0, fame: 0 }, special: '', expansion: 'base' },
    { id: 'spirit-24', text: "Your church's youth group wins an award for community service.", rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: 1, endurance: 0, church: 0, complaint: 0, fame: 1 }, special: '', expansion: 'base' },
    { id: 'spirit-25', text: 'A powerful storm damages your church building, but your congregation comes together to rebuild.', rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 1, church: 1, complaint: 0, fame: 0 }, special: '', expansion: 'base' },
    { id: 'spirit-26', text: 'You receive a letter from a former member expressing gratitude for your ministry.', rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 1, church: 0, complaint: 0, fame: 0 }, special: '', expansion: 'base' },
    { id: 'spirit-27', text: 'Your church hosts a marriage retreat, strengthening relationships within your congregation.', rewards: { elder: 0, grandparent: 1, family: 1, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 0, fame: 0 }, special: '', expansion: 'base' },
    { id: 'spirit-28', text: 'A member of your congregation experiences a miraculous healing during a service.', rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 2, church: 0, complaint: 0, fame: 1 }, special: '', expansion: 'base' },
    { id: 'spirit-29', text: 'Your church partners with a local non-profit to provide meals for the homeless.', rewards: { elder: 0, grandparent: 0, family: 1, staff: 1, youth: 0, endurance: 0, church: 0, complaint: 0, fame: 0 }, special: '', expansion: 'base' },
    { id: 'spirit-30', text: 'You create a sermon series based on a popular Christian book, and it is well-received.', rewards: { elder: 1, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 1, church: 0, complaint: 0, fame: 0 }, special: '', expansion: 'base' },
    { id: 'spirit-31', text: 'A beloved church member passes away, leaving behind a generous bequest for the church.', rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 1, complaint: 0, fame: 0 }, special: '', expansion: 'base' },
    { id: 'spirit-32', text: 'Your church hosts a successful vacation Bible school, attracting new families.', rewards: { elder: 0, grandparent: 0, family: 2, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 0, fame: 0 }, special: '', expansion: 'base' },
    { id: 'spirit-33', text: "The church's new online giving platform increases overall tithing.", rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 1, complaint: 0, fame: 0 }, special: '', expansion: 'base' },
    { id: 'spirit-34', text: 'A member of your congregation shares their artistic talents, creating beautiful artwork for your church.', rewards: { elder: 0, grandparent: 0, family: 0, staff: 1, youth: 0, endurance: 1, church: 0, complaint: 0, fame: 0 }, special: '', expansion: 'base' },
    { id: 'spirit-35', text: 'A prayer vigil at your church results in a powerful spiritual experience for many.', rewards: { elder: 1, grandparent: 0, family: 0, staff: 0, youth: 1, endurance: 0, church: 0, complaint: 0, fame: 0 }, special: '', expansion: 'base' },
    { id: 'spirit-36', text: 'A guest speaker at your church delivers an anti-LGBTQ+ message. Your congregation is divided.', rewards: { elder: 0, grandparent: 0, family: -1, staff: -1, youth: 0, endurance: 0, church: 0, complaint: 2, fame: 0 }, special: '', expansion: 'base' },
    { id: 'spirit-37', text: 'A sermon series on biblical womanhood causes controversy in the community.', rewards: { elder: 0, grandparent: 0, family: -1, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 1 }, special: '', expansion: 'base' },
    { id: 'spirit-38', text: 'Your church introduces a new worship style, causing a rift among members.', rewards: { elder: -1, grandparent: 0, family: 0, staff: 0, youth: 1, endurance: 0, church: 0, complaint: 1, fame: 0 }, special: '', expansion: 'base' },
    { id: 'spirit-39', text: 'Your church hosts a conference on spiritual gifts, but it is criticized for being too focused on sensationalism.', rewards: { elder: 0, grandparent: 0, family: -1, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 1 }, special: '', expansion: 'base' },
    { id: 'spirit-40', text: 'Your church launches a controversial fundraising campaign.', rewards: { elder: 0, grandparent: 0, family: 0, staff: -1, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 1 }, special: '', expansion: 'base' },
    { id: 'spirit-41', text: 'A podcast episode featuring a member of your congregation discussing their deconstruction journey goes viral.', rewards: { elder: -1, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 1 }, special: '', expansion: 'base' },
    { id: 'spirit-42', text: 'A member of your congregation converts to another religion, sparking controversy.', rewards: { elder: 0, grandparent: 0, family: -1, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 1 }, special: '', expansion: 'base' },
    { id: 'spirit-43', text: "Your church's outreach program is criticized for perpetuating harmful stereotypes.", rewards: { elder: 0, grandparent: 0, family: 0, staff: -1, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 1 }, special: '', expansion: 'base' },
    { id: 'spirit-44', text: "Your church's youth program is accused of being too focused on entertainment rather than spiritual growth.", rewards: { elder: 0, grandparent: 0, family: 0, staff: -1, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 1 }, special: '', expansion: 'base' },
    { id: 'spirit-45', text: "An incident at your church's daycare center attracts negative media attention.", rewards: { elder: 0, grandparent: 0, family: -1, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 1 }, special: '', expansion: 'base' },
    { id: 'spirit-46', text: 'Your church\'s leadership is criticized for being an "old boys\' club."', rewards: { elder: 0, grandparent: 0, family: 0, staff: -1, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 1 }, special: '', expansion: 'base' },
    { id: 'spirit-47', text: 'Your church is accused of overworking and underpaying its staff.', rewards: { elder: 0, grandparent: 0, family: 0, staff: -1, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 1 }, special: '', expansion: 'base' },
    { id: 'spirit-48', text: "A change in your church's service format leads to a decline in attendance.", rewards: { elder: 0, grandparent: 0, family: -1, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 1 }, special: '', expansion: 'base' },
    { id: 'spirit-49', text: 'A controversial billboard advertising your church sparks a heated debate.', rewards: { elder: 0, grandparent: 0, family: -1, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 1 }, special: '', expansion: 'base' },
    { id: 'spirit-50', text: 'A recovery program at your church is criticized for being too focused on conversion rather than healing.', rewards: { elder: 0, grandparent: 0, family: 0, staff: -1, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 1 }, special: '', expansion: 'base' },
    { id: 'spirit-51', text: "Your church's evangelism methods are accused of being manipulative.", rewards: { elder: 0, grandparent: 0, family: -1, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 1 }, special: '', expansion: 'base' },
    { id: 'spirit-52', text: 'A controversial tweet from your church goes viral, leading to a PR disaster.', rewards: { elder: 0, grandparent: 0, family: -1, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 1 }, special: '', expansion: 'base' },
    { id: 'spirit-53', text: 'Your church is accused of catering to celebrity members while neglecting the needs of the congregation.', rewards: { elder: 0, grandparent: 0, family: 0, staff: -1, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 1 }, special: '', expansion: 'base' },
    { id: 'spirit-54', text: "Your church's abstinence-only sex education program is criticized for being unrealistic and harmful.", rewards: { elder: 0, grandparent: 0, family: -1, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 1 }, special: '', expansion: 'base' }
];

// Default Choice Cards with structured rewards
const DEFAULT_CHOICE_CARDS = [
    {
        id: 'choice-1',
        text: 'An outbreak of Dungeons and Dragons appears in your youth group. Some families are concerned that their children are exposing themselves to evil spirits. What do you do?',
        choiceA: { text: 'Tell the parents they have nothing to worry about', rewards: { elder: 0, grandparent: 0, family: -2, staff: 0, youth: 6, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        choiceB: { text: "Renounce D&D on your church's Twitter page", rewards: { elder: 0, grandparent: 1, family: 1, staff: 0, youth: -6, endurance: 0, church: 0, complaint: 0, fame: 0 }, special: 'Set endurance to 1' },
        expansion: 'base'
    },
    {
        id: 'choice-2',
        text: "A young person asks, 'Why is there suffering in the world?' How do you answer?",
        choiceA: { text: 'God has mysterious ways', rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: -4, endurance: 1, church: 0, complaint: 0, fame: 0 } },
        choiceB: { text: "I don't really know", rewards: { elder: -1, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-3',
        text: 'A member of the Transgender community wishes to be baptised. Your congregation has conflicting views on the subject and rumours are starting to spread. What do you do?',
        choiceA: { text: 'Allow them to be baptised publicly', rewards: { elder: -1, grandparent: 0, family: 0, staff: 0, youth: 6, endurance: 0, church: -3, complaint: 0, fame: 2 } },
        choiceB: { text: 'Do not allow them to be baptised', rewards: { elder: 1, grandparent: 0, family: 0, staff: -2, youth: -4, endurance: 0, church: 0, complaint: 1, fame: -1 } },
        expansion: 'base'
    },
    {
        id: 'choice-4',
        text: "You've been reading up on Spiral Dynamics. Choose the colour you would like your congregation to be striving for.",
        choiceA: { text: 'Blue', rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: -3, endurance: 1, church: 0, complaint: 0, fame: 0 } },
        choiceB: { text: 'Orange', rewards: { elder: -1, grandparent: 0, family: 0, staff: 2, youth: 0, endurance: 0, church: 0, complaint: 0, fame: 1 } },
        expansion: 'base'
    },
    {
        id: 'choice-5',
        text: 'Your church website is being updated. You need to decide what goes on the front of the site.',
        choiceA: { text: "Drone shots of the church campus behind the title 'Welcome home'", rewards: { elder: 0, grandparent: -1, family: 0, staff: 0, youth: 3, endurance: 0, church: 0, complaint: 0, fame: 0 } },
        choiceB: { text: "Images of the church's mission work", rewards: { elder: 0, grandparent: 0, family: 0, staff: 1, youth: 0, endurance: 0, church: 0, complaint: 0, fame: -1 } },
        expansion: 'base'
    },
    {
        id: 'choice-6',
        text: 'Your church is hosting a community event, but it coincides with an important family commitment.',
        choiceA: { text: 'Reschedule the event', rewards: { elder: 0, grandparent: 0, family: 1, staff: 0, youth: 1, endurance: 0, church: 0, complaint: 0, fame: 0 } },
        choiceB: { text: 'Attend the family commitment', rewards: { elder: 0, grandparent: 0, family: 1, staff: 0, youth: 0, endurance: 1, church: 0, complaint: 0, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-7',
        text: 'A local politician requests to speak at your church.',
        choiceA: { text: 'Allow them to speak', rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 1 } },
        choiceB: { text: 'Politely decline', rewards: { elder: 0, grandparent: 0, family: 0, staff: 1, youth: 0, endurance: 1, church: 0, complaint: 0, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-8',
        text: 'A controversial book is gaining popularity among your congregation members.',
        choiceA: { text: 'Address it in a sermon', rewards: { elder: 1, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        choiceB: { text: 'Host a book discussion', rewards: { elder: 0, grandparent: 0, family: 0, staff: 1, youth: 0, endurance: 1, church: 0, complaint: 0, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-9',
        text: 'A new family is interested in joining your church, but they have some unconventional beliefs.',
        choiceA: { text: 'Welcome them without reservation', rewards: { elder: 0, grandparent: 0, family: 1, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        choiceB: { text: 'Discuss their beliefs before they join', rewards: { elder: 0, grandparent: 0, family: 0, staff: 1, youth: 0, endurance: 1, church: 0, complaint: 0, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-10',
        text: 'You are asked to mediate a disagreement between two church members.',
        choiceA: { text: 'Step in and help them find a resolution', rewards: { elder: 0, grandparent: 0, family: 1, staff: 0, youth: 0, endurance: 1, church: 0, complaint: 0, fame: 0 } },
        choiceB: { text: 'Encourage them to work it out on their own', rewards: { elder: 0, grandparent: 0, family: 0, staff: 1, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-11',
        text: 'A local business offers to sponsor your church event in exchange for advertising.',
        choiceA: { text: 'Accept the sponsorship', rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 1, complaint: 1, fame: 0 } },
        choiceB: { text: 'Decline the sponsorship', rewards: { elder: 0, grandparent: 0, family: 0, staff: 1, youth: 0, endurance: 1, church: 0, complaint: 0, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-12',
        text: "Your church's annual budget is tight, and you must decide which ministry to cut back.",
        choiceA: { text: 'Reduce the youth ministry budget', rewards: { elder: 1, grandparent: 0, family: 0, staff: 0, youth: -1, endurance: 0, church: 0, complaint: 0, fame: 0 } },
        choiceB: { text: 'Reduce the missions budget', rewards: { elder: 0, grandparent: 0, family: 0, staff: 1, youth: 0, endurance: 0, church: 0, complaint: 0, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-13',
        text: 'A talented musician in your congregation wants to join the worship team but struggles with punctuality.',
        choiceA: { text: 'Allow them to join', rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: 1, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        choiceB: { text: 'Ask them to improve punctuality before joining', rewards: { elder: 0, grandparent: 0, family: 0, staff: 1, youth: 0, endurance: 1, church: 0, complaint: 0, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-14',
        text: 'Your church has the opportunity to host a popular Christian conference.',
        choiceA: { text: 'Host the conference', rewards: { elder: 0, grandparent: 1, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 1 } },
        choiceB: { text: 'Decline the opportunity', rewards: { elder: 0, grandparent: 0, family: 0, staff: 1, youth: 0, endurance: 1, church: 0, complaint: 0, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-15',
        text: 'A member of your congregation confesses a serious moral failing.',
        choiceA: { text: 'Offer guidance and support', rewards: { elder: 0, grandparent: 0, family: 1, staff: 0, youth: 0, endurance: 1, church: 0, complaint: 0, fame: 0 } },
        choiceB: { text: 'Ask them to step down from their leadership position', rewards: { elder: 1, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-16',
        text: 'Your church is considering starting a new outreach program but it will require significant resources.',
        choiceA: { text: 'Proceed with the program', rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 1, complaint: 1, fame: 0 } },
        choiceB: { text: 'Hold off on starting the program', rewards: { elder: 0, grandparent: 0, family: 0, staff: 1, youth: 0, endurance: 1, church: 0, complaint: 0, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-17',
        text: "A neighboring church asks to borrow your church's sound equipment for an event.",
        choiceA: { text: 'Lend the equipment', rewards: { elder: 1, grandparent: 0, family: 0, staff: 0, youth: 1, endurance: 0, church: 0, complaint: 0, fame: 0 } },
        choiceB: { text: 'Decline the request', rewards: { elder: 0, grandparent: 0, family: 0, staff: 1, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-18',
        text: 'A couple in your congregation is going through a difficult divorce.',
        choiceA: { text: 'Offer pastoral counseling', rewards: { elder: 0, grandparent: 0, family: 1, staff: 0, youth: 0, endurance: 1, church: 0, complaint: 0, fame: 0 } },
        choiceB: { text: 'Refer them to a professional counselor', rewards: { elder: 0, grandparent: 0, family: 0, staff: 1, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-19',
        text: 'A guest speaker at your church promotes a theology you disagree with.',
        choiceA: { text: 'Publicly address your disagreement', rewards: { elder: 1, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        choiceB: { text: 'Discuss the issue privately with the speaker', rewards: { elder: 0, grandparent: 0, family: 0, staff: 1, youth: 0, endurance: 1, church: 0, complaint: 0, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-20',
        text: 'Your church is experiencing a financial shortfall.',
        choiceA: { text: 'Address the issue in a sermon', rewards: { elder: 1, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        choiceB: { text: 'Launch a fundraising campaign', rewards: { elder: 0, grandparent: 0, family: 1, staff: 1, youth: 0, endurance: 0, church: 0, complaint: 0, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-21',
        text: 'The church building needs a costly repair.',
        choiceA: { text: 'Use church funds', rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 1, complaint: 1, fame: 0 } },
        choiceB: { text: 'Organize a fundraising event', rewards: { elder: 0, grandparent: 1, family: 0, staff: 0, youth: 0, endurance: 1, church: 0, complaint: 0, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-22',
        text: 'A member of your congregation asks for financial assistance.',
        choiceA: { text: "Provide aid from the church's benevolence fund", rewards: { elder: 0, grandparent: 0, family: 1, staff: 0, youth: 0, endurance: 0, church: -1, complaint: 0, fame: 0 } },
        choiceB: { text: 'Encourage them to seek help from community resources', rewards: { elder: 0, grandparent: 0, family: 0, staff: 1, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-23',
        text: 'Your church is considering implementing a more contemporary worship style.',
        choiceA: { text: 'Embrace the change', rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: 2, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        choiceB: { text: 'Stick to traditional worship', rewards: { elder: 0, grandparent: 1, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-24',
        text: 'Your congregation is divided over a controversial social issue.',
        choiceA: { text: 'Preach a sermon addressing the issue', rewards: { elder: 1, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        choiceB: { text: 'Host a discussion group to facilitate conversation', rewards: { elder: 0, grandparent: 0, family: 0, staff: 1, youth: 0, endurance: 1, church: 0, complaint: 0, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-25',
        text: 'A member of the congregation has a unique skill they want to share during Sunday service.',
        choiceA: { text: 'Allow them to showcase their skill', rewards: { elder: 0, grandparent: 0, family: 1, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        choiceB: { text: 'Politely decline the offer', rewards: { elder: 0, grandparent: 0, family: 0, staff: 1, youth: 0, endurance: 1, church: 0, complaint: 0, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-26',
        text: 'A journalist wants to write a profile about your church and its impact on the community.',
        choiceA: { text: 'Agree to the interview', rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 1 } },
        choiceB: { text: 'Decline the interview', rewards: { elder: 0, grandparent: 0, family: 0, staff: 1, youth: 0, endurance: 1, church: 0, complaint: 0, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-27',
        text: "Your church's annual picnic is approaching, but the weather forecast looks unfavorable.",
        choiceA: { text: 'Proceed with the picnic as planned', rewards: { elder: 0, grandparent: 0, family: 1, staff: 0, youth: 0, endurance: -1, church: 0, complaint: 0, fame: 0 } },
        choiceB: { text: 'Reschedule the picnic', rewards: { elder: 0, grandparent: 0, family: 0, staff: 1, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-28',
        text: 'A guest preacher is scheduled to speak at your church, but their travel plans fall through at the last minute.',
        choiceA: { text: 'Preach in their place', rewards: { elder: 1, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 1, church: 0, complaint: 0, fame: 0 } },
        choiceB: { text: 'Organize a panel discussion with church leaders', rewards: { elder: 0, grandparent: 0, family: 1, staff: 1, youth: 0, endurance: 0, church: 0, complaint: 0, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-29',
        text: 'Your church is considering partnering with a local charity for a community service project.',
        choiceA: { text: 'Agree to the partnership', rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 1, complaint: 1, fame: 0 } },
        choiceB: { text: 'Decline the partnership', rewards: { elder: 0, grandparent: 0, family: 0, staff: 1, youth: 0, endurance: 1, church: 0, complaint: 0, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-30',
        text: 'A young adult in the congregation is struggling with their faith and has questions.',
        choiceA: { text: 'Meet with them to discuss their doubts', rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: 1, endurance: 1, church: 0, complaint: 0, fame: 0 } },
        choiceB: { text: 'Encourage them to join a small group to explore their faith', rewards: { elder: 0, grandparent: 0, family: 0, staff: 1, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-31',
        text: 'A gay couple requests to have their wedding at your church.',
        choiceA: { text: 'Officiate the wedding', rewards: { elder: 0, grandparent: 0, family: 2, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 2, fame: 0 } },
        choiceB: { text: 'Decline the request', rewards: { elder: 1, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-32',
        text: 'A woman from your congregation feels called to ministry.',
        choiceA: { text: 'Encourage her', rewards: { elder: 0, grandparent: 0, family: 0, staff: 1, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        choiceB: { text: 'Discourage her', rewards: { elder: 1, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-33',
        text: 'A popular worship leader offers to perform at your church, but their theology is questionable.',
        choiceA: { text: 'Accept the offer', rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 1 } },
        choiceB: { text: 'Decline the offer', rewards: { elder: 0, grandparent: 0, family: 1, staff: 0, youth: 0, endurance: 1, church: 0, complaint: 0, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-34',
        text: 'A congregant claims to have the gift of prophecy, but their prophecies are causing unrest.',
        choiceA: { text: 'Embrace their gift', rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 1 } },
        choiceB: { text: 'Dismiss their claims', rewards: { elder: 0, grandparent: 0, family: 0, staff: 1, youth: 0, endurance: 1, church: 0, complaint: 0, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-35',
        text: 'A wealthy member offers a large donation in exchange for influence in the church.',
        choiceA: { text: 'Accept the donation', rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 2, complaint: 1, fame: 0 } },
        choiceB: { text: 'Decline the donation', rewards: { elder: 0, grandparent: 0, family: 1, staff: 0, youth: 0, endurance: 1, church: 0, complaint: 0, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-36',
        text: 'A small group at your church wants to start a "deconstructing faith" discussion.',
        choiceA: { text: 'Support the group', rewards: { elder: 0, grandparent: 0, family: 1, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        choiceB: { text: 'Shut down the group', rewards: { elder: 1, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-37',
        text: 'Your church is invited to participate in an interfaith event.',
        choiceA: { text: 'Attend the event', rewards: { elder: 0, grandparent: 0, family: 1, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        choiceB: { text: 'Decline the invitation', rewards: { elder: 1, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-38',
        text: 'Your church has the opportunity to partner with a local social justice organization.',
        choiceA: { text: 'Partner with them', rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 1, complaint: 1, fame: 0 } },
        choiceB: { text: 'Decline the partnership', rewards: { elder: 0, grandparent: 0, family: 0, staff: 1, youth: 0, endurance: 1, church: 0, complaint: 0, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-39',
        text: 'The youth group plans a lock-in event, but some parents are concerned about supervision.',
        choiceA: { text: 'Allow the event', rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: 2, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        choiceB: { text: 'Cancel the event', rewards: { elder: 0, grandparent: 0, family: 1, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-40',
        text: "A parent complains about the lack of age-appropriate children's ministry.",
        choiceA: { text: 'Invest in improvements', rewards: { elder: 0, grandparent: 0, family: 1, staff: 0, youth: 0, endurance: 0, church: 1, complaint: 0, fame: 0 } },
        choiceB: { text: 'Ignore the complaint', rewards: { elder: 1, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-41',
        text: 'Your church is accused of perpetuating white privilege.',
        choiceA: { text: 'Address the issue head-on', rewards: { elder: 0, grandparent: 0, family: 1, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        choiceB: { text: 'Ignore the criticism', rewards: { elder: 1, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-42',
        text: 'A staff member is caught in a scandal.',
        choiceA: { text: 'Fire them', rewards: { elder: 1, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        choiceB: { text: 'Stand by them', rewards: { elder: 0, grandparent: 0, family: 0, staff: 1, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-43',
        text: "Some congregants complain that your church's service is too long.",
        choiceA: { text: 'Shorten the service', rewards: { elder: 0, grandparent: 0, family: 1, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        choiceB: { text: 'Keep the service as-is', rewards: { elder: 1, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-44',
        text: "Your church's new marketing campaign is met with mixed reactions.",
        choiceA: { text: 'Continue the campaign', rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 1 } },
        choiceB: { text: 'Pull the campaign', rewards: { elder: 0, grandparent: 0, family: 0, staff: 1, youth: 0, endurance: 1, church: 0, complaint: 0, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-45',
        text: 'A member of your congregation is struggling with addiction.',
        choiceA: { text: 'Offer support and resources', rewards: { elder: 0, grandparent: 0, family: 1, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        choiceB: { text: 'Encourage them to find help elsewhere', rewards: { elder: 1, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-46',
        text: "A congregant questions your church's exclusive view on salvation.",
        choiceA: { text: 'Engage in open dialogue', rewards: { elder: 0, grandparent: 0, family: 1, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        choiceB: { text: 'Shut down the conversation', rewards: { elder: 1, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-47',
        text: "Your church's social media presence is criticized for being tone-deaf.",
        choiceA: { text: 'Hire a social media manager', rewards: { elder: 0, grandparent: 0, family: 0, staff: 1, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        choiceB: { text: 'Ignore the criticism', rewards: { elder: 1, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-48',
        text: 'A celebrity wants to join your church, but their lifestyle contradicts your beliefs.',
        choiceA: { text: 'Welcome them', rewards: { elder: 0, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 1 } },
        choiceB: { text: 'Turn them away', rewards: { elder: 0, grandparent: 0, family: 1, staff: 0, youth: 0, endurance: 1, church: 0, complaint: 0, fame: 0 } },
        expansion: 'base'
    },
    {
        id: 'choice-49',
        text: 'A church leader is caught in a sex scandal.',
        choiceA: { text: 'Remove them from leadership', rewards: { elder: 1, grandparent: 0, family: 0, staff: 0, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        choiceB: { text: 'Stand by them', rewards: { elder: 0, grandparent: 0, family: 0, staff: 1, youth: 0, endurance: 0, church: 0, complaint: 1, fame: 0 } },
        expansion: 'base'
    }
];

// Data version - increment this to force a data refresh
const DATA_VERSION = 2;

// Data Storage Manager
class DataManager {
    constructor() {
        this.storageKeys = {
            expansions: 'deconstruction_expansions',
            spiritCards: 'deconstruction_spirit_cards',
            choiceCards: 'deconstruction_choice_cards',
            drawnCards: 'deconstruction_drawn_cards',
            dataVersion: 'deconstruction_data_version'
        };
        this.initializeData();
    }

    initializeData() {
        // Check if data version has changed - if so, reset to defaults
        const storedVersion = localStorage.getItem(this.storageKeys.dataVersion);
        if (storedVersion !== String(DATA_VERSION)) {
            console.log('Data version changed, resetting to defaults...');
            this.resetToDefaults();
            localStorage.setItem(this.storageKeys.dataVersion, String(DATA_VERSION));
            return;
        }

        if (!localStorage.getItem(this.storageKeys.expansions)) {
            localStorage.setItem(this.storageKeys.expansions, JSON.stringify(DEFAULT_EXPANSIONS));
        }
        if (!localStorage.getItem(this.storageKeys.spiritCards)) {
            localStorage.setItem(this.storageKeys.spiritCards, JSON.stringify(DEFAULT_SPIRIT_CARDS));
        }
        if (!localStorage.getItem(this.storageKeys.choiceCards)) {
            localStorage.setItem(this.storageKeys.choiceCards, JSON.stringify(DEFAULT_CHOICE_CARDS));
        }
        if (!localStorage.getItem(this.storageKeys.drawnCards)) {
            localStorage.setItem(this.storageKeys.drawnCards, JSON.stringify({ spirit: [], choice: [] }));
        }
    }

    getExpansions() {
        return JSON.parse(localStorage.getItem(this.storageKeys.expansions)) || [];
    }

    saveExpansion(expansion) {
        const expansions = this.getExpansions();
        const existingIndex = expansions.findIndex(e => e.id === expansion.id);
        if (existingIndex >= 0) {
            expansions[existingIndex] = expansion;
        } else {
            expansion.id = 'expansion-' + Date.now();
            expansions.push(expansion);
        }
        localStorage.setItem(this.storageKeys.expansions, JSON.stringify(expansions));
        return expansion;
    }

    deleteExpansion(id) {
        let expansions = this.getExpansions();
        expansions = expansions.filter(e => e.id !== id);
        localStorage.setItem(this.storageKeys.expansions, JSON.stringify(expansions));

        let spiritCards = this.getSpiritCards();
        spiritCards = spiritCards.filter(c => c.expansion !== id);
        localStorage.setItem(this.storageKeys.spiritCards, JSON.stringify(spiritCards));

        let choiceCards = this.getChoiceCards();
        choiceCards = choiceCards.filter(c => c.expansion !== id);
        localStorage.setItem(this.storageKeys.choiceCards, JSON.stringify(choiceCards));
    }

    getSpiritCards(expansionFilter = null) {
        let cards = JSON.parse(localStorage.getItem(this.storageKeys.spiritCards)) || [];
        if (expansionFilter && expansionFilter !== 'all') {
            cards = cards.filter(c => c.expansion === expansionFilter);
        }
        return cards;
    }

    saveSpiritCard(card) {
        const cards = this.getSpiritCards();
        const existingIndex = cards.findIndex(c => c.id === card.id);
        if (existingIndex >= 0) {
            cards[existingIndex] = card;
        } else {
            card.id = 'spirit-' + Date.now();
            cards.push(card);
        }
        localStorage.setItem(this.storageKeys.spiritCards, JSON.stringify(cards));
        return card;
    }

    deleteSpiritCard(id) {
        let cards = this.getSpiritCards();
        cards = cards.filter(c => c.id !== id);
        localStorage.setItem(this.storageKeys.spiritCards, JSON.stringify(cards));
    }

    getChoiceCards(expansionFilter = null) {
        let cards = JSON.parse(localStorage.getItem(this.storageKeys.choiceCards)) || [];
        if (expansionFilter && expansionFilter !== 'all') {
            cards = cards.filter(c => c.expansion === expansionFilter);
        }
        return cards;
    }

    saveChoiceCard(card) {
        const cards = this.getChoiceCards();
        const existingIndex = cards.findIndex(c => c.id === card.id);
        if (existingIndex >= 0) {
            cards[existingIndex] = card;
        } else {
            card.id = 'choice-' + Date.now();
            cards.push(card);
        }
        localStorage.setItem(this.storageKeys.choiceCards, JSON.stringify(cards));
        return card;
    }

    deleteChoiceCard(id) {
        let cards = this.getChoiceCards();
        cards = cards.filter(c => c.id !== id);
        localStorage.setItem(this.storageKeys.choiceCards, JSON.stringify(cards));
    }

    getDrawnCards() {
        return JSON.parse(localStorage.getItem(this.storageKeys.drawnCards)) || { spirit: [], choice: [] };
    }

    markCardDrawn(type, cardId) {
        const drawn = this.getDrawnCards();
        if (!drawn[type].includes(cardId)) {
            drawn[type].push(cardId);
        }
        localStorage.setItem(this.storageKeys.drawnCards, JSON.stringify(drawn));
    }

    resetDrawnCards(type = null) {
        const drawn = this.getDrawnCards();
        if (type) {
            drawn[type] = [];
        } else {
            drawn.spirit = [];
            drawn.choice = [];
        }
        localStorage.setItem(this.storageKeys.drawnCards, JSON.stringify(drawn));
    }

    getAvailableCards(type, activeExpansions) {
        const drawn = this.getDrawnCards();
        let cards = type === 'spirit' ? this.getSpiritCards() : this.getChoiceCards();
        cards = cards.filter(c => activeExpansions.includes(c.expansion));
        cards = cards.filter(c => !drawn[type].includes(c.id));
        return cards;
    }

    drawRandomCard(type, activeExpansions) {
        const available = this.getAvailableCards(type, activeExpansions);
        if (available.length === 0) {
            this.resetDrawnCards(type);
            return this.drawRandomCard(type, activeExpansions);
        }
        const randomIndex = Math.floor(Math.random() * available.length);
        const card = available[randomIndex];
        this.markCardDrawn(type, card.id);
        return card;
    }

    resetToDefaults() {
        localStorage.setItem(this.storageKeys.expansions, JSON.stringify(DEFAULT_EXPANSIONS));
        localStorage.setItem(this.storageKeys.spiritCards, JSON.stringify(DEFAULT_SPIRIT_CARDS));
        localStorage.setItem(this.storageKeys.choiceCards, JSON.stringify(DEFAULT_CHOICE_CARDS));
        this.resetDrawnCards();
    }
}

const dataManager = new DataManager();
