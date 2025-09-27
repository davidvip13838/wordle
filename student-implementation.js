/**
 * WORDLE CLONE - STUDENT IMPLEMENTATION
 * 
 * Complete the functions below to create a working Wordle game.
 * Each function has specific requirements and point values.
 * 
 * GRADING BREAKDOWN:
 * - Core Game Functions (60 points): initializeGame, handleKeyPress, submitGuess, checkLetter, updateGameState
 * - Advanced Features (30 points): updateKeyboardColors, processRowReveal, showEndGameModal, validateInput
 */

// ========================================
// CORE GAME FUNCTIONS (60 POINTS TOTAL)
// ========================================

/**hb
 * Initialize a new game
 * POINTS: 10
 * 
 * TODO: Complete this function to:
 * - Reset all game state variables
 * - Get a random word from the word list
 * - Clear the game board
 * - Hide any messages or modals
 */
function initializeGame() {
    // TODO: Reset game state variables
    currentWord = 'APPLE';  // Set this to a random word
    currentGuess = '';
    currentRow = 0;
    gameOver = false;
    gameWon = false;
    
    // TODO: Get a random word from the word list
    // HINT: Use WordleWords.getRandomWord()
    
    //currentWord = WordleWords.getRandomWord();
    
    // TODO: Reset the game board
    // HINT: Use resetBoard()
    resetBoard();
    // TODO: Hide any messages
    // HINT: Use hideModal() and ensure message element is hidden
    hideModal();
    console.log('Game initialized!'); // Remove this line when implementing
}

/**
 * Handle keyboard input
 * POINTS: 15
 * 
 * TODO: Complete this function to:
 * - Process letter keys (A-Z)
 * - Handle ENTER key for word submission
 * - Handle BACKSPACE for letter deletion
 * - Update the display when letters are added/removed
 */
function handleKeyPress(key) {
    // TODO: Check if game is over - if so, return early            
    if (gameOver) return;
    // TODO: Handle letter keys (A-Z)
    // HINT: Use regex /^[A-Z]$/ to test if key is a letter
    // HINT: Check if currentGuess.length < WORD_LENGTH before adding
    // HINT: Use getTile() and updateTileDisplay() to show the letter
    if (key.match(/^[A-Z]$/)) {
        if (currentGuess.length < WORD_LENGTH) {
            currentGuess += key;
            updateTileDisplay(getTile(currentRow, currentGuess.length - 1),key);
        }
    }
    
    // Handle BACKSPACE key
    if (key === 'BACKSPACE') {
        if (currentGuess.length > 0) {
            // Remove last letter from currentGuess
            currentGuess = currentGuess.slice(0, -1);
            // Clear the tile display for the removed letter
            updateTileDisplay(getTile(currentRow, currentGuess.length), '');
        }
        return;
    }
    
    // TODO: Handle ENTER key
    // HINT: Check if guess is complete using isGuessComplete()
    // HINT: Call submitGuess() if complete, show error message if not
    if (key === 'ENTER') {
        if (isGuessComplete()) {
            submitGuess();
        } else {
            showMessage('Not enough letters');
            shakeRow(currentRow);
        }
        return;
    }
    
    console.log('Key pressed:', key); // Remove this line when implementing
}

/**
 * Submit and process a complete guess
 * POINTS: 20
 * 
 * TODO: Complete this function to:
 * - Validate the guess is a real word
 * - Check each letter against the target word
 * - Update tile colors and keyboard
 * - Handle win/lose conditions
 */
function submitGuess() {
    // TODO: Validate guess is complete
    // HINT: Use isGuessComplete()
    
    // TODO: Validate guess is a real word
    if (!isValidWord(currentGuess)) {
        showMessage('Not valid word');
        shakeRow(currentRow);
        return;
    }
    // HINT: Use WordleWords.isValidWord()
    // HINT: Show error message and shake row if invalid
    
    // TODO: Check each letter and get results
    // HINT: Use checkLetter() for each position
    // HINT: Store results in an array
    let letter_states = [];
    
    // First pass: mark all correct letters
    for (let i = 0; i < currentGuess.length; i++) {
        if (currentGuess.charAt(i).toUpperCase() === currentWord.charAt(i).toUpperCase()) {
            letter_states[i] = 'correct';
        } else {
            letter_states[i] = null; // Will be filled in second pass
        }
    }
    
    // Second pass: handle present and absent letters with proper duplicate handling
    for (let i = 0; i < currentGuess.length; i++) {
        if (letter_states[i] === null) { // Not already marked as correct
            let guessLetter = currentGuess.charAt(i).toUpperCase();
            
            // Count how many times this letter appears in target (not already marked as correct)
            let targetCount = 0;
            for (let j = 0; j < currentWord.length; j++) {
                if (currentWord.charAt(j).toUpperCase() === guessLetter && letter_states[j] !== 'correct') {
                    targetCount++;
                }
            }
            
            // Count how many times this letter appears in guess (not already marked as correct)
            let guessCount = 0;
            for (let j = 0; j < currentGuess.length; j++) {
                if (currentGuess.charAt(j).toUpperCase() === guessLetter && letter_states[j] !== 'correct') {
                    guessCount++;
                }
            }
            
            // Determine if this letter should be marked as present
            if (targetCount > 0) {
                // Check if we haven't already used up all instances of this letter
                let usedCount = 0;
                for (let j = 0; j < i; j++) {
                    if (currentGuess.charAt(j).toUpperCase() === guessLetter && letter_states[j] === 'present') {
                        usedCount++;
                    }
                }
                
                if (usedCount < targetCount) {
                    letter_states[i] = 'present';
                } else {
                    letter_states[i] = 'absent';
                }
            } else {
                letter_states[i] = 'absent';
            }
        }
    }
     
    // TODO: Update tile colors immediately
    // HINT: Loop through results and use setTileState()
    for (let i = 0; i < currentGuess.length; i++) {
        setTileState(getTile(currentRow,i), letter_states[i]);
    }
    
    // TODO: Update keyboard colors
    // HINT: Call updateKeyboardColors()
    updateKeyboardColors();

    
    // TODO: Check if guess was correct
    // HINT: Compare currentGuess with currentWord
    let isCorrect = currentGuess.toUpperCase() === currentWord.toUpperCase();
    
    // TODO: Update game state
    // HINT: Call updateGameState()
    updateGameState(isCorrect);
    
    // TODO: Move to next row if game continues
    // HINT: Increment currentRow and reset currentGuess
    currentRow++;
    currentGuess = "";
    
    console.log('Guess submitted:', currentGuess); // Remove this line when implementing
}

/**
 * Check a single letter against the target word
 * POINTS: 10
 * 
 * TODO: Complete this function to:
 * - Return 'correct' if letter matches position exactly
 * - Return 'present' if letter exists but wrong position
 * - Return 'absent' if letter doesn't exist in target
 * - Handle duplicate letters correctly (this is the tricky part!)
 */
function checkLetter(guessLetter, position, targetWord) {
    // TODO: Convert inputs to uppercase for comparison
    guessLetter = guessLetter.toUpperCase();
    targetWord = targetWord.toUpperCase();
    
    // TODO: Check if letter is in correct position
    // HINT: Compare targetWord[position] with guessLetter
    if (guessLetter === targetWord[position]) {
        return 'correct';
    }
    
    // Check if letter exists elsewhere in target
    if (targetWord.includes(guessLetter)) {
        return 'present';
    }
    
    return 'absent';
}

/**
 * Update game state after a guess
 * POINTS: 5
 * 
 * TODO: Complete this function to:
 * - Check if player won (guess matches target)
 * - Check if player lost (used all attempts)
 * - Show appropriate  game modal
 */
function updateGameState(isCorrect) {
    // TODO: Handle win condition
    // HINT: Set gameWon and gameOver flags, call showEndGameModal
    if (isCorrect) {
        gameWon = true;
        gameOver = true;
        showEndGameModal();
        return;
    }
    
    // TODO: Handle lose condition  
    // HINT: Check if currentRow >= MAX_GUESSES - 1
    if (currentRow >= MAX_GUESSES - 1) {
        gameOver = true;
        showEndGameModal(false, currentWord);
    }
    
    console.log('Game state updated. Correct:', isCorrect); // Remove this line
}

// ========================================
// ADVANCED FEATURES (30 POINTS TOTAL)
// ========================================

/**
 * Update keyboard key colors based on guessed letters
 * POINTS: 10
 * 
 * TODO: Complete this function to:
 * - Update each key with appropriate color
 * - Maintain color priority (green > yellow > gray)
 * - Don't downgrade key colors
 */
function updateKeyboardColors(guess, results) {
    // TODO: Loop through each letter in the guess
    
    // TODO: Get the keyboard key element
    // HINT: Use document.querySelector with [data-key="LETTER"]
    
    // TODO: Apply color with priority system
    // HINT: Don't change green keys to yellow or gray
    // HINT: Don't change yellow keys to gray
    
    console.log('Updating keyboard colors for:', guess); // Remove this line
}

/**
 * Process row reveal (simplified - no animations needed)
 * POINTS: 5 (reduced from 15 since animations removed)
 * 
 * TODO: Complete this function to:
 * - Check if all letters were correct
 * - Trigger celebration if player won this round
 */
function processRowReveal(rowIndex, results) {
    // TODO: Check if all results are 'correct'
    // HINT: Use results.every() method
    
    // TODO: If all correct, trigger celebration
    // HINT: Use celebrateRow() function
    
    console.log('Processing row reveal for row:', rowIndex); // Remove this line
}

/**
 * Show end game modal with results
 * POINTS: 10
 * 
 * TODO: Complete this function to:
 * - Display appropriate win/lose message
 * - Show the target word
 * - Update game statistics
 */
function showEndGameModal(won, targetWord) {
    // TODO: Create appropriate message based on won parameter
    // HINT: For wins, include number of guesses used
    // HINT: For losses, reveal the target word
    if (won === true) {
        showMessage('You won!', 'success');
        updateStats(true);
        showModal(true, currentWord, currentRow + 1); // +1 because currentRow is 0-indexed
    }
    else {
        showMessage('Game Over!', 'error');
        updateStats(false);
        showModal(false, currentWord, MAX_GUESSES); // Show total attempts used
    }
    
    // TODO: Update statistics
    // HINT: Use updateStats() function
    // DONE: Called above

    
    // TODO: Show the modal
    // HINT: Use showModal() function
    // DONE: Called above
}

/**
 * Validate user input before processing
 * POINTS: 5
 * 
 * TODO: Complete this function to:
 * - Check if game is over
 * - Validate letter keys (only if guess not full)
 * - Validate ENTER key (only if guess complete)
 * - Validate BACKSPACE key (only if letters to remove)
 */
function validateInput(key, currentGuess) {
    // TODO: Return false if game is over
    
    // TODO: Handle letter keys
    // HINT: Check if currentGuess.length < WORD_LENGTH
    
    // TODO: Handle ENTER key
    // HINT: Check if currentGuess.length === WORD_LENGTH
    
    // TODO: Handle BACKSPACE key
    // HINT: Check if currentGuess.length > 0
    
    console.log('Validating input:', key); // Remove this line
    return true; // Replace with actual validation logic
}

// ========================================
// DEBUGGING HELPERS (REMOVE BEFORE SUBMISSION)
// ========================================

//Uncomment these lines for debugging help:
    console.log('Current word:', currentWord); 
    console.log('Current guess:', currentGuess);
 console.log('Current row:', currentRow);

console.log('Student implementation template loaded. Start implementing the functions above!'); 