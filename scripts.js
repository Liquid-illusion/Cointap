```javascript
let tokens = 0; 
const tokenValueInUSD = 1; // 1 token = $1
let isPinVerified = false;

document.getElementById('withdraw-button').addEventListener('click', () => {
    if (!isPinVerified) {
        alert("Please verify your PIN first.");
        return;
    }

    // Call your backend API for withdrawing funds
    fetch('/api/convertTokens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tokens }),
    }).then(response => response.json())
    .then(data => {
        alert("Withdrawal successful!\nAmount: $" + (tokens * tokenValueInUSD).toFixed(2));
        tokens = 0; // Reset tokens after withdrawal
        updateTokenCount();
    })
    .catch(error => {
        alert("Error during withdrawal: " + error);
    });
});

document.getElementById('token-icon').addEventListener('click', () => {
    if (isPinVerified) {
        tokens++;
        updateTokenCount();
    } else {
        alert("Please verify your PIN first.");
    }
});

// PIN Verification
document.getElementById('pin-submit').addEventListener('click', () => {
    const pinInput = document.getElementById('pin-input').value;
    if (pinInput === "1234") { // Simple example with a hardcoded PIN
        isPinVerified = true;
        document.getElementById('pin-container').classList.add('hidden');
        alert("PIN verified! Start tapping.");
    } else {
        alert("Incorrect PIN. Please try again.");
    }
});

// Show PIN input on page load
window.onload = () => {
    document.getElementById('pin-container').classList.remove('hidden');
};