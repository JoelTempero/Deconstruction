// DECONSTRUCTION Card Data
// Data management and storage for the card generator

const ADMIN_PIN = '9743';

// Default Expansion Packs
const DEFAULT_EXPANSIONS = [
    { id: 'base', name: 'Base Game', description: 'Core game cards', color: '#e94560', protected: true },
    { id: 'divine', name: 'Divine Intervention', description: 'Situations caused by divine intervention', color: '#f4d03f' },
    { id: 'covid', name: 'COVID', description: 'Pandemic-related situations to navigate as church leader', color: '#3498db' }
];

// Default Fame Cards
const DEFAULT_FAME_CARDS = [
    { id: 'fame-1', name: 'The artist at the front of the stage', roll: 2, reward: '1 Grandparent' },
    { id: 'fame-2', name: 'The Church Barista', roll: 3, reward: '2 Family' },
    { id: 'fame-3', name: 'The Camera Guy', roll: 4, reward: '2 Staff' },
    { id: 'fame-4', name: 'The kid who can pick up the most chairs', roll: 5, reward: '2 Youth' },
    { id: 'fame-5', name: 'The trusted treasurer', roll: 6, reward: '1 Family' },
    { id: 'fame-6', name: 'The Pastors Kid turned Youth Pastor', roll: 7, reward: '1 Youth' },
    { id: 'fame-7', name: 'The Sexy Worship Leader', roll: 8, reward: '2 Youth' },
    { id: 'fame-8', name: 'The Parking Minister', roll: 9, reward: '2 Staff' },
    { id: 'fame-9', name: 'The Wholesome Welcome Person', roll: 10, reward: '2 Family' },
    { id: 'fame-10', name: 'The Choir Conductor', roll: 11, reward: '1 Grandparent' },
    { id: 'fame-11', name: 'The Climate Change Denier', roll: 12, reward: '1 Elder' }
];

// Default Spirit Cards
const DEFAULT_SPIRIT_CARDS = [
    // Original cards from first table
    { id: 'spirit-1', text: 'You send an email to the assistant pastor planning an elders retreat and suggest that his wife bakes everyone biscuits, maybe 300.', consequence: 'Gain 1 church piece', expansion: 'base' },
    { id: 'spirit-2', text: "You've gained 4 new tithers this week, you even remember one of their names!", consequence: 'Gain 2 Family tokens', expansion: 'base' },
    { id: 'spirit-3', text: "You read Rob Bell's 'Love Wins' and feel that you need to rethink some things", consequence: 'Lose 3 church pieces', expansion: 'base' },
    { id: 'spirit-4', text: "Your youth pastor quotes 'The Shack' in his sunday night sermon", consequence: 'Gain 1 Complaint card', expansion: 'base' },
    { id: 'spirit-5', text: 'A video of your assistant pastor yelling at a Starbucks employee goes viral', consequence: 'Gain 1 Fame card and lose 4 Youth', expansion: 'base' },
    { id: 'spirit-6', text: 'Somebody is playing Gungor in the church cafe', consequence: 'Lose 2 Grandparent tokens', expansion: 'base' },
    { id: 'spirit-7', text: "Somebody is playing King's Kaleidoscope in the church cafe, the worship song with the F word in it", consequence: 'Lose 1 Elder token, gain 4 Youth', expansion: 'base' },
    { id: 'spirit-8', text: 'You buy the worship team McDonalds Happy Meals to thank them for being there at 5am and leaving at 10pm every week', consequence: 'Gain 2 Staff, Lose 2 Endurance', expansion: 'base' },
    { id: 'spirit-9', text: 'Your staff make a sick baptism recruitment video that gets a lot of online buzz', consequence: 'Roll the dice, collect this many Youth tokens', expansion: 'base' },
    { id: 'spirit-10', text: 'You preach at a different church, they like your refreshing style', consequence: 'Pick another player to steal 2 Family tokens from', expansion: 'base' },

    // Additional Spirit Cards from second table
    { id: 'spirit-11', text: 'A visiting pastor delivers a powerful sermon that resonates with your congregation.', consequence: 'Gain 1 Elder and 1 Family', expansion: 'base' },
    { id: 'spirit-12', text: "Your church's worship band releases an album that becomes an overnight sensation.", consequence: 'Gain 1 Fame card', expansion: 'base' },
    { id: 'spirit-13', text: "The church's new small groups initiative brings in more engaged members.", consequence: 'Gain 1 Family and 1 Staff', expansion: 'base' },
    { id: 'spirit-14', text: 'A mission trip overseas strengthens the faith of your congregation members.', consequence: 'Gain 2 Endurance', expansion: 'base' },
    { id: 'spirit-15', text: "Your church hosts a successful charity event, raising funds for a local cause.", consequence: 'Gain 1 Grandparent and 1 Family', expansion: 'base' },
    { id: 'spirit-16', text: 'You invite a well-known Christian speaker to your church, drawing in new visitors.', consequence: 'Gain 1 Elder and 1 Fame card', expansion: 'base' },
    { id: 'spirit-17', text: "Your church's children's ministry experiences a sudden surge in attendance.", consequence: 'Gain 2 Families', expansion: 'base' },
    { id: 'spirit-18', text: 'An anonymous donor contributes a large sum of money to your church.', consequence: 'Gain 1 Church piece', expansion: 'base' },
    { id: 'spirit-19', text: 'Your sermon series on forgiveness leads to reconciliation among feuding church members.', consequence: 'Gain 1 Endurance and 1 Family', expansion: 'base' },
    { id: 'spirit-20', text: "A local news outlet features your church's community outreach program.", consequence: 'Gain 1 Fame card and 1 Staff', expansion: 'base' },
    { id: 'spirit-21', text: 'Your congregation bands together to help a family in need.', consequence: 'Gain 1 Family and 1 Young Person', expansion: 'base' },
    { id: 'spirit-22', text: 'You lead a powerful prayer meeting that uplifts and encourages your congregation.', consequence: 'Gain 1 Elder and 1 Endurance', expansion: 'base' },
    { id: 'spirit-23', text: 'A member of your congregation shares a testimony of healing, inspiring faith in others.', consequence: 'Gain 2 Endurance', expansion: 'base' },
    { id: 'spirit-24', text: "Your church's youth group wins an award for community service.", consequence: 'Gain 1 Young Person and 1 Fame card', expansion: 'base' },
    { id: 'spirit-25', text: 'A powerful storm damages your church building, but your congregation comes together to rebuild.', consequence: 'Gain 1 Church piece and 1 Endurance', expansion: 'base' },
    { id: 'spirit-26', text: 'You receive a letter from a former member expressing gratitude for your ministry.', consequence: 'Gain 1 Endurance', expansion: 'base' },
    { id: 'spirit-27', text: 'Your church hosts a marriage retreat, strengthening relationships within your congregation.', consequence: 'Gain 1 Grandparent and 1 Family', expansion: 'base' },
    { id: 'spirit-28', text: 'A member of your congregation experiences a miraculous healing during a service.', consequence: 'Gain 2 Endurance and 1 Fame card', expansion: 'base' },
    { id: 'spirit-29', text: 'Your church partners with a local non-profit to provide meals for the homeless.', consequence: 'Gain 1 Staff and 1 Family', expansion: 'base' },
    { id: 'spirit-30', text: 'You create a sermon series based on a popular Christian book, and it is well-received.', consequence: 'Gain 1 Elder and 1 Endurance', expansion: 'base' },
    { id: 'spirit-31', text: 'A beloved church member passes away, leaving behind a generous bequest for the church.', consequence: 'Gain 1 Church piece', expansion: 'base' },
    { id: 'spirit-32', text: 'Your church hosts a successful vacation Bible school, attracting new families.', consequence: 'Gain 2 Families', expansion: 'base' },
    { id: 'spirit-33', text: "The church's new online giving platform increases overall tithing.", consequence: 'Gain 1 Church piece', expansion: 'base' },
    { id: 'spirit-34', text: 'A member of your congregation shares their artistic talents, creating beautiful artwork for your church.', consequence: 'Gain 1 Staff and 1 Endurance', expansion: 'base' },
    { id: 'spirit-35', text: 'A prayer vigil at your church results in a powerful spiritual experience for many.', consequence: 'Gain 1 Elder and 1 Young Person', expansion: 'base' },

    // Controversial Spirit Cards
    { id: 'spirit-36', text: 'A guest speaker at your church delivers an anti-LGBTQ+ message. Your congregation is divided.', consequence: 'Lose 1 Family and 1 Staff, gain 2 Complaint cards', expansion: 'base' },
    { id: 'spirit-37', text: 'A sermon series on biblical womanhood causes controversy in the community.', consequence: 'Lose 1 Family, gain 1 Fame card and 1 Complaint card', expansion: 'base' },
    { id: 'spirit-38', text: 'Your church introduces a new worship style, causing a rift among members.', consequence: 'Lose 1 Elder, gain 1 Young Person and 1 Complaint card', expansion: 'base' },
    { id: 'spirit-39', text: 'Your church hosts a conference on spiritual gifts, but it is criticized for being too focused on sensationalism.', consequence: 'Lose 1 Family, gain 1 Fame card and 1 Complaint card', expansion: 'base' },
    { id: 'spirit-40', text: 'Your church launches a controversial fundraising campaign.', consequence: 'Lose 1 Staff, gain 1 Fame card and 1 Complaint card', expansion: 'base' },
    { id: 'spirit-41', text: 'A podcast episode featuring a member of your congregation discussing their deconstruction journey goes viral.', consequence: 'Lose 1 Elder, gain 1 Fame card and 1 Complaint card', expansion: 'base' },
    { id: 'spirit-42', text: 'A member of your congregation converts to another religion, sparking controversy.', consequence: 'Lose 1 Family, gain 1 Fame card and 1 Complaint card', expansion: 'base' },
    { id: 'spirit-43', text: "Your church's outreach program is criticized for perpetuating harmful stereotypes.", consequence: 'Lose 1 Staff, gain 1 Fame card and 1 Complaint card', expansion: 'base' },
    { id: 'spirit-44', text: "Your church's youth program is accused of being too focused on entertainment rather than spiritual growth.", consequence: 'Lose 1 Staff, gain 1 Fame card and 1 Complaint card', expansion: 'base' },
    { id: 'spirit-45', text: "An incident at your church's daycare center attracts negative media attention.", consequence: 'Lose 1 Family, gain 1 Fame card and 1 Complaint card', expansion: 'base' },
    { id: 'spirit-46', text: 'Your church\'s leadership is criticized for being an "old boys\' club."', consequence: 'Lose 1 Staff, gain 1 Fame card and 1 Complaint card', expansion: 'base' },
    { id: 'spirit-47', text: 'Your church is accused of overworking and underpaying its staff.', consequence: 'Lose 1 Staff, gain 1 Fame card and 1 Complaint card', expansion: 'base' },
    { id: 'spirit-48', text: "A change in your church's service format leads to a decline in attendance.", consequence: 'Lose 1 Family, gain 1 Fame card and 1 Complaint card', expansion: 'base' },
    { id: 'spirit-49', text: 'A controversial billboard advertising your church sparks a heated debate.', consequence: 'Lose 1 Family, gain 1 Fame card and 1 Complaint card', expansion: 'base' },
    { id: 'spirit-50', text: 'A recovery program at your church is criticized for being too focused on conversion rather than healing.', consequence: 'Lose 1 Staff, gain 1 Fame card and 1 Complaint card', expansion: 'base' },
    { id: 'spirit-51', text: "Your church's evangelism methods are accused of being manipulative.", consequence: 'Lose 1 Family, gain 1 Fame card and 1 Complaint card', expansion: 'base' },
    { id: 'spirit-52', text: 'A controversial tweet from your church goes viral, leading to a PR disaster.', consequence: 'Lose 1 Family, gain 1 Fame card and 1 Complaint card', expansion: 'base' },
    { id: 'spirit-53', text: 'Your church is accused of catering to celebrity members while neglecting the needs of the congregation.', consequence: 'Lose 1 Staff, gain 1 Fame card and 1 Complaint card', expansion: 'base' },
    { id: 'spirit-54', text: "Your church's abstinence-only sex education program is criticized for being unrealistic and harmful.", consequence: 'Lose 1 Family, gain 1 Fame card and 1 Complaint card', expansion: 'base' }
];

// Default Choice Cards
const DEFAULT_CHOICE_CARDS = [
    // Original cards from first table
    {
        id: 'choice-1',
        text: 'An outbreak of Dungeons and Dragons appears in your youth group. Some families are concerned that their children are exposing themselves to evil spirits. What do you do?',
        choiceA: { text: 'Tell the parents they have nothing to worry about', consequence: 'Lose 2 Family Tokens, Gain 6 Youth Tokens, Gain 1 Complaint Card' },
        choiceB: { text: "Renounce D&D on your church's Twitter page", consequence: 'Lose 6 Youth, gain 1 Family & 1 Grandparent, set endurance to 1' },
        expansion: 'base'
    },
    {
        id: 'choice-2',
        text: "A young person asks, 'Why is there suffering in the world?' How do you answer?",
        choiceA: { text: 'God has mysterious ways', consequence: 'Lose 4 Youth and gain 1 Endurance' },
        choiceB: { text: "I don't really know", consequence: 'Lose 1 Elder and gain a Complaint card' },
        expansion: 'base'
    },
    {
        id: 'choice-3',
        text: 'A member of the Transgender community wishes to be baptised. Your congregation has conflicting views on the subject and rumours are starting to spread. What do you do?',
        choiceA: { text: 'Allow them to be baptised publicly', consequence: 'Lose 3 church pieces, lose 1 Elder, gain 6 Youth, gain 2 Fame' },
        choiceB: { text: 'Do not allow them to be baptised', consequence: 'Gain 1 Elder, Gain 1 Complaint card, lose 4 Youth, lose 2 Staff, lose a Fame card' },
        expansion: 'base'
    },
    {
        id: 'choice-4',
        text: "You've been reading up on Spiral Dynamics. Choose the colour you would like your congregation to be striving for.",
        choiceA: { text: 'Blue', consequence: 'Lose 3 Youth, gain 1 Endurance' },
        choiceB: { text: 'Orange', consequence: 'Lose 1 Elder, gain 2 Staff, gain 1 Fame' },
        expansion: 'base'
    },
    {
        id: 'choice-5',
        text: 'Your church website is being updated. You need to decide what goes on the front of the site.',
        choiceA: { text: "Drone shots of the church campus behind the title 'Welcome home'", consequence: 'Gain 3 Youth, lose 1 Grandparent' },
        choiceB: { text: "Images of the church's mission work", consequence: 'Gain 1 Staff, lose 1 Fame card' },
        expansion: 'base'
    },

    // Additional Choice Cards from second table
    {
        id: 'choice-6',
        text: 'Your church is hosting a community event, but it coincides with an important family commitment.',
        choiceA: { text: 'Reschedule the event', consequence: 'Gain 1 Family and 1 Young Person' },
        choiceB: { text: 'Attend the family commitment', consequence: 'Gain 1 Endurance and 1 Family' },
        expansion: 'base'
    },
    {
        id: 'choice-7',
        text: 'A local politician requests to speak at your church.',
        choiceA: { text: 'Allow them to speak', consequence: 'Gain 1 Fame card and 1 Complaint card' },
        choiceB: { text: 'Politely decline', consequence: 'Gain 1 Staff and 1 Endurance' },
        expansion: 'base'
    },
    {
        id: 'choice-8',
        text: 'A controversial book is gaining popularity among your congregation members.',
        choiceA: { text: 'Address it in a sermon', consequence: 'Gain 1 Elder and 1 Complaint card' },
        choiceB: { text: 'Host a book discussion', consequence: 'Gain 1 Staff and 1 Endurance' },
        expansion: 'base'
    },
    {
        id: 'choice-9',
        text: 'A new family is interested in joining your church, but they have some unconventional beliefs.',
        choiceA: { text: 'Welcome them without reservation', consequence: 'Gain 1 Family and 1 Complaint card' },
        choiceB: { text: 'Discuss their beliefs before they join', consequence: 'Gain 1 Endurance and 1 Staff' },
        expansion: 'base'
    },
    {
        id: 'choice-10',
        text: 'You are asked to mediate a disagreement between two church members.',
        choiceA: { text: 'Step in and help them find a resolution', consequence: 'Gain 1 Family and 1 Endurance' },
        choiceB: { text: 'Encourage them to work it out on their own', consequence: 'Gain 1 Staff and 1 Complaint card' },
        expansion: 'base'
    },
    {
        id: 'choice-11',
        text: 'A local business offers to sponsor your church event in exchange for advertising.',
        choiceA: { text: 'Accept the sponsorship', consequence: 'Gain 1 Church piece and 1 Complaint card' },
        choiceB: { text: 'Decline the sponsorship', consequence: 'Gain 1 Endurance and 1 Staff' },
        expansion: 'base'
    },
    {
        id: 'choice-12',
        text: "Your church's annual budget is tight, and you must decide which ministry to cut back.",
        choiceA: { text: 'Reduce the youth ministry budget', consequence: 'Gain 1 Elder, lose 1 Young Person' },
        choiceB: { text: 'Reduce the missions budget', consequence: 'Gain 1 Staff' },
        expansion: 'base'
    },
    {
        id: 'choice-13',
        text: 'A talented musician in your congregation wants to join the worship team but struggles with punctuality.',
        choiceA: { text: 'Allow them to join', consequence: 'Gain 1 Young Person and 1 Complaint card' },
        choiceB: { text: 'Ask them to improve punctuality before joining', consequence: 'Gain 1 Endurance and 1 Staff' },
        expansion: 'base'
    },
    {
        id: 'choice-14',
        text: 'Your church has the opportunity to host a popular Christian conference.',
        choiceA: { text: 'Host the conference', consequence: 'Gain 1 Fame card, 1 Grandparent, and 1 Complaint card' },
        choiceB: { text: 'Decline the opportunity', consequence: 'Gain 1 Endurance and 1 Staff' },
        expansion: 'base'
    },
    {
        id: 'choice-15',
        text: 'A member of your congregation confesses a serious moral failing.',
        choiceA: { text: 'Offer guidance and support', consequence: 'Gain 1 Endurance and 1 Family' },
        choiceB: { text: 'Ask them to step down from their leadership position', consequence: 'Gain 1 Elder and 1 Complaint card' },
        expansion: 'base'
    },
    {
        id: 'choice-16',
        text: 'Your church is considering starting a new outreach program but it will require significant resources.',
        choiceA: { text: 'Proceed with the program', consequence: 'Gain 1 Church piece and 1 Complaint card' },
        choiceB: { text: 'Hold off on starting the program', consequence: 'Gain 1 Endurance and 1 Staff' },
        expansion: 'base'
    },
    {
        id: 'choice-17',
        text: "A neighboring church asks to borrow your church's sound equipment for an event.",
        choiceA: { text: 'Lend the equipment', consequence: 'Gain 1 Elder and 1 Young Person' },
        choiceB: { text: 'Decline the request', consequence: 'Gain 1 Staff and 1 Complaint card' },
        expansion: 'base'
    },
    {
        id: 'choice-18',
        text: 'A couple in your congregation is going through a difficult divorce.',
        choiceA: { text: 'Offer pastoral counseling', consequence: 'Gain 1 Family and 1 Endurance' },
        choiceB: { text: 'Refer them to a professional counselor', consequence: 'Gain 1 Staff and 1 Complaint card' },
        expansion: 'base'
    },
    {
        id: 'choice-19',
        text: 'A guest speaker at your church promotes a theology you disagree with.',
        choiceA: { text: 'Publicly address your disagreement', consequence: 'Gain 1 Elder and 1 Complaint card' },
        choiceB: { text: 'Discuss the issue privately with the speaker', consequence: 'Gain 1 Endurance and 1 Staff' },
        expansion: 'base'
    },
    {
        id: 'choice-20',
        text: 'Your church is experiencing a financial shortfall.',
        choiceA: { text: 'Address the issue in a sermon', consequence: 'Gain 1 Elder and 1 Complaint card' },
        choiceB: { text: 'Launch a fundraising campaign', consequence: 'Gain 1 Family and 1 Staff' },
        expansion: 'base'
    },
    {
        id: 'choice-21',
        text: 'The church building needs a costly repair.',
        choiceA: { text: 'Use church funds', consequence: 'Gain 1 Church piece and 1 Complaint card' },
        choiceB: { text: 'Organize a fundraising event', consequence: 'Gain 1 Endurance and 1 Grandparent' },
        expansion: 'base'
    },
    {
        id: 'choice-22',
        text: 'A member of your congregation asks for financial assistance.',
        choiceA: { text: "Provide aid from the church's benevolence fund", consequence: 'Gain 1 Family, lose 1 Church piece' },
        choiceB: { text: 'Encourage them to seek help from community resources', consequence: 'Gain 1 Staff and 1 Complaint card' },
        expansion: 'base'
    },
    {
        id: 'choice-23',
        text: 'Your church is considering implementing a more contemporary worship style.',
        choiceA: { text: 'Embrace the change', consequence: 'Gain 2 Young Persons and 1 Complaint card' },
        choiceB: { text: 'Stick to traditional worship', consequence: 'Gain 1 Grandparent and 1 Complaint card' },
        expansion: 'base'
    },
    {
        id: 'choice-24',
        text: 'Your congregation is divided over a controversial social issue.',
        choiceA: { text: 'Preach a sermon addressing the issue', consequence: 'Gain 1 Elder and 1 Complaint card' },
        choiceB: { text: 'Host a discussion group to facilitate conversation', consequence: 'Gain 1 Staff and 1 Endurance' },
        expansion: 'base'
    },
    {
        id: 'choice-25',
        text: 'A member of the congregation has a unique skill they want to share during Sunday service.',
        choiceA: { text: 'Allow them to showcase their skill', consequence: 'Gain 1 Family and 1 Complaint card' },
        choiceB: { text: 'Politely decline the offer', consequence: 'Gain 1 Endurance and 1 Staff' },
        expansion: 'base'
    },
    {
        id: 'choice-26',
        text: 'A journalist wants to write a profile about your church and its impact on the community.',
        choiceA: { text: 'Agree to the interview', consequence: 'Gain 1 Fame card and 1 Complaint card' },
        choiceB: { text: 'Decline the interview', consequence: 'Gain 1 Endurance and 1 Staff' },
        expansion: 'base'
    },
    {
        id: 'choice-27',
        text: "Your church's annual picnic is approaching, but the weather forecast looks unfavorable.",
        choiceA: { text: 'Proceed with the picnic as planned', consequence: 'Gain 1 Family, lose 1 Endurance' },
        choiceB: { text: 'Reschedule the picnic', consequence: 'Gain 1 Staff and 1 Complaint card' },
        expansion: 'base'
    },
    {
        id: 'choice-28',
        text: 'A guest preacher is scheduled to speak at your church, but their travel plans fall through at the last minute.',
        choiceA: { text: 'Preach in their place', consequence: 'Gain 1 Elder and 1 Endurance' },
        choiceB: { text: 'Organize a panel discussion with church leaders', consequence: 'Gain 1 Staff and 1 Family' },
        expansion: 'base'
    },
    {
        id: 'choice-29',
        text: 'Your church is considering partnering with a local charity for a community service project.',
        choiceA: { text: 'Agree to the partnership', consequence: 'Gain 1 Church piece and 1 Complaint card' },
        choiceB: { text: 'Decline the partnership', consequence: 'Gain 1 Endurance and 1 Staff' },
        expansion: 'base'
    },
    {
        id: 'choice-30',
        text: 'A young adult in the congregation is struggling with their faith and has questions.',
        choiceA: { text: 'Meet with them to discuss their doubts', consequence: 'Gain 1 Young Person and 1 Endurance' },
        choiceB: { text: 'Encourage them to join a small group to explore their faith', consequence: 'Gain 1 Staff and 1 Complaint card' },
        expansion: 'base'
    },
    {
        id: 'choice-31',
        text: 'A gay couple requests to have their wedding at your church.',
        choiceA: { text: 'Officiate the wedding', consequence: 'Gain 2 Families and 2 Complaint cards' },
        choiceB: { text: 'Decline the request', consequence: 'Gain 1 Elder and 1 Complaint card' },
        expansion: 'base'
    },
    {
        id: 'choice-32',
        text: 'A woman from your congregation feels called to ministry.',
        choiceA: { text: 'Encourage her', consequence: 'Gain 1 Staff and 1 Complaint card' },
        choiceB: { text: 'Discourage her', consequence: 'Gain 1 Elder and 1 Complaint card' },
        expansion: 'base'
    },
    {
        id: 'choice-33',
        text: 'A popular worship leader offers to perform at your church, but their theology is questionable.',
        choiceA: { text: 'Accept the offer', consequence: 'Gain 1 Fame card and 1 Complaint card' },
        choiceB: { text: 'Decline the offer', consequence: 'Gain 1 Endurance and 1 Family' },
        expansion: 'base'
    },
    {
        id: 'choice-34',
        text: 'A congregant claims to have the gift of prophecy, but their prophecies are causing unrest.',
        choiceA: { text: 'Embrace their gift', consequence: 'Gain 1 Fame card and 1 Complaint card' },
        choiceB: { text: 'Dismiss their claims', consequence: 'Gain 1 Endurance and 1 Staff' },
        expansion: 'base'
    },
    {
        id: 'choice-35',
        text: 'A wealthy member offers a large donation in exchange for influence in the church.',
        choiceA: { text: 'Accept the donation', consequence: 'Gain 2 Church pieces and 1 Complaint card' },
        choiceB: { text: 'Decline the donation', consequence: 'Gain 1 Endurance and 1 Family' },
        expansion: 'base'
    },
    {
        id: 'choice-36',
        text: 'A small group at your church wants to start a "deconstructing faith" discussion.',
        choiceA: { text: 'Support the group', consequence: 'Gain 1 Family and 1 Complaint card' },
        choiceB: { text: 'Shut down the group', consequence: 'Gain 1 Elder and 1 Complaint card' },
        expansion: 'base'
    },
    {
        id: 'choice-37',
        text: 'Your church is invited to participate in an interfaith event.',
        choiceA: { text: 'Attend the event', consequence: 'Gain 1 Family and 1 Complaint card' },
        choiceB: { text: 'Decline the invitation', consequence: 'Gain 1 Elder and 1 Complaint card' },
        expansion: 'base'
    },
    {
        id: 'choice-38',
        text: 'Your church has the opportunity to partner with a local social justice organization.',
        choiceA: { text: 'Partner with them', consequence: 'Gain 1 Church piece and 1 Complaint card' },
        choiceB: { text: 'Decline the partnership', consequence: 'Gain 1 Endurance and 1 Staff' },
        expansion: 'base'
    },
    {
        id: 'choice-39',
        text: 'The youth group plans a lock-in event, but some parents are concerned about supervision.',
        choiceA: { text: 'Allow the event', consequence: 'Gain 2 Young Persons and 1 Complaint card' },
        choiceB: { text: 'Cancel the event', consequence: 'Gain 1 Family and 1 Complaint card' },
        expansion: 'base'
    },
    {
        id: 'choice-40',
        text: "A parent complains about the lack of age-appropriate children's ministry.",
        choiceA: { text: 'Invest in improvements', consequence: 'Gain 1 Family and 1 Church Piece' },
        choiceB: { text: 'Ignore the complaint', consequence: 'Gain 1 Elder and 1 Complaint card' },
        expansion: 'base'
    },
    {
        id: 'choice-41',
        text: 'Your church is accused of perpetuating white privilege.',
        choiceA: { text: 'Address the issue head-on', consequence: 'Gain 1 Family and 1 Complaint card' },
        choiceB: { text: 'Ignore the criticism', consequence: 'Gain 1 Elder and 1 Complaint card' },
        expansion: 'base'
    },
    {
        id: 'choice-42',
        text: 'A staff member is caught in a scandal.',
        choiceA: { text: 'Fire them', consequence: 'Gain 1 Elder and 1 Complaint card' },
        choiceB: { text: 'Stand by them', consequence: 'Gain 1 Staff and 1 Complaint card' },
        expansion: 'base'
    },
    {
        id: 'choice-43',
        text: "Some congregants complain that your church's service is too long.",
        choiceA: { text: 'Shorten the service', consequence: 'Gain 1 Family and 1 Complaint card' },
        choiceB: { text: 'Keep the service as-is', consequence: 'Gain 1 Elder and 1 Complaint card' },
        expansion: 'base'
    },
    {
        id: 'choice-44',
        text: "Your church's new marketing campaign is met with mixed reactions.",
        choiceA: { text: 'Continue the campaign', consequence: 'Gain 1 Fame card and 1 Complaint card' },
        choiceB: { text: 'Pull the campaign', consequence: 'Gain 1 Endurance and 1 Staff' },
        expansion: 'base'
    },
    {
        id: 'choice-45',
        text: 'A member of your congregation is struggling with addiction.',
        choiceA: { text: 'Offer support and resources', consequence: 'Gain 1 Family and 1 Complaint card' },
        choiceB: { text: 'Encourage them to find help elsewhere', consequence: 'Gain 1 Elder and 1 Complaint card' },
        expansion: 'base'
    },
    {
        id: 'choice-46',
        text: "A congregant questions your church's exclusive view on salvation.",
        choiceA: { text: 'Engage in open dialogue', consequence: 'Gain 1 Family and 1 Complaint card' },
        choiceB: { text: 'Shut down the conversation', consequence: 'Gain 1 Elder and 1 Complaint card' },
        expansion: 'base'
    },
    {
        id: 'choice-47',
        text: "Your church's social media presence is criticized for being tone-deaf.",
        choiceA: { text: 'Hire a social media manager', consequence: 'Gain 1 Staff and 1 Complaint card' },
        choiceB: { text: 'Ignore the criticism', consequence: 'Gain 1 Elder and 1 Complaint card' },
        expansion: 'base'
    },
    {
        id: 'choice-48',
        text: 'A celebrity wants to join your church, but their lifestyle contradicts your beliefs.',
        choiceA: { text: 'Welcome them', consequence: 'Gain 1 Fame card and 1 Complaint card' },
        choiceB: { text: 'Turn them away', consequence: 'Gain 1 Endurance and 1 Family' },
        expansion: 'base'
    },
    {
        id: 'choice-49',
        text: 'A church leader is caught in a sex scandal.',
        choiceA: { text: 'Remove them from leadership', consequence: 'Gain 1 Elder and 1 Complaint card' },
        choiceB: { text: 'Stand by them', consequence: 'Gain 1 Staff and 1 Complaint card' },
        expansion: 'base'
    }
];

// Data Storage Manager
class DataManager {
    constructor() {
        this.storageKeys = {
            expansions: 'deconstruction_expansions',
            spiritCards: 'deconstruction_spirit_cards',
            choiceCards: 'deconstruction_choice_cards',
            fameCards: 'deconstruction_fame_cards',
            drawnCards: 'deconstruction_drawn_cards'
        };
        this.initializeData();
    }

    initializeData() {
        // Initialize expansions if not present
        if (!localStorage.getItem(this.storageKeys.expansions)) {
            localStorage.setItem(this.storageKeys.expansions, JSON.stringify(DEFAULT_EXPANSIONS));
        }

        // Initialize spirit cards if not present
        if (!localStorage.getItem(this.storageKeys.spiritCards)) {
            localStorage.setItem(this.storageKeys.spiritCards, JSON.stringify(DEFAULT_SPIRIT_CARDS));
        }

        // Initialize choice cards if not present
        if (!localStorage.getItem(this.storageKeys.choiceCards)) {
            localStorage.setItem(this.storageKeys.choiceCards, JSON.stringify(DEFAULT_CHOICE_CARDS));
        }

        // Initialize fame cards if not present
        if (!localStorage.getItem(this.storageKeys.fameCards)) {
            localStorage.setItem(this.storageKeys.fameCards, JSON.stringify(DEFAULT_FAME_CARDS));
        }

        // Initialize drawn cards tracking
        if (!localStorage.getItem(this.storageKeys.drawnCards)) {
            localStorage.setItem(this.storageKeys.drawnCards, JSON.stringify({ spirit: [], choice: [] }));
        }
    }

    // Expansion Methods
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

        // Remove cards from this expansion
        let spiritCards = this.getSpiritCards();
        spiritCards = spiritCards.filter(c => c.expansion !== id);
        localStorage.setItem(this.storageKeys.spiritCards, JSON.stringify(spiritCards));

        let choiceCards = this.getChoiceCards();
        choiceCards = choiceCards.filter(c => c.expansion !== id);
        localStorage.setItem(this.storageKeys.choiceCards, JSON.stringify(choiceCards));
    }

    // Spirit Card Methods
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

    // Choice Card Methods
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

    // Fame Card Methods
    getFameCards() {
        return JSON.parse(localStorage.getItem(this.storageKeys.fameCards)) || [];
    }

    saveFameCard(card) {
        const cards = this.getFameCards();
        const existingIndex = cards.findIndex(c => c.id === card.id);

        if (existingIndex >= 0) {
            cards[existingIndex] = card;
        } else {
            card.id = 'fame-' + Date.now();
            cards.push(card);
        }

        localStorage.setItem(this.storageKeys.fameCards, JSON.stringify(cards));
        return card;
    }

    deleteFameCard(id) {
        let cards = this.getFameCards();
        cards = cards.filter(c => c.id !== id);
        localStorage.setItem(this.storageKeys.fameCards, JSON.stringify(cards));
    }

    // Card Drawing Methods
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
        let cards;

        if (type === 'spirit') {
            cards = this.getSpiritCards();
        } else {
            cards = this.getChoiceCards();
        }

        // Filter by active expansions
        cards = cards.filter(c => activeExpansions.includes(c.expansion));

        // Filter out already drawn cards
        cards = cards.filter(c => !drawn[type].includes(c.id));

        return cards;
    }

    drawRandomCard(type, activeExpansions) {
        const available = this.getAvailableCards(type, activeExpansions);

        if (available.length === 0) {
            // Reset the deck if all cards have been drawn
            this.resetDrawnCards(type);
            return this.drawRandomCard(type, activeExpansions);
        }

        const randomIndex = Math.floor(Math.random() * available.length);
        const card = available[randomIndex];

        this.markCardDrawn(type, card.id);

        return card;
    }

    // Reset all data to defaults
    resetToDefaults() {
        localStorage.setItem(this.storageKeys.expansions, JSON.stringify(DEFAULT_EXPANSIONS));
        localStorage.setItem(this.storageKeys.spiritCards, JSON.stringify(DEFAULT_SPIRIT_CARDS));
        localStorage.setItem(this.storageKeys.choiceCards, JSON.stringify(DEFAULT_CHOICE_CARDS));
        localStorage.setItem(this.storageKeys.fameCards, JSON.stringify(DEFAULT_FAME_CARDS));
        this.resetDrawnCards();
    }
}

// Create global instance
const dataManager = new DataManager();
