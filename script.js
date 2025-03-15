// Get email from localStorage
function getStudentEmail() {
    return localStorage.getItem('userEmail');
}

// Fetch data from result.json
async function fetchResults() {
    try {
        const response = await fetch('result.json');
        if (!response.ok) {
            throw new Error('Failed to fetch results');
        }
        const data = await response.json();
        
        // Get the email from localStorage
        const email = getStudentEmail();
        
        if (email) {
            // Find the student by email
            const studentData = data.Sheet1.find(student => student.Email.toLowerCase() === email.toLowerCase());
            
            if (studentData) {
                displayResults(studentData);
            } else {
                document.getElementById('resultDetails').innerHTML = '<div class="error">No results found for your account.</div>';
            }
        } else {
            // If no email is found, redirect back to login
            window.location.href = 'index.html';
        }
    } catch (error) {
        console.error('Error loading results:', error);
        document.getElementById('resultDetails').innerHTML = '<div class="error">Error loading results. Please try again later.</div>';
    }
}

// Display the results on the page
function displayResults(data) {
    // Update student info
    document.getElementById('email').textContent = data.Email;
    document.getElementById('seatNo').textContent = data.SeatNo;
    document.getElementById('score').textContent = data.Score;
    
    // Create chart with subject scores
    createChart(data);
    
    // Display detailed breakdown
    const detailsContainer = document.getElementById('resultDetails');
    let detailsHTML = '<h3>Subject-wise Breakdown</h3><table>';
    detailsHTML += '<tr><th>Subject</th><th>Your Score</th><th>Max Score</th></tr>';
    detailsHTML += `<tr><td>Aptitude</td><td>${data.Aptitude}</td><td>7</td></tr>`;
    detailsHTML += `<tr><td>DSA</td><td>${data.DSA}</td><td>6</td></tr>`;
    detailsHTML += `<tr><td>SQL</td><td>${data.SQL}</td><td>5</td></tr>`;
    detailsHTML += `<tr><td>Python</td><td>${data.Python}</td><td>3</td></tr>`;
    detailsHTML += `<tr><td>C++</td><td>${data.CPP}</td><td>8</td></tr>`;
    detailsHTML += `<tr><td>Java</td><td>${data.Java}</td><td>11</td></tr>`;
    detailsHTML += '</table>';
    
    detailsContainer.innerHTML = detailsHTML;
}

// Create chart using Chart.js
function createChart(data) {
    const ctx = document.getElementById('analyticsChart').getContext('2d');
    
    const subjects = ['Aptitude', 'DSA', 'SQL', 'Python', 'C++', 'Java'];
    const scores = [data.Aptitude, data.DSA, data.SQL, data.Python, data.CPP, data.Java];
    
    // Define max scores for each subject
    const maxScores = [7, 6, 5, 3, 8, 11];
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: subjects,
            datasets: [
                {
                    label: 'Your Score',
                    data: scores,
                    backgroundColor: 'rgba(26, 115, 232, 0.7)',
                    borderColor: 'rgba(26, 115, 232, 1)',
                    borderWidth: 1,
                    borderRadius: 4
                },
                {
                    label: 'Maximum Score',
                    data: maxScores,
                    backgroundColor: 'rgba(211, 211, 211, 0.6)',
                    borderColor: 'rgba(211, 211, 211, 1)',
                    borderWidth: 1,
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 12,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        boxWidth: 12,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                title: {
                    display: true,
                    text: 'Subject-wise Performance',
                    font: {
                        size: 16
                    },
                    padding: {
                        bottom: 20
                    }
                }
            },
            barPercentage: 0.7
        }
    });
}

// Logout function
function logout() {
    localStorage.removeItem('userEmail');
    window.location.href = 'index.html';
}

// Load results when page loads
document.addEventListener('DOMContentLoaded', fetchResults);
