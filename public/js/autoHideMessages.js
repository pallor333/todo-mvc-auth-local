// Select all elements with the class "alert-danger"
// Return them as a NodeList
// Iterate over NodeList and set display of each to 'none'
const errorMessages = document.querySelectorAll('.alert-danger'); 
        if (errorMessages.length > 0) {
            setTimeout(() => {
                errorMessages.forEach(message => {
                    message.style.display = 'none'; // Hide each error message
                });
            }, 3000); // Hide after 3 seconds
        }