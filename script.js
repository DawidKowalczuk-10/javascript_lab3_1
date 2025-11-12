async function searchCountry() {
  const capital = document.getElementById('capital').value.trim();
  const message = document.getElementById('message');
  const table = document.getElementById('result');
  const tbody = document.getElementById('tbody');

  if (!capital) {
    message.textContent = "Podaj nazwę stolicy.";
    table.hidden = true;
    return;
  }

  message.textContent = "Szukam...";
  table.hidden = true;
  tbody.innerHTML = "";

  try {
    const res = await fetch(`https://restcountries.com/v3.1/capital/${capital}`);
    if (!res.ok) throw new Error("Nie znaleziono kraju");
    const data = await res.json();

    data.forEach(c => {
      const row = `<tr>
        <td>${c.name.common}</td>
        <td>${c.capital}</td>
        <td>${c.population.toLocaleString()}</td>
        <td>${c.region}</td>
        <td>${c.subregion || "-"}</td>
      </tr>`;
      tbody.innerHTML += row;
    });

    table.hidden = false;
    message.textContent = "";
  } catch {
    message.textContent = "Nie znaleziono kraju o podanej stolicy.";
  }
}
