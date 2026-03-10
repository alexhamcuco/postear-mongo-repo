const CountdownEmail = (targetDate) => {
  const now = new Date();

  // Intenta crear la fecha sin usar la variable de entrada, por ejemplo:
  const endDate = new Date("2024-08-26T15:00:00+00:00");

  console.log("Target Date:", targetDate);
  console.log("Parsed Date:", endDate);

  if (isNaN(endDate.getTime())) {
    return `
      <h1>¡La clase empieza pronto!</h1>
      <p>La clase comenzará en:</p>
      <p>Fecha inválida proporcionada.</p>
    `;
  }

  const timeLeft = endDate - now;

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return `
    <h1>¡La clase empieza pronto!</h1>
    <p>La clase comenzará en:</p>
    <p>${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos</p>
  `;
};

// Usa la fecha fija para comprobar si funciona
const emailContent = CountdownEmail("2024-08-26T15:00:00+00:00");
console.log(emailContent);

// Exportar la función para que pueda ser utilizada en otros módulos
export default CountdownEmail;
