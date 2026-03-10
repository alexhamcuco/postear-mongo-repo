const welcomingEmail = () => `
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>On the Spanish Road</title>
  <style>
    /* Global styles */
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 20px;
      color: #333;
      background-color: #f9f9f9;
    }

    h1 {
      color: #d35400;
      font-size: 1.8em;
      text-align: center;
    }

    p {
      margin-bottom: 20px;
      padding: 15px;
      border: 1px solid #ccc;
      border-radius: 8px;
      background-color: #ffffff;
    }

    .highlight {
      color: #e67e22;
      font-weight: bold;
    }

    .signature {
      font-style: italic;
      margin-top: 20px;
      color: #7f8c8d;
      text-align: center;
    }

    .space {
      margin: 20px 0;
    }

    /* Cursive text */
    .cursive {
      font-family: 'Brush Script MT', cursive;
    }

    /* Button style */
    .button {
      display: inline-block;
      border: 2px solid #e74c3c;
      color: #e74c3c;
      cursor: pointer;
      text-align: center;
      background-color: #ffffff;
      padding: 10px 20px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: bold;
      transition: background-color 0.3s, color 0.3s;
    }

    .button:hover {
      background-color: #e74c3c;
      color: #ffffff;
    }

    /* First paragraph styling */
    p.first-paragraph {
      color: #34495e;
      background-color: #f2f3f5;
      border: 1px solid #ccc;
      font-family: Arial, sans-serif;
      text-align: left;
    }
  </style>
</head>
<body>

 <div style="text-align: center; margin-bottom: 20px;">
    <img src="https://www.spanishwithalex.com/images/miniatures/newslettersGoingUpStairs.jpg" alt="Learning Spanish" style="max-width: 100%; height: auto; border-radius: 8px;">
  </div>

  <h1>Hola! You've subscribed! Welcome 😃</h1>

  <p class="first-paragraph">
    Thank you for joining my newsletter!<br />
    😊 It makes me so happy to have you here. I want to let you know that I will be dedicated to helping you on your Spanish learning journey.
  </p>

  <p>
    What does this mean? I will be creating materials and you’ll have access to conversational Spanish content through my website. I'm confident you’ll enjoy the experience!
  </p>

  <p>
I've had the opportunity to teach a wide range of learners, and I always learn something from them: teachers, children, adults, retired people, lawyers perfecting their closing arguments, journalists chasing the right words, doctors, and perhaps even a pet or two. And now, I’m excited to have you on board!  </p>

  <p>
    Each student is unique, so creating a one-size-fits-all method is impossible. Your feedback will be essential in shaping our journey together, so don’t hesitate to share your thoughts along the way.
  </p>

  <p>
    <br />
    <span class="cursive">Abrazo de profe, Alex.</span>
  </p>

  <p class="signature">
If you want to contact me or unsubscribe from this email list, just reply to this email.

  </p>
</body>
</html>
`;

export default welcomingEmail;
