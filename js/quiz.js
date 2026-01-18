const questions = [
  {
    q: "In computer vision, a pixel is:",
    options: ["A single image point (smallest unit)", "A camera sensor brand", "A video codec", "A type of neural network"],
    answer: 0
  },
  {
    q: "RGB stands for:",
    options: ["Red Green Blue", "Range Gradient Base", "Real Graphic Byte", "Random Gray Balance"],
    answer: 0
  },
  {
    q: "A grayscale image usually has:",
    options: ["1 channel", "2 channels", "3 channels", "4 channels"],
    answer: 0
  },
  {
    q: "A convolution layer in CNN is mainly used to:",
    options: ["Extract features (edges, textures, patterns)", "Translate languages", "Store images", "Encrypt data"],
    answer: 0
  },
  {
    q: "Edge detection helps to find:",
    options: ["Object boundaries", "Audio frequencies", "Database keys", "Network routes"],
    answer: 0
  },
  {
    q: "Which task outputs a class label for the whole image?",
    options: ["Image classification", "Object detection", "Image segmentation", "Tracking"],
    answer: 0
  },
  {
    q: "Object detection provides:",
    options: ["Classes + bounding boxes", "Only image captions", "Only pixel labels", "Only color correction"],
    answer: 0
  },
  {
    q: "Image segmentation means:",
    options: ["Assigning a label to each pixel", "Cropping the image", "Reducing file size", "Increasing brightness"],
    answer: 0
  },
  {
    q: "YOLO is well-known for:",
    options: ["Real-time object detection", "Speech recognition", "Web scraping", "Database normalization"],
    answer: 0
  },
  {
    q: "OpenCV is mainly used for:",
    options: ["Computer vision and image processing", "Cloud deployment", "Mobile payments", "Text-only NLP tasks"],
    answer: 0
  }
];


const quizContainer = document.getElementById("quizContainer");
const resultBox = document.getElementById("result");
const correctBox = document.getElementById("correctAnswers");
const resetBtn = document.getElementById("resetBtn");
const form = document.getElementById("quizForm");

function renderQuiz(){
  quizContainer.innerHTML = "";
  questions.forEach((item, idx) => {
    const block = document.createElement("div");
    block.className = "q";
    block.innerHTML = `
      <h4>Q${idx + 1}. ${item.q}</h4>
      <div class="options">
        ${item.options.map((op, i) => `
          <label>
            <input type="radio" name="q${idx}" value="${i}" />
            ${op}
          </label>
        `).join("")}
      </div>
    `;
    quizContainer.appendChild(block);
  });
}

function gradeQuiz(){
  let score = 0;
  let details = [];

  questions.forEach((item, idx) => {
    const chosen = document.querySelector(`input[name="q${idx}"]:checked`);
    const userAnswer = chosen ? Number(chosen.value) : null;

    const isCorrect = userAnswer === item.answer;
    if (isCorrect) score++;

    details.push({
      number: idx + 1,
      question: item.q,
      correct: item.options[item.answer],
      your: userAnswer === null ? "No answer" : item.options[userAnswer],
      isCorrect
    });
  });

  resultBox.style.display = "block";
  resultBox.innerHTML = `
    <strong>Your score:</strong> ${score} / ${questions.length}
    <div class="note">Tip: review the correct answers below.</div>
  `;

  correctBox.style.display = "block";
  correctBox.innerHTML = `
    <strong>Correct answers:</strong>
    <ol>
      ${details.map(d => `
        <li>
          <div><strong>${d.question}</strong></div>
          <div class="note">Your answer: ${d.your}</div>
          <div class="note">Correct answer: ${d.correct}</div>
          <div class="note">${d.isCorrect ? "✅ Correct" : "❌ Wrong"}</div>
        </li>
      `).join("")}
    </ol>
  `;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  gradeQuiz();
});

resetBtn.addEventListener("click", () => {
  form.reset();
  resultBox.style.display = "none";
  correctBox.style.display = "none";
  resultBox.innerHTML = "";
  correctBox.innerHTML = "";
});

renderQuiz();
