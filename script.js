
/* =====================================
   OPPORTUNITY FINDER
   SEARCH + FILTERS + DEADLINE SYSTEM
===================================== */

// Find all filter buttons and opportunity cards
const filterButtons = document.querySelectorAll(".filter-btn");
const opportunityCards = document.querySelectorAll(".opportunity-card");

const searchInput = document.getElementById("opportunitySearch");
const noResults = document.getElementById("noResults");

// Currently selected category
let selectedCategory = "all";


/* =====================================
   COMBINED SEARCH AND FILTER FUNCTION
===================================== */

function updateOpportunities() {

    // Read the search box text
    const searchText = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    let visibleCards = 0;

    opportunityCards.forEach(function(card) {

        const cardCategory = card.getAttribute("data-category");

        const cardText = card.innerText.toLowerCase();

        // Check selected category
        const categoryMatches =
            selectedCategory === "all" ||
            selectedCategory === cardCategory;

        // Check search text
        const searchMatches = cardText.includes(searchText);

        // Both conditions must match
        if (categoryMatches && searchMatches) {

            card.style.display = "flex";
            visibleCards++;

        } else {

            card.style.display = "none";

        }

    });

    // Show or hide the no-results message
    if (noResults) {

        noResults.style.display =
            visibleCards === 0 ? "block" : "none";

    }

}


/* =====================================
   CATEGORY FILTER BUTTONS
===================================== */

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Get selected category
        selectedCategory = button.getAttribute("data-filter");

        // Remove active class from all buttons
        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        // Highlight clicked button
        button.classList.add("active");

        // Update visible cards
        updateOpportunities();

    });

});


/* =====================================
   SEARCH FUNCTIONALITY
===================================== */

if (searchInput) {

    searchInput.addEventListener("input", function() {

        updateOpportunities();

    });

}


/* =====================================
   AUTOMATIC DEADLINE STATUS
===================================== */

const deadlineCards = document.querySelectorAll(
    ".opportunity-card[data-deadline]"
);

deadlineCards.forEach(function(card) {

    const deadlineText = card.getAttribute("data-deadline");

    // Use the end of the deadline day
    const deadline = new Date(deadlineText + "T23:59:59");

    const today = new Date();

    const remainingDays = Math.ceil(
        (deadline - today) / (1000 * 60 * 60 * 24)
    );

    const status = document.createElement("span");

    status.classList.add("deadline-status");

    if (remainingDays <= 0) {

        status.textContent = "🔴 Closed";
        status.classList.add("closed");

    } else if (remainingDays <= 7) {

        status.textContent = "🟠 Closing Soon";
        status.classList.add("closing-soon");

    } else {

        status.textContent = "🟢 Open";
        status.classList.add("open");

    }

    card.appendChild(status);

});


// Initial display
updateOpportunities();
