/**
 * WORDLE CLONE - WORD MANAGEMENT
 * 
 * This file contains:
 * - A curated list of valid 5-letter words for the game
 * - Utility functions for word validation and selection
 * - Functions students can use in their implementation
 */

// List of valid 5-letter words for Wordle
// This is a curated subset of common English words
const VALID_WORDS = [
    "ABOUT", "ABOVE", "ABUSE", "ACTOR", "ACUTE", "ADMIT", "ADOPT", "ADULT", "AFTER", "AGAIN",
    "AGENT", "AGREE", "AHEAD", "ALARM", "ALBUM", "ALERT", "ALIEN", "ALIGN", "ALIKE", "ALIVE",
    "ALLOW", "ALONE", "ALONG", "ALTER", "AMONG", "ANGER", "ANGLE", "ANGRY", "APART", "APPLE",
    "APPLY", "ARENA", "ARGUE", "ARISE", "ARRAY", "ARROW", "ASIDE", "ASSET", "AUDIO", "AUDIT",
    "AVOID", "AWAKE", "AWARD", "AWARE", "BADLY", "BAKER", "BASES", "BASIC", "BEACH", "BEGAN",
    "BEGIN", "BEING", "BELOW", "BENCH", "BILLY", "BIRTH", "BLACK", "BLAME", "BLANK", "BLAST",
    "BLIND", "BLOCK", "BLOOD", "BOARD", "BOAST", "BOBBY", "BOOST", "BOOTH", "BOUND", "BRAIN",
    "BRAND", "BRASS", "BRAVE", "BREAD", "BREAK", "BREED", "BRIEF", "BRING", "BROAD", "BROKE",
    "BROWN", "BUILD", "BUILT", "BUYER", "CABLE", "CALIF", "CARRY", "CATCH", "CAUSE", "CHAIN",
    "CHAIR", "CHAOS", "CHARM", "CHART", "CHASE", "CHEAP", "CHECK", "CHEST", "CHIEF", "CHILD",
    "CHINA", "CHOSE", "CIVIL", "CLAIM", "CLASS", "CLEAN", "CLEAR", "CLICK", "CLIMB", "CLOCK",
    "CLOSE", "CLOUD", "COACH", "COAST", "COULD", "COUNT", "COURT", "COVER", "CRAFT", "CRASH",
    "CRAZY", "CREAM", "CRIME", "CROSS", "CROWD", "CROWN", "CRUDE", "CURVE", "CYCLE", "DAILY",
    "DANCE", "DATED", "DEALT", "DEATH", "DEBUT", "DELAY", "DEPTH", "DOING", "DOUBT", "DOZEN",
    "DRAFT", "DRAMA", "DRANK", "DRAWN", "DREAM", "DRESS", "DRILL", "DRINK", "DRIVE", "DROVE",
    "DYING", "EAGER", "EARLY", "EARTH", "EIGHT", "ELITE", "EMPTY", "ENEMY", "ENJOY", "ENTER",
    "ENTRY", "EQUAL", "ERROR", "EVENT", "EVERY", "EXACT", "EXIST", "EXTRA", "FAITH", "FALSE",
    "FAULT", "FIBER", "FIELD", "FIFTH", "FIFTY", "FIGHT", "FINAL", "FIRST", "FIXED", "FLASH",
    "FLEET", "FLOOR", "FLUID", "FOCUS", "FORCE", "FORTH", "FORTY", "FORUM", "FOUND", "FRAME",
    "FRANK", "FRAUD", "FRESH", "FRONT", "FRUIT", "FULLY", "FUNNY", "GIANT", "GIVEN", "GLASS",
    "GLOBE", "GOING", "GRACE", "GRADE", "GRAND", "GRANT", "GRASS", "GRAVE", "GREAT", "GREEN",
    "GROSS", "GROUP", "GROWN", "GUARD", "GUESS", "GUEST", "GUIDE", "HAPPY", "HARRY", "HEART",
    "HEAVY", "HENCE", "HENRY", "HORSE", "HOTEL", "HOUSE", "HUMAN", "IDEAL", "IMAGE", "INDEX",
    "INNER", "INPUT", "ISSUE", "JAPAN", "JIMMY", "JOINT", "JONES", "JUDGE", "KNOWN", "LABEL",
    "LARGE", "LASER", "LATER", "LAUGH", "LAYER", "LEARN", "LEASE", "LEAST", "LEAVE", "LEGAL",
    "LEVEL", "LEWIS", "LIGHT", "LIMIT", "LINKS", "LIVES", "LOCAL", "LOOSE", "LOWER", "LUCKY",
    "LUNCH", "LYING", "MAGIC", "MAJOR", "MAKER", "MARCH", "MARIA", "MATCH", "MAYBE", "MAYOR",
    "MEANT", "MEDIA", "METAL", "MIGHT", "MINOR", "MINUS", "MIXED", "MODEL", "MONEY", "MONTH",
    "MORAL", "MOTOR", "MOUNT", "MOUSE", "MOUTH", "MOVED", "MOVIE", "MUSIC", "NEEDS", "NEVER",
    "NEWLY", "NIGHT", "NOISE", "NORTH", "NOTED", "NOVEL", "NURSE", "OCCUR", "OCEAN", "OFFER",
    "OFTEN", "ORDER", "OTHER", "OUGHT", "PAINT", "PANEL", "PAPER", "PARTY", "PEACE", "PETER",
    "PHASE", "PHONE", "PHOTO", "PIANO", "PIECE", "PILOT", "PITCH", "PLACE", "PLAIN", "PLANE",
    "PLANT", "PLATE", "POINT", "POUND", "POWER", "PRESS", "PRICE", "PRIDE", "PRIME", "PRINT",
    "PRIOR", "PRIZE", "PROOF", "PROUD", "PROVE", "QUEEN", "QUICK", "QUIET", "QUITE", "RADIO",
    "RAISE", "RANGE", "RAPID", "RATIO", "REACH", "READY", "REALM", "REBEL", "REFER", "RELAX",
    "REPAY", "REPLY", "RIGHT", "RIGID", "RIVAL", "RIVER", "ROBIN", "ROGER", "ROMAN", "ROUGH",
    "ROUND", "ROUTE", "ROYAL", "RURAL", "SCALE", "SCENE", "SCOPE", "SCORE", "SENSE", "SERVE",
    "SEVEN", "SHALL", "SHAPE", "SHARE", "SHARP", "SHEET", "SHELF", "SHELL", "SHIFT", "SHINE",
    "SHIRT", "SHOCK", "SHOOT", "SHORT", "SHOWN", "SIGHT", "SILLY", "SINCE", "SIXTH", "SIXTY",
    "SIZED", "SKILL", "SLEEP", "SLIDE", "SMALL", "SMART", "SMILE", "SMITH", "SMOKE", "SOLID",
    "SOLVE", "SORRY", "SOUND", "SOUTH", "SPACE", "SPARE", "SPEAK", "SPEED", "SPEND", "SPENT",
    "SPLIT", "SPOKE", "SPORT", "STAFF", "STAGE", "STAKE", "STAND", "START", "STATE", "STEAM",
    "STEEL", "STICK", "STILL", "STOCK", "STONE", "STOOD", "STORE", "STORM", "STORY", "STRIP",
    "STUCK", "STUDY", "STUFF", "STYLE", "SUGAR", "SUITE", "SUPER", "SWEET", "TABLE", "TAKEN",
    "TASTE", "TAXES", "TEACH", "TEAMS", "TEETH", "TERRY", "TEXAS", "THANK", "THEFT", "THEIR",
    "THEME", "THERE", "THESE", "THICK", "THING", "THINK", "THIRD", "THOSE", "THREE", "THREW",
    "THROW", "THUMB", "THUS", "TIGHT", "TIRED", "TITLE", "TODAY", "TOPIC", "TOTAL", "TOUCH",
    "TOUGH", "TOWER", "TRACK", "TRADE", "TRAIN", "TREAT", "TREND", "TRIAL", "TRIBE", "TRICK",
    "TRIED", "TRIES", "TRUCK", "TRULY", "TRUNK", "TRUST", "TRUTH", "TWICE", "TWIST", "TYLER",
    "UNDER", "UNDUE", "UNION", "UNITY", "UNTIL", "UPPER", "UPSET", "URBAN", "USAGE", "USUAL",
    "VALID", "VALUE", "VIDEO", "VIRUS", "VISIT", "VITAL", "VOCAL", "VOICE", "WASTE", "WATCH",
    "WATER", "WHEEL", "WHERE", "WHICH", "WHILE", "WHITE", "WHOLE", "WHOSE", "WOMAN", "WOMEN",
    "WORLD", "WORRY", "WORSE", "WORST", "WORTH", "WOULD", "WRITE", "WRONG", "WROTE", "YOUNG",
    "YOUTH", "ABOVE", "ACUTE", "ALIVE", "ALONE", "ANGER", "APPLE", "ARENA", "ARGUE", "ASIDE",
    "ASSET", "AVOID", "AWAKE", "AWARE", "BADLY", "BAKER", "BASIC", "BEACH", "BEGAN", "BEING",
    "BELOW", "BENCH", "BIRTH", "BLACK", "BLANK", "BLAST", "BLIND", "BLOCK", "BLOOD", "BOARD",
    "BOOST", "BOOTH", "BOUND", "BRAIN", "BRAND", "BRAVE", "BREAD", "BREAK", "BREED", "BRIEF",
    "BRING", "BROAD", "BROKE", "BROWN", "BUILD", "BUILT", "BUYER", "CABLE", "CARRY", "CATCH",
    "CAUSE", "CHAIN", "CHAIR", "CHAOS", "CHARM", "CHART", "CHASE", "CHEAP", "CHECK", "CHEST",
    "CHIEF", "CHILD", "CHINA", "CHOSE", "CIVIL", "CLAIM", "CLASS", "CLEAN", "CLEAR", "CLICK",
    "CLIMB", "CLOCK", "CLOSE", "CLOUD", "COACH", "COAST", "COULD", "COUNT", "COURT", "COVER",
    "CRAFT", "CRASH", "CRAZY", "CREAM", "CRIME", "CROSS", "CROWD", "CROWN", "CRUDE", "CURVE",
    "CYCLE", "DAILY", "DANCE", "DATED", "DEALT", "DEATH", "DEBUT", "DELAY", "DEPTH", "DOING",
    "DOUBT", "DOZEN", "DRAFT", "DRAMA", "DRANK", "DRAWN", "DREAM", "DRESS", "DRILL", "DRINK",
    "DRIVE", "DROVE", "DYING", "EAGER", "EARLY", "EARTH", "EIGHT", "ELITE", "EMPTY", "ENEMY",
    "ENJOY", "ENTER", "ENTRY", "EQUAL", "ERROR", "EVENT", "EVERY", "EXACT", "EXIST", "EXTRA",
    "FAITH", "FALSE", "FAULT", "FIBER", "FIELD", "FIFTH", "FIFTY", "FIGHT", "FINAL", "FIRST",
    "FIXED", "FLASH", "FLEET", "FLOOR", "FLUID", "FOCUS", "FORCE", "FORTH", "FORTY", "FORUM",
    "FOUND", "FRAME", "FRANK", "FRAUD", "FRESH", "FRONT", "FRUIT", "FULLY", "FUNNY", "GIANT",
    "GIVEN", "GLASS", "GLOBE", "GOING", "GRACE", "GRADE", "GRAND", "GRANT", "GRASS", "GRAVE",
    "GREAT", "GREEN", "GROSS", "GROUP", "GROWN", "GUARD", "GUESS", "GUEST", "GUIDE", "HAPPY",
    "HARRY", "HEART", "HEAVY", "HENCE", "HENRY", "HORSE", "HOTEL", "HOUSE", "HUMAN", "IDEAL"
];

// Additional common words for validation (students can guess these but they won't be answers)
const ADDITIONAL_VALID_WORDS = [
    "ERASE","LLLKL",
    "ABACK", "ABASE", "ABATE", "ABBEY", "ABBOT", "ABHOR", "ABIDE", "ABLED", "ABODE", "ABORT",
    "ABOUND", "ABRUPT", "ABSURD", "ACCENT", "ACCEPT", "ACCESS", "ACCORD", "ACCRUE", "ACCUSE", "ACHED",
    "ACIDS", "ACORN", "ACRES", "ACTED", "ACTOR", "ADDED", "ADDER", "ADEPT", "ADMIN", "ADOBE",
    "ADOPT", "ADORE", "ADULT", "AFTER", "AGAIN", "AGENT", "AGREE", "AHEAD", "AIDED", "AIMED",
    "AIRED", "AISLE", "ALARM", "ALBUM", "ALERT", "ALIAS", "ALIEN", "ALIGN", "ALIKE", "ALIVE",
    "ALLEY", "ALLOT", "ALLOW", "ALLOY", "ALONE", "ALONG", "ALOOF", "ALOUD", "ALPHA", "ALTAR",
    "ALTER", "AMAZE", "AMBER", "AMBLE", "AMEND", "AMISS", "AMITY", "AMONG", "AMPLE", "AMPLY",
    "AMUSE", "ANGEL", "ANGER", "ANGLE", "ANGRY", "ANGST", "ANIME", "ANKLE", "ANNEX", "ANNOY",
    "ANNUL", "ANODE", "ANTIC", "ANTSY", "ANVIL", "AORTA", "APART", "APHID", "APING", "APNEA",
    "APPLE", "APPLY", "ARENA", "ARGUE", "ARISE", "ARMED", "ARMOR", "AROMA", "AROSE", "ARRAY",
    "ARROW", "ARSON", "ARTSY", "ASCOT", "ASHEN", "ASHES", "ASIDE", "ASKED", "ASPEN", "ASSET",
    "ATOLL", "ATOM", "ATONE", "ATTIC", "AUDIO", "AUDIT", "AUGUR", "AUNTY", "AVAIL", "AVERT",
    "AVIAN", "AVOID", "AWAKE", "AWARD", "AWARE", "AWASH", "AWFUL", "AWOKE", "AXIAL", "AXIOM",
    "AXION", "AZURE", "BACON", "BADGE", "BADLY", "BAGEL", "BAGGY", "BAKER", "BALER", "BALMY",
    "BANAL", "BANJO", "BARGE", "BARON", "BASAL", "BASED", "BASER", "BASIC", "BASIL", "BASIN",
    "BASIS", "BASTE", "BATCH", "BATHE", "BATON", "BATTY", "BAWDY", "BAYOU", "BEACH", "BEADY"
];

// Combine all valid words for checking guesses
const ALL_VALID_WORDS = [...VALID_WORDS, ...ADDITIONAL_VALID_WORDS];

/**
 * Get a random word from the valid words list
 * Students will use this in their initializeGame() function
 * @returns {string} A random 5-letter word in uppercase
 */
function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * VALID_WORDS.length);
    return VALID_WORDS[randomIndex];
}

/**
 * Check if a word is valid (exists in our dictionary)
 * Students will use this to validate guesses
 * @param {string} word - The word to check (will be converted to uppercase)
 * @returns {boolean} True if the word is valid, false otherwise
 */
function isValidWord(word) {
    if (!word || typeof word !== 'string') {
        return false;
    }
    
    const upperWord = word.toUpperCase().trim();
    
    // Check if it's exactly 5 letters
    if (upperWord.length !== 5) {
        return false;
    }
    
    // Check if it contains only letters
    if (!/^[A-Z]+$/.test(upperWord)) {
        return false;
    }
    
    // Check if it's in our valid words list
    return ALL_VALID_WORDS.includes(upperWord);
}

/**
 * Get the total count of available words
 * @returns {number} The number of possible answer words
 */
function getWordCount() {
    return VALID_WORDS.length;
}

/**
 * Get a word by index (useful for testing)
 * @param {number} index - The index of the word to get
 * @returns {string|null} The word at the given index, or null if invalid index
 */
function getWordByIndex(index) {
    if (index < 0 || index >= VALID_WORDS.length) {
        return null;
    }
    return VALID_WORDS[index];
}

/**
 * Check if a letter exists in a word (case insensitive)
 * Utility function for students to use in their implementations
 * @param {string} letter - The letter to check for
 * @param {string} word - The word to check in
 * @returns {boolean} True if the letter exists in the word
 */
function letterInWord(letter, word) {
    if (!letter || !word) {
        return false;
    }
    return word.toUpperCase().includes(letter.toUpperCase());
}

/**
 * Count occurrences of a letter in a word
 * Useful for handling duplicate letters correctly
 * @param {string} letter - The letter to count
 * @param {string} word - The word to count in
 * @returns {number} The number of times the letter appears
 */
function countLetter(letter, word) {
    if (!letter || !word) {
        return 0;
    }
    
    const upperLetter = letter.toUpperCase();
    const upperWord = word.toUpperCase();
    
    return upperWord.split('').filter(char => char === upperLetter).length;
}

// Export functions for use in other files
// (In a real module system, you'd use export statements)
window.WordleWords = {
    getRandomWord,
    isValidWord,
    getWordCount,
    getWordByIndex,
    letterInWord,
    countLetter,
    VALID_WORDS,
    ALL_VALID_WORDS
}; 