/**
 * Max Profit Algorithm
 * Calculates the optimal mix of properties to build within n time units.
 */

function solveMaxProfit(n) {
    // Configuration
    // Time is in units, Rate is in earnings per unit of operational time
    const buildings = {
        T: { time: 5, rate: 1500 },
        P: { time: 4, rate: 1000 },
        C: { time: 10, rate: 2000 }
    };

    let maxProfit = 0;
    let bestSolution = { T: 0, P: 0, C: 0 };

    // Optimization Strategy:
    // We prioritize based on Earnings Per Unit of Build Time (Efficiency):
    // 1. Theatre (T): $1500 / 5 = $300/unit
    // 2. Pub (P): $1000 / 4 = $250/unit
    // 3. Commercial Park (C): $2000 / 10 = $200/unit
    // Therefore, construction order is always T -> P -> C to maximize profit.

    // 1. Iterate through possible counts of Commercial Parks (C)
    // We only go up to the max number that fits in 'n'
    for (let c = 0; c * buildings.C.time <= n; c++) {
        let remainingTimeAfterC = n - (c * buildings.C.time);

        // 2. Iterate through possible counts of Theatres (T)
        for (let t = 0; t * buildings.T.time <= remainingTimeAfterC; t++) {
            let remainingTimeAfterT = remainingTimeAfterC - (t * buildings.T.time);

            // 3. Iterate through possible counts of Pubs (P)
            for (let p = 0; p * buildings.P.time <= remainingTimeAfterT; p++) {
                
                // We now have a valid mix (c, t, p).
                // Calculate Profit for this specific combination.
                let currentProfit = 0;
                let currentTime = 0;

                // Build Theatres First (Highest Efficiency)
                for (let i = 0; i < t; i++) {
                    currentTime += buildings.T.time;
                    currentProfit += (n - currentTime) * buildings.T.rate;
                }

                // Build Pubs Second
                for (let i = 0; i < p; i++) {
                    currentTime += buildings.P.time;
                    currentProfit += (n - currentTime) * buildings.P.rate;
                }

                // Build Commercial Parks Last (Lowest Efficiency)
                for (let i = 0; i < c; i++) {
                    currentTime += buildings.C.time;
                    currentProfit += (n - currentTime) * buildings.C.rate;
                }

                // Check if this is the new maximum
                if (currentProfit > maxProfit) {
                    maxProfit = currentProfit;
                    bestSolution = { T: t, P: p, C: c };
                }
            }
        }
    }

    // Return the result object
    return {
        timeUnit: n,
        earnings: maxProfit,
        solution: `T: ${bestSolution.T} P: ${bestSolution.P} C: ${bestSolution.C}`
    };
}

// --- Execution ---
// You can run these lines to verify the output matches the requirements
console.log("Test Case 1 (n=7):");
console.log(solveMaxProfit(7));

console.log("\nTest Case 2 (n=8):");
console.log(solveMaxProfit(8));

console.log("\nTest Case 3 (n=13):");
console.log(solveMaxProfit(13));