// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const seatNo = document.getElementById('seatNo').value.trim();
    
    try {
        // Fetch the result.json file
        const response = await fetch('result.json');
        if (!response.ok) {
            throw new Error('Failed to fetch results');
        }
        
        const data = await response.json();
        
        // Find the student by email and seat number
        const student = data.Sheet1.find(s => 
            s.Email.toLowerCase() === email.toLowerCase() && 
            s.SeatNo.toLowerCase() === seatNo.toLowerCase()
        );
        
        if (student) {
            // Store the email in localStorage for the results page
            localStorage.setItem('userEmail', email);
            
            // Redirect to the results page
            window.location.href = 'result.html';
        } else {
            // Show error message
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.textContent = 'Invalid email or seat number. Please try again.';
            errorMessage.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error during login:', error);
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = 'An error occurred. Please try again later.';
        errorMessage.classList.remove('hidden');
    }
}); 