const input = document.querySelector("#input"); // inputfield for an attendee
const output = document.querySelector("#element"); // outputfield of attendees
const groups = document.querySelector("#groups"); // outputfield of groups
const allAttendees = []; // Array of all attendees

/* 
get input value from input and place them in array, then run renderElements
*/

const addElement = (event) => {
    event.preventDefault();
    const elementValue = event.target.form[0].value;

    allAttendees.push(elementValue);

    input.value = "";

    renderElements();
};

/* 
Render the elements from the inputfield and run the shuffle on all attendees
*/

const renderElements = () => {
    output.innerHTML = `
        <form>
            <h2>Antall pr gruppe:</h2>
            <div class="form-group d-flex col-6">
                <input type="range" class="form-range" name="countGroup" id="countGroup" min="1" max="${allAttendees.length}" value="1" oninput="this.nextElementSibling.value = this.value" />
                <output class="ms-5">1</output>
            </div>
            <button class="btn btn-primary mt-3" type="submit" onclick="renderGroups()" >Generer grupper</button>
        </form>
        <h2 class="mt-3">Deltagere</h2>
        <div class="d-flex row" id="outputAttendees"></div>
        
    `;

    allAttendees.forEach((element) => {
        const outputAttendees = document.querySelector("#outputAttendees");

        outputAttendees.innerHTML += `<span class="col-3">${element}</span>`;
    });

    shuffle(allAttendees);
};

/*
Shuffle the array of attendees and return the array as a randomized string
*/

const shuffle = (array) => {
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
};

/*
Render the Groups after pressing the "Generer grouppe"-button
*/

const renderGroups = () => {
    event.preventDefault();

    let attendees = [];
    let size = parseInt(document.querySelector("#countGroup").value);

    Array.from({ length: Math.ceil(allAttendees.length / size) }, (val, i) => {
        attendees.push(allAttendees.slice(i * size, i * size + size));
    });

    groups.innerHTML = `<h2 >Gruppeinndeling:</h2>`;
    attendees.forEach((group) => {
        groups.innerHTML += `<p class="mt-3 col-3">${group}</p>`;
    });
};
