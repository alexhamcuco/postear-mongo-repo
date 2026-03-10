const motivationalEmail = () => `
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're a Star!</title>
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

    /* Additional styles */
    .space {
      margin: 20px 0;
    }

    .cursive {
      font-family: 'Brush Script MT', cursive;
    }

    /* Button styling */
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

    /* Specific styling for the first paragraph */
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
    <img src="https://www.spanishwithalex.com/images/miniatures/newlettersGirlMedia.jpg" alt="Learning Spanish" style="max-width: 100%; height: auto; border-radius: 8px;">
  </div>
  <h1>NEWS!! You're a Star!</h1>

  <p class="first-paragraph">
    You're amazing for taking on the challenge of learning a new language! It’s a tough journey, but one filled with great rewards. So give yourself some credit for every step you take along the way!
</p>
  <p>
    If you relate to this, then you know how valuable support feels. Recognition for effort is vital; sometimes, it’s not about winning but about moving forward. Learning is an exciting journey, one full of delightful surprises.
  </p>

  <p>
Not everyone takes on the challenge of learning a new language, but those who do discover how it opens doors to new opportunities. Along the way, our mistakes only make us stronger.  </p>

  <p class="signature">
    <br />
    A friendly hug, Alex<br />
     😉
  </p>
   <p class="signature">
If you want to contact me or unsubscribe from this email list, just reply to this email.

  </p>

</body>
</html>

`;

export default motivationalEmail;
