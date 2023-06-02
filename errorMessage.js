// Error message info
const errorMessage = document.querySelector('.errorNotice__info');


const fetchPromise = fetch('errorcode2.json');

fetchPromise
    .then(response => {
        if (!response.ok) { // hvis der ikke kommer svar fra serveren, giver den en fejlmeddelelse
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json(); // hvis alt er ok, så fortsætter scriptet 
    })
    .then(json => {
        const result = json; // API'et returnerer JSON data og vi lægger det i result
        console.log(result); // result er et array med 12 elementer
        for(const el of result){ // for...of loop af arrayet
            console.log(el); // her kan man se alle elementer i arrayet
        }

        // Den skifter mellem tilfældige numre
        const randomDriftNumber = Math.floor(Math.random()* result[0].drift.length)
        const randomDoseringNumber = Math.floor(Math.random()* result[1].dosering.length)

        // Error message info
        errorMessage.textContent = `${result[1].dosering[2].explanation}`;
        
        
      
    })
    .catch(error => {
        console.error(`Could not get products: ${error}`);
    });