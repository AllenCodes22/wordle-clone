let keyTimer = null;

const confettiBtn = document.getElementById("confetti-btn");

async function dropConfetti() {
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.animationDelay = `${Math.random()}s`;
    confetti.style.animationDuration = `${2 + Math.random()}s`;
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.style.backgroundColor = getRandomColor();
    document.body.appendChild(confetti);

    dropAsyncConfetti();
  }
}

async function dropAsyncConfetti() {
  setInterval(() => {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.animationDelay = `${Math.random()}s`;
    confetti.style.animationDuration = `${2 + Math.random()}s`;
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.style.backgroundColor = getRandomColor();
    document.body.appendChild(confetti);
  }, 200);
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
let key1Pressed = false;
let key2Pressed = false;

const keydownHandler = (event) => {
  if (event.key === "-") {
    key1Pressed = true;
  }

  if (event.key === "=") {
    key2Pressed = true;
  }

  if (key1Pressed && key2Pressed) {
    dropConfetti();
    setInterval(() => {
      showThankYouModal();
      key1Pressed = false;
      key2Pressed = false;
    }, 2000);
  }
};

const keyupHandler = (event) => {
  if (event.key === "-") {
    key1Pressed = false;
  }

  if (event.key === "=") {
    key2Pressed = false;
  }
};

document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

const modalContent = `
  <div id="thank-you-modal" class="modal">
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>Thank You!</h2>
      <p>Thank you for watching and listening to my presentation on GitHub CoPilot. I hope you found it informative and entertaining. If you have any questions or feedback, please let me know.</p>
    </div>
  </div>
`;

document.body.innerHTML += modalContent;

const modal = document.getElementById("thank-you-modal");
const closeBtn = modal.querySelector(".close");

closeBtn.addEventListener("click", () => {
  hideThankYouModal();
});

function showThankYouModal() {
  modal.style.display = "block";
}

function hideThankYouModal() {
  modal.style.display = "none";
}
