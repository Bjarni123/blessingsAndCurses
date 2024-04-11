
document.getElementById('spinButton').addEventListener('click', () => {
        let redChance = parseInt(document.getElementById('redChance').value) || 0;
        let blueChance = parseInt(document.getElementById('blueChance').value) || 0;
        /* let decisionAngle = parseFloat(document.getElementById('decisionAngle').value) || 0; */
        let decisionAngle = parseFloat(270); // Default decision angle is 270 degrees

        let totalChance = redChance + blueChance;
        if (totalChance === 0) {
                alert("Please enter valid numbers for chances.");
                return;
        }

        decisionAngle = decisionAngle % 360; // Ensure angle is between 0 and 360
        let decisionRadians = (decisionAngle * Math.PI) / 180; // Convert degrees to radians

        let canvas = document.getElementById('wheelCanvas');
        let ctx = canvas.getContext('2d');
        let startAngle = 0;
        let endAngle = (Math.random() * 2) * Math.PI;

        let spinDuration = 3000; // 3 seconds spin duration
        let startTime = null;

        function drawWheel(currentTime) {
                if (!startTime) startTime = currentTime;
                let timeElapsed = currentTime - startTime;

                let spinAngle = startAngle + easeOutCubic(timeElapsed, 0, endAngle * 10, spinDuration); // Spinning multiple times
                drawSection(ctx, spinAngle % (2 * Math.PI), redChance, totalChance, 'red');
                drawSection(ctx, (spinAngle + (redChance / totalChance) * 2 * Math.PI) % (2 * Math.PI), blueChance, totalChance, 'blue');

                if (timeElapsed < spinDuration) {
                        requestAnimationFrame(drawWheel);
                } else {
                        let finalAngle = (spinAngle + decisionRadians) % (2 * Math.PI);
                        let winningSection = finalAngle <= ((redChance / totalChance) * 2 * Math.PI) ? 'Red' : 'Blue';
                        alert(winningSection + " wins!");
                }
                
        }

        function drawSection(ctx, startAngle, chance, total, color) {
                ctx.beginPath();
                ctx.moveTo(150, 150);
                ctx.arc(150, 150, 150, startAngle, startAngle + (chance / total) * 2 * Math.PI);
                ctx.closePath();
                ctx.fillStyle = color;
                ctx.fill();
            }
        
            function easeOutCubic(t, b, c, d) {
                t /= d;
                t--;
                return c * (t * t * t + 1) + b;
            }

        requestAnimationFrame(drawWheel);
});
    
