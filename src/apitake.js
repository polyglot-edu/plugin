
const url = 'https://polyglot-api.polyglot-edu.com/api/flows';

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);

    const filteredData = data.filter(item => {
      const title = item.title.toLowerCase();
      return !(title.includes("untitled") || title.includes("test") || title.includes("untit") || title.includes("grtet") || title.includes("dere") || title.includes("te"));
    });

    // Ora filteredData contiene solo gli oggetti con titoli diversi da "untitled", "Test" o "until"
    console.log(filteredData);

    const titles = filteredData.map(item => item.title);

    console.log(titles);
  })
  .catch(function(error) {
    console.log(error);
  });

