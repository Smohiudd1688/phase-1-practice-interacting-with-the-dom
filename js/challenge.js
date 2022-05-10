main();

//main function where all the fucntions will be called
function main () {
    const counter = document.querySelector('#counter');
    handleCounter(counter);
    handlePlusAndMinus(counter);
    handleLikes(counter);
    handleComments();
}

//increases the counter each second and pauses counter when pause button is clicked
function handleCounter (counter) {
    //selects all the buttons that will enabled/disables
    const plus = document.querySelector('#plus');
    const minus = document.querySelector('#minus');
    const heart = document.querySelector('#heart');
    const submit = document.querySelector('#submit');

    //start the counter that will increase by one each second
    let timer = setInterval(() => {
        let seconds = parseInt(counter.innerText);
        counter.innerText = ++seconds;
    }, 1000);

    //select and handle event when pause is clicked
    const pause = document.querySelector('#pause');
    pause.addEventListener('click', (event) => {
        //if not yet paused stop timer, change button text to resume and disable all buttons
        if (pause.textContent === ' pause '){
            clearInterval(timer);
            pause.textContent = ' resume ';
            plus.disabled = true;
            minus.disabled = true;
            heart.disabled = true;
            submit.disabled = true;

        //else if already paused restart timer, change text back to pause adn renable all buttons
        } else {
            pause.textContent = ' pause ';
            timer = setInterval(() => {
                let seconds = parseInt(counter.innerText);
                counter.innerText = ++seconds;
            }, 1000);
            plus.disabled = false;
            minus.disabled = false;
            heart.disabled = false;
            submit.disabled = false;
        }
    })
}

//handles the functionality associated with clicking the plus and minus buttons
function handlePlusAndMinus(counter) {
    const plus = document.querySelector('#plus');
    const minus = document.querySelector('#minus');

    //increments counter once plus button is clicked
    plus.addEventListener('click', (event) => {
        counter.innerText = parseInt(counter.innerText) + 1;
    });

    //decrements counter once minus button is clicked
    minus.addEventListener('click', (event) => {
        counter.innerText = parseInt(counter.innerText) - 1;
    });
}

//handles functionality associated with clicking heart button
function handleLikes (counter) {
    //finds certain elements in the dom
    const heart = document.querySelector('#heart');
    const likesList = document.querySelector('.likes');
    
    //array that will hold the objects of the current values of list of liked numbers
    const likesArray = [{
        counterTime: 'N/A',
        amountOfLikes: 0
    }];

    //an event listener that is triggered when heart button is pressed and adds/updates new info to list
    heart.addEventListener('click', (event) => {
        const currentTime = parseInt(counter.innerText);
        let index;

        //checks if that specific time has already been liked
        for (const element of likesArray) {
            if (element.counterTime == currentTime) {
                element.amountOfLikes = ++element.amountOfLikes;
                index = likesArray.indexOf(element);
                break;
            }
        }

        //if time has been liked change the amount of likes by 1, else create new element to add to list
        if (index != undefined) {
            const allLikes = document.querySelectorAll(".likes li");
            allLikes[index - 1].innerText = `${currentTime} has been liked ${likesArray[index].amountOfLikes} times`;
        } else {
            const li = document.createElement('li');
            likesArray.push({counterTime: currentTime, amountOfLikes: 1});
            li.innerText = `${currentTime} has been liked 1 time`;
            likesList.appendChild(li);

        }

    });
}

function handleComments () {
    const commentForm = document.querySelector("#comment-form");
    const commentHeader = document.querySelector('#list');

    commentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const comment = event.target.comment_input.value;
        const p = document.createElement('p');
        p.textContent = comment;
        commentHeader.appendChild(p);
        commentForm.reset();
    })
}