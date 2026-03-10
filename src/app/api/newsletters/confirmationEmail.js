const confirmationEmail = () => `
     <html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Our Newsletter</title>
  <style>
    /* Global styles */
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.7;
      margin: 20px;
      color: #333;
      background-color: #f9f9f9;
    }

    h1 {
      color: #d35400;
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

    /* Space */
    .space {
      padding: 10px;
      border-radius: 5px;
      margin: 20px 0;
    }

    /* Button styles */
    .button {
      margin: 10px 0;
      border: 2px solid red;
      color: red;
      cursor: pointer;
      background-color: white;
      padding: 10px 20px;
      border-radius: 4px;
      font-weight: bold;
      transition: background-color 0.3s, color 0.3s;
    }

    .button:hover {
      background-color: rgb(240, 219, 219);
      color: rgb(255, 2, 2);
    }

    /* Specific styling for the first paragraph */
    p.first-paragraph {
      background-color: #fefff;
      color: #000000;
      padding: 10px;
      border-radius: 5px;
      font-family: 'Arial';
      text-align: left;
    }
  </style>
</head>
<body>
 <div style="text-align: center; margin-bottom: 20px;">
    <img src="https://www.spanishwithalex.com/images/miniatures/newslettersWelcome.jpg" alt="Learning Spanish" style="max-width: 100%; height: auto; border-radius: 8px;">
  </div>
  
  <h1>Hello!👋 Welcome!</h1>

  <p class="first-paragraph">
    Are you ready to unleash your speaking superpower?<br />
    If you want to speak from day one and learn how to comunicate fluently,<br />
    you're going to love learning here!<br />
    Keep an eye on your inbox for our newsletters,<br />
    as I'll be reaching out soon with valuable learning content, tips, and insightful advice.<br />
  </p>
  
  🚀 Just one more step to go! Please confirm your email address by clicking the button below. <br /><br />

  <button class="button">
    <a href="https://www.spanishwithalex.com/" style="text-decoration: none; color: red;">Confirm Email</a>
  </button>

  <div class="space">
    <img src="https://yt3.googleusercontent.com/r54bOUhebt9WAn61Uyp30snMW7lP0RlKqlByy2lIh6mwNQCd0nOoimYQXaAW0GbkEPTAGyjl=s176-c-k-c0x00ffffff-no-rj" alt="Welcome" style="display: block; margin: 0 auto;">
  </div>

</body>
</html>
      `;

export default confirmationEmail;
