document.addEventListener('DOMContentLoaded', () => {
    let counter = 0;

    const intervalId = setInterval(function() {
        console.log("clock is ticking");

        counter += 1;
        
        if (counter === 2) {  
            clearInterval(intervalId); 
            window.location.href = "../index.html"; 
        }
    }, 5000);
});