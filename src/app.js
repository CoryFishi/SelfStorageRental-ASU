//Scroll To Top Button
var scrollBtn = document.getElementById("scrollBtn");
window.onscroll = function() {
    scrollFunction()
};
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
}
scrollBtn.onclick = function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}
// Rental button alert
function rentalAlert() {
    alert("This unit is no longer available! :(")
}
// 
// Ticketing System
// 
// Submit Button
document.getElementById("ticket-btn").addEventListener("click", function(event) {
    var complete = 1;
    var issueType = document.getElementById("issueType");
    var fName = document.getElementById("fName");
    var issueDesc = document.getElementById("issueDescription");
    var email = document.getElementById("email");
    var phone = document.getElementById("phone");
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var phoneRegex = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    if (fName.value === "" && complete === 1) {
        complete = 0;
        alert("Please enter your first name.");
    }
    if (email.value === "" && complete === 1) {
        complete = 0;
        alert("Please enter a valid email address.");
    }
    if (!emailRegex.test(email.value) && complete === 1) {
        complete = 0;
        alert("Please enter a valid email address.");
    }
    if (phone.value != "" && complete === 1) {
        if (!phoneRegex.test(phone.value)) {
            complete = 0;
            alert("Please enter a valid phone number.");
        }
    }
    if (issueType.value === "" && complete === 1) {
        complete = 0;
        alert("Please select an issue type.");
    }
    if (issueDesc.value === "" && complete === 1) {
        complete = 0;
        alert("Please enter a description of your issue.");
    }
    if (complete === 1) {
        addTicketItem();
    } else {
        event.preventDefault();
    }
});
// Ticket Creation
function addTicketItem(){
    var selectedIssueType = document.getElementById("issueType");
    var issueTypeValue = selectedIssueType.options[selectedIssueType.selectedIndex].value;
    var issueDescriptionValue = document.getElementById("issueDescription").value;
    const randomNumber = Math.floor(Math.random() * 65536);
    const hexString = randomNumber.toString(16).toUpperCase();
    const fourDigitHex = hexString.padStart(4, '0');
    // Create a new div
    var newTicket = document.createElement("div");
    newTicket.className = "ticket-item";
    // Create a title with the selected issue type
    var title = document.createElement("h3");
    title.textContent = issueTypeValue + " #" + fourDigitHex;
    newTicket.appendChild(title);
    // Create a status
    var status = document.createElement("p");
    status.className = "status";
    status.textContent = "Status: Active";
    newTicket.appendChild(status);
    // Create a description
    var description = document.createElement("p");
    description.className = "description";
    description.textContent = issueDescriptionValue;
    newTicket.appendChild(description)
    let span = document.createElement('span');
    span.innerHTML = "\u00d7";
    newTicket.appendChild(span);
    // Append the new ticket item to the ticket container
    document.getElementById("ticketContainer").appendChild(newTicket);
    // Save Tickets
    ticketSave();
}
// Ticket save
function ticketSave() {
    localStorage.setItem("data", document.getElementById("ticketContainer").innerHTML);
}
// Ticket Load
function ticketLoad() {
    var ticketContainer = document.getElementById("ticketContainer");
    ticketContainer.innerHTML = localStorage.getItem("data");
}
// Ticket delete button
var ticketContainer = document.getElementById("ticketContainer");
ticketContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }
    ticketSave();
}, false);
// On page load; load tickets
ticketLoad();