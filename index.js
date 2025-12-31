/**
 * Max Profit Algorithm
 * Calculates the optimal mix of properties to build within n time units.
 */

function solveMaxProfit(n) {
    // Configuration
    const buildings = {
        T: { time: 5, rate: 1500 },
        P: { time: 4, rate: 1000 },
        C: { time: 10, rate: 2000 }
    };

    let maxProfit = 0;
    // Store array of solutions to handle cases with multiple optimal mixes (e.g., Time 49)
    let solutions = []; 

    // 1. Iterate through possible counts of Commercial Parks (C)
    for (let c = 0; c * buildings.C.time <= n; c++) {
        let remainingTimeAfterC = n - (c * buildings.C.time);

        // 2. Iterate through possible counts of Theatres (T)
        for (let t = 0; t * buildings.T.time <= remainingTimeAfterC; t++) {
            let remainingTimeAfterT = remainingTimeAfterC - (t * buildings.T.time);

            // 3. Iterate through possible counts of Pubs (P)
            for (let p = 0; p * buildings.P.time <= remainingTimeAfterT; p++) {
                
                // Calculate Profit for this combination (c, t, p)
                let currentProfit = 0;
                let currentTime = 0;

                // Construction Order: T -> P -> C (Based on Efficiency: $300/u -> $250/u -> $200/u)
                
                // Build Theatres
                for (let i = 0; i < t; i++) {
                    currentTime += buildings.T.time;
                    currentProfit += (n - currentTime) * buildings.T.rate;
                }

                // Build Pubs
                for (let i = 0; i < p; i++) {
                    currentTime += buildings.P.time;
                    currentProfit += (n - currentTime) * buildings.P.rate;
                }

                // Build Commercial Parks
                for (let i = 0; i < c; i++) {
                    currentTime += buildings.C.time;
                    currentProfit += (n - currentTime) * buildings.C.rate;
                }

                // Check maximum
                if (currentProfit > maxProfit) {
                    maxProfit = currentProfit;
                    // Found a new higher max, reset solutions array
                    solutions = [{ T: t, P: p, C: c }];
                } else if (currentProfit === maxProfit) {
                    // Found another combination with the same max profit
                    solutions.push({ T: t, P: p, C: c });
                }
            }
        }
    }

  
    const formattedSolutions = solutions.map(s => `T: ${s.T} P: ${s.P} C: ${s.C}`);

    return {
        timeUnit: n,
        earnings: maxProfit,
        solutions: formattedSolutions
    };
}

// Verification for Test Case 49
const result49 = solveMaxProfit(49);
console.log(`Time Unit: ${result49.timeUnit}`);
console.log(`Earnings: $${result49.earnings}`);
console.log("Solutions:");
result49.solutions.forEach(sol => console.log(sol));