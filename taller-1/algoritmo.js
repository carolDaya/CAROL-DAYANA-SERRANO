const prompt = require('prompt-sync')({sigint: true}); 

function greeting(){
    // Displays a welcome message for the user    
    return " ¡Welcome! Transportation system travel";
}

function askData(){
    // Prompts the user to enter their age, travel days, and service type
    const age = parseInt(prompt("Enter your age: "));
    const days = parseInt(prompt("Enter the days you will be traveling: "));
    const service = prompt("Choose the type of service: (1 = ECONOMIC, 2 = EXPRESS, 3 = LUXURY): ");
    // Returns the collected data as a structured object
    return { age, days, service };
}

function verifyAge(age) {
    // Determines the fare type based on the user's age
    // Children 5 and under are free
    // People 61 and over get a discount
    if (age <= 5) return "free";
    if (age >= 6 && age <= 60) return "regular";
    return "discount";
}

function typeService(service) {
    // Standardizes the service input to handle both numbers and text
    service = service.toString().toLowerCase();
    switch (service) {
        case "1":
        case "economic":
            return "economic";
        case "2":
        case "express":
            return "express";
        case "3":
        case "luxury":
            return "luxury";
        default:
            // Defaults to 'economic' if the input is not recognized
            return "economic"; 
    }
}

function calculateCost(ageType, serviceType, days) {
    // Calculates the total travel cost based on age type, service, and number of days
    if (ageType === "free") return 0; // No cost for free-fare travelers
    const baseCost = 5000;  // Base cost per day
    let cost = 0;
    let multiplier;

    // Sets a cost multiplier based on the service type
    switch (serviceType) {
        case "economic":
            multiplier = 1;
            break;
        case "express":
            multiplier = 1.2;
            break;
        case "luxury":
            multiplier = 2;
            break;
    }
    // Calculates the total cost over the number of travel days.
    for (let i = 0; i < days; i++) {
        cost += baseCost * multiplier;
    }
    // Applies a 50% discount for 'discount' age type.
    if (ageType === "discount") {
        cost = cost * 0.5; 
    }
    return cost;
}

function show(data) {
    // Gathers all the necessary information and displays the final travel details and total cost to the user.
    const ageType = verifyAge(data.age);
    const serviceType = typeService(data.service);
    const totalCost = calculateCost(ageType, serviceType, data.days);

    console.log("---------- TRIP SUMMARY --------------")
    console.log(`Rate type: ${ageType}`);
    console.log(`Number of days: ${data.days}`);
    console.log(`Service type: ${serviceType}`);
    console.log(`Total cost: $${totalCost}`);
    console.log("------------------------")
}

function init() {
    // The main function that starts the program flow.
    console.log(greeting());
    const data = askData();
    show(data);
}

init();
