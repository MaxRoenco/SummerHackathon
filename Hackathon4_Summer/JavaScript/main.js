document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("interestsModal");
    const btn = document.getElementById("openModalBtn");
    const span = document.getElementsByClassName("close")[0];
    let processButton = document.getElementById("processButton");
    let selectedInterests = [];

    btn.addEventListener('onclick', () => {
        modal.style.display = "block";
    });

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    const interestItems = document.querySelectorAll('.interest-item');

    interestItems.forEach(item => {
        item.onclick = function () {
            item.classList.toggle('selected');
            const interest = item.textContent;
            if (item.classList.contains('selected')) {
                selectedInterests.push(interest);
            } else {
                selectedInterests = selectedInterests.filter(i => i !== interest);
            }
            console.log(selectedInterests);
        }
    });

    processButton.onclick = function () {
        console.log("Displayed the array", selectedInterests);
        checkForSimilarPosts(selectedInterests);
        modal.style.display = "none"; 
    }

    function checkForSimilarPosts(selectedInterests) {
        const posts = document.querySelectorAll('.post');
        posts.forEach(post => {
            const postContent = post.textContent.toLowerCase();
            let matchFound = selectedInterests.some(interest => postContent.includes(interest.toLowerCase()));
            if (matchFound) {
                post.style.backgroundColor = 'lightgreen'; // Highlight the post as a match
            } else {
                post.style.backgroundColor = ''; // Reset background if not a match
            }
        });
    }
});
