// Skifter status-farve i orp processen 
//Status - Orp værdi + status 
const orpStatus = document.querySelector('.value__status'); 
const orpValue = document.querySelector('.value__orp');

// Status kasser
const statusBox = document.querySelectorAll('.status__area');

// Notice info kasse
const noticeBox = document.querySelectorAll('.status__info');
        
//Notice info tekst
const noticeInfoDosering = document.querySelector('.dosering');
const noticeInfoDrift = document.querySelector('.drift')

//status Img
const imageBox = document.querySelectorAll('.statusImg');
//const noticeInfo = document.querySelectorAll('.status__info')


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
        
        // her kalder vi på funktionen og check hvad status er + hvilken errorcode vi kigger på 
        checkStatus(result[0].drift[randomDriftNumber],true)
        checkStatus(result[1].dosering[randomDoseringNumber],false)

        
        
      
    })
    .catch(error => {
        console.error(`Could not get products: ${error}`);
    });


    // Switch (basically en else if/else if/else if)
    function checkStatus(result ,isDrift){
        switch(result.severity){
            case 'Good':
                SetupBox('--default','550','--defaultNotice',result.status,isDrift, './images/correct.png')
                break
            case 'Notice':
                SetupBox('--warning','250','--warningNotice',result.status,isDrift, './images/warning.png')
                break
            case 'Warning':
                SetupBox('--error','100','--warningNotice',result.status,isDrift, './images/error.png')
                break
        }
    }

    // En function, hvor alt info er smidt ind + conditional statement som tjekker om det er en drift/dosering.
    function SetupBox(status, statusValue, statusNotice, statusText, isDrift, imgSrc)
    {
        orpStatus.classList.add(status);
            orpValue.textContent = statusValue;
           
            if (isDrift) {
                statusBox[0].classList.add(status);
                noticeBox[0].classList.add(statusNotice);
                noticeInfoDrift.textContent = statusText;
                imageBox[0].src = imgSrc

            }else {
                statusBox[1].classList.add(status);
                noticeBox[1].classList.add(statusNotice);
                noticeInfoDosering.textContent = statusText;
                imageBox[1].src = imgSrc
            }  
    }