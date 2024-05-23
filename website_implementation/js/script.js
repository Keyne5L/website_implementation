function switchMode() {
    document.body.classList.toggle('dark-mode');
    var modeText = document.getElementById('mode-text').innerHTML;
    if (modeText === "Switch to Dark Mode") {
        document.getElementById('mode-text').innerHTML = "Switch to Light Mode";
    } else {
        document.getElementById('mode-text').innerHTML = "Switch to Dark Mode";
    }
}

const slides = document.querySelectorAll('.slide');

function resetAnimation() {
    slides.forEach(slide => {
        slide.style.animation = 'none';
        /* Trigger redraw */
        slide.offsetHeight; 
        slide.style.animation = null;
    });
}

setInterval(() => {
    resetAnimation();
}, 6000); /* Reset animation every 6 seconds */


const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const commentsContainer = document.getElementById('comments-container');

commentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const commentText = commentInput.value.trim();

    if (commentText) {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.textContent = commentText;
        commentsContainer.appendChild(commentDiv);
        commentInput.value = '';
    }
});

function handleFeedbackSubmit(event) {
    // Preventing Form Submission
    event.preventDefault(); 

    const feedbackInput = document.getElementById('feedback-input');
    const feedback = feedbackInput.value.trim();

    if (feedback) {
        // Show thank you message modal
        showFeedbackModal();

        // Clear the input box
        feedbackInput.value = '';
    }

    return false; // Prevent default form submission behaviour
}

function showFeedbackModal() {
    const modal = document.getElementById('feedback-modal');
    modal.style.display = 'block';

    const closeButton = modal.querySelector('.close');
    closeButton.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

const baseURL = "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/gamepromo/";
const myWebsiteCode = 'theZone';

document.addEventListener('DOMContentLoaded', function() {
  fetchGamePromo();
});

function fetchGamePromo() {
  const queryParams = {
    website_code: myWebsiteCode,
  };
  const queryString = new URLSearchParams(queryParams).toString();
  const urlWithParams = `${baseURL}?${queryString}`;

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  fetch(urlWithParams, requestOptions)
    .then(response => response.json())
    .then(data => {
      const gamePromoDiv = document.getElementById('game-promo');
      if (gamePromoDiv) {
        let gameImageHTML = '';
        if (data.game_image) {
          gameImageHTML = `<img src="${data.game_image}" alt="${data.game_name}">`;
        }

        gamePromoDiv.innerHTML = `
          <h2>${data.game_name}</h2>
          ${gameImageHTML}
          <p>${data.description}</p>
          <p>Genre: ${data.genre}</p>
          <a href="${data.website_code}" target="_blank">Learn More</a>
        `;
      } else {
        console.error('Element with id "game-promo" not found');
      }
    })
    .catch(error => {
      console.error('Error fetching game promo:', error);
    });
}






