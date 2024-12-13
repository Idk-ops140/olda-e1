// User data (mock database)
const users = {};

// Element references
const authSection = document.getElementById('auth-section');
const interestSection = document.getElementById('interest-section');
const videoSection = document.getElementById('video-section');
const authButton = document.getElementById('auth-button');
const saveInterestsButton = document.getElementById('save-interests');
const recordButton = document.getElementById('record-button');
const uploadVideo = document.getElementById('upload-video');
const videoFeed = document.getElementById('video-feed');

// User session
let currentUser = null;

// Authentication handler
authButton.addEventListener('click', () => {
  const username = document.getElementById('username').value;
  if (username) {
    if (!users[username]) {
      users[username] = { interests: [], videos: [] };
    }
    currentUser = username;
    authSection.style.display = 'none';
    interestSection.style.display = 'block';
  } else {
    alert('Please enter a username.');
  }
});

// Save interests
saveInterestsButton.addEventListener('click', () => {
  const interests = Array.from(
    document.querySelectorAll('#interest-section input[type="checkbox"]:checked')
  ).map((checkbox) => checkbox.value);

  if (interests.length > 0) {
    users[currentUser].interests = interests;
    interestSection.style.display = 'none';
    videoSection.style.display = 'block';
    generateFeed();
  } else {
    alert('Please select at least one interest.');
  }
});

// Generate personalized feed
function generateFeed() {
  const userInterests = users[currentUser].interests;
  videoFeed.innerHTML = '';
  userInterests.forEach((interest) => {
    const videoElement = document.createElement('div');
    videoElement.innerText = `Suggested Video: ${interest}`;
    videoFeed.appendChild(videoElement);
  });
}

// Video upload handler
uploadVideo.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    users[currentUser].videos.push(file.name);
    alert('Video uploaded successfully!');
    generateFeed();
  }
});

// Record video placeholder
recordButton.addEventListener('click', () => {
  alert('Recording video (placeholder functionality)');
});
