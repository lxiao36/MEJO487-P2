/**********Slide***********/
let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.querySelectorAll(".slide");

  if (slideIndex >= slides.length) {
    slideIndex = 0;
  } else if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }

  // Hide all slides except the current one
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[slideIndex].style.display = "block";

  console.log(`Slide changed to ${slideIndex + 1}`);
}

function changeSlide(n) {
  slideIndex += n;
  showSlides();
}

/**********Quiz***********/
$(document).ready(function () {
  let currentQuestion = 1;

  // Function to calculate quiz score
  function calculateScore() {
    let score = 0;
    const answers = {
      q1: "acetylcholine",
      q2: "max-repetitions",
      q3: "90-minutes",
      q4: "rem-n3",
      q5: "4-hours",
      q6: "curve-memory",
    };

    // Loop through questions
    for (let i = 1; i <= currentQuestion; i++) {
      const selectedAnswer = $(`input[name="q${i}"]:checked`).val();
      if (selectedAnswer === answers[`q${i}`]) {
        score++;
      }
    }

    return score;
  }

  // Show the current question and hide the rest
  function showCurrentQuestion() {
    $(".question").hide();
    $(`.question:nth-child(${currentQuestion})`).show();
  }

  // Initialize the quiz by showing the first question
  showCurrentQuestion();

  // Hide the "Previous" button on the first question
  $(".prev-question").hide();

  // Handle next question button click
  $(".next-question").click(function () {
    currentQuestion++;
    if (currentQuestion <= 6) {
      showCurrentQuestion();
    }
    if (currentQuestion === 6) {
      $(".next-question").hide(); // Hide "Next" button on the last question
      $("#submit-quiz").show(); // Show "Submit" button on the last question
    }
    $(".prev-question").show(); // Show "Previous" button
  });

  // Handle previous question button click
  $(".prev-question").click(function () {
    currentQuestion--;
    if (currentQuestion >= 1) {
      showCurrentQuestion();
    }
    if (currentQuestion === 1) {
      $(".prev-question").hide(); // Hide "Previous" button on the first question
    }
    $(".next-question").show(); // Show "Next" button
    $("#submit-quiz").hide(); // Hide "Submit" button on previous questions
  });

  // Handle quiz submission
  $("#submit-quiz").click(function () {
    const score = calculateScore();
    alert(`Your score is: ${score}/6`);
  });
});

/**********Image Pop Up***********/
// Get all elements with the "clickable-image" class
var images = document.querySelectorAll(".clickable-image");

// Get all elements with the "modal" class
var modals = document.querySelectorAll(".modal");

// Loop through each clickable image
images.forEach(function (image, index) {
  // When the user clicks on the image, open the corresponding modal
  image.onclick = function () {
    modals[index].style.display = "block";
  };
});

// Get all elements with the "close" class
var closeButtons = document.querySelectorAll(".close");

// Loop through each close button
closeButtons.forEach(function (closeButton) {
  // When the user clicks on <span> (x), close the corresponding modal
  closeButton.onclick = function () {
    closeButton.parentNode.style.display = "none";
  };
});

// When the user clicks anywhere outside of a modal, close it
window.onclick = function (event) {
  modals.forEach(function (modal) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
};
