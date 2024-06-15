const modal = document.getElementById("interestsModal");
        const btn = document.getElementById("openModalBtn");
        const span = document.getElementsByClassName("close")[0];


        let selectedInterests = [];

        btn.onclick = function() {
            modal.style.display = "block";
        }

        span.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        const interestItems = document.querySelectorAll('.interest-item');

        interestItems.forEach(item => {
            item.onclick = function() {
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
