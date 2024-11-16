const data = {
  "intro": {
    "title": "Welcome to Our Anniversary Scavenger Hunt!",
    "message": "Are you ready to take a trip down memory lane? Let's get started!"
  },
  "memory1": {
    "question": "What was the first place we went to on our first date?",
    "options": [
      "The Park",
      "Movie Theater",
      "Pizza Place",
      "Coffee Shop"
    ],
    "correctAnswer": "Pizza Place",
    "correctMessage": "That’s right! We shared pizza and laughed for hours. Here's a little video from that day!",
    "incorrectMessage": "Oops, that's not it! Try again!",
    "images": ["ans1.jpg", "ans1.jpg"] // Replaced with ans1.jpg
  },
  "memory2": {
    "question": "What is my favorite thing about you?",
    "options": [
      "Your smile",
      "Your sense of humor",
      "Your intelligence",
      "Your kindness"
    ],
    "correctAnswer": "Your kindness",
    "correctMessage": "You know me too well! Here's a cute picture of us from last summer.",
    "incorrectMessage": "Hmm, that's not quite it. Think again!",
    "images": ["ans1.jpg", "ans1.jpg"] // Replaced with ans1.jpg
  },
  "memory3": {
    "question": "What is the most memorable trip we've taken together?",
    "options": [
      "Beach Vacation",
      "Mountain Hike",
      "City Tour",
      "Road Trip"
    ],
    "correctAnswer": "Road Trip",
    "correctMessage": "Yes! Our road trip was unforgettable. Here’s a throwback to one of the best moments!",
    "incorrectMessage": "Not quite, but I’m sure you’ll get it next time!",
    "images": ["ans1.jpg", "ans1.jpg"] // Replaced with ans1.jpg
  },
  "memory4": {
    "question": "When did we first meet?",
    "options": [
      "At work",
      "At a party",
      "Through mutual friends",
      "In school"
    ],
    "correctAnswer": "At work",
    "correctMessage": "You remembered! That was the start of something amazing.",
    "incorrectMessage": "Not quite! Try again.",
    "images": ["ans1.jpg", "ans1.jpg"] // Replaced with ans1.jpg
  },
  "memory5": {
    "question": "What’s my favorite hobby?",
    "options": [
      "Reading",
      "Cooking",
      "Traveling",
      "Photography"
    ],
    "correctAnswer": "Traveling",
    "correctMessage": "Exactly! We’ve had some unforgettable trips.",
    "incorrectMessage": "Oops! Maybe next time.",
    "images": ["ans1.jpg", "ans1.jpg"] // Replaced with ans1.jpg
  }
};


const startBtn = document.getElementById("start-btn");
const introSection = document.getElementById("intro");
const endMessage = document.getElementById("end-message");

let memoryNumber = 1;

startBtn.addEventListener("click", () => {
  introSection.style.display = "none";
  loadMemory(memoryNumber);
});

function loadMemory(memoryNumber) {
  // Fade out the current memory section if visible
  const currentMemory = document.getElementById(`memory${memoryNumber - 1}`);
  if (currentMemory) {
    currentMemory.style.transition = "opacity 0.3s ease";
    currentMemory.style.opacity = 0;
    setTimeout(() => { currentMemory.style.display = 'none'; }, 300); // Hide after fade
  }

  // Show the current memory container with fade-in effect
  const memoryContainer = document.getElementById(`memory${memoryNumber}`);
  memoryContainer.style.display = "block";
  setTimeout(() => {
    memoryContainer.style.transition = "opacity 0.3s ease";
    memoryContainer.style.opacity = 1;
  }, 10); // Ensure opacity transition after display

  const questionData = data[`memory${memoryNumber}`];

  const questionText = document.getElementById(`memory${memoryNumber}-question`);
  questionText.textContent = questionData.question;

  const optionsContainer = document.getElementById(`memory${memoryNumber}-options`);
  optionsContainer.innerHTML = '';
  questionData.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.disabled = false; // Enable button
    button.addEventListener("click", () => {
      handleAnswer(memoryNumber, option, questionData, button);
      button.disabled = true; // Disable after answer
    });
    optionsContainer.appendChild(button);
  });
}


function handleAnswer(memoryNumber, selectedOption, questionData, button) {
  const feedback = document.getElementById(`memory${memoryNumber}-feedback`);
  const gallery = document.getElementById(`memory${memoryNumber}-gallery`);

  if (selectedOption === questionData.correctAnswer) {
    feedback.textContent = questionData.correctMessage;
    gallery.innerHTML = questionData.images.map(img => `<img src="${img}" alt="memory image">`).join('');
    playSound("correct");
  } else {
    feedback.textContent = questionData.incorrectMessage;
    gallery.innerHTML = ''; // No images if the answer is incorrect
    playSound("incorrect");
  }

  const nextBtn = document.getElementById(`next-btn${memoryNumber}`);
  nextBtn.style.display = "block";

  nextBtn.addEventListener("click", () => {
    if (memoryNumber < 5) {
      loadMemory(memoryNumber + 1);
    } else {
      endMessage.style.display = 'block';
      setTimeout(() => { endMessage.style.opacity = 1; }, 10);
    }
  });
}

function playSound(type) {
  const audio = new Audio();
  if (type === "correct") {
    audio.src = "correct-sound.mp3"; // Add your correct sound file path
  } else {
    audio.src = "incorrect-sound.mp3"; // Add your incorrect sound file path
  }
  audio.play();
}
// Set up event listeners for image clicks and modal
let currentImageIndex = 0; // Variable to track the current image in the popup
let currentMemoryNumber = 0; // Track which memory we're displaying the images for
let currentImages = []; // Store the images for the current memory question

function handleAnswer(memoryNumber, selectedOption, questionData) {
  const feedback = document.getElementById(`memory${memoryNumber}-feedback`);
  const gallery = document.getElementById(`memory${memoryNumber}-gallery`);

  if (selectedOption === questionData.correctAnswer) {
    feedback.textContent = questionData.correctMessage;
    currentImages = questionData.images; // Set the images for the current memory
    gallery.innerHTML = questionData.images.map((img, index) => 
      `<img src="${img}" alt="memory image" data-index="${index}">`
    ).join('');
  } else {
    feedback.textContent = questionData.incorrectMessage;
    gallery.innerHTML = ''; // No images if the answer is incorrect
  }

  // Show the images as clickable
  const images = gallery.querySelectorAll('img');
  images.forEach(image => {
    image.addEventListener('click', () => openPopup(image));
  });

  const nextBtn = document.getElementById(`next-btn${memoryNumber}`);
  nextBtn.style.display = "block";

  nextBtn.addEventListener("click", () => {
    if (memoryNumber < 5) {
      loadMemory(memoryNumber + 1);
    } else {
      endMessage.style.display = 'block';
    }
  });
}

// Open popup with clicked image
function openPopup(image) {
  const popup = document.getElementById('image-popup');
  const popupImg = document.getElementById('popup-img');
  const prevImg = document.getElementById('prev-img');
  const nextImg = document.getElementById('next-img');
  const closePopup = document.getElementById('close-popup');

  // Set the image source in the popup
  currentImageIndex = parseInt(image.getAttribute('data-index'));
  popupImg.src = currentImages[currentImageIndex];

  // Show the popup
  popup.style.display = 'flex';
  setTimeout(() => { popup.style.opacity = 1; popup.style.visibility = 'visible'; }, 10);

  // Close the popup when the close button is clicked
  closePopup.addEventListener('click', () => {
    popup.style.opacity = 0;
    setTimeout(() => { popup.style.display = 'none'; }, 300);
  });

  // Show previous image when the prev button is clicked
  prevImg.addEventListener('click', () => {
    if (currentImageIndex > 0) {
      currentImageIndex--;
      popupImg.src = currentImages[currentImageIndex];
    }
  });

  // Show next image when the next button is clicked
  nextImg.addEventListener('click', () => {
    if (currentImageIndex < currentImages.length - 1) {
      currentImageIndex++;
      popupImg.src = currentImages[currentImageIndex];
    }
  });
}
