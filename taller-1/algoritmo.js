const prompt = require('prompt-sync')({sigint: true}); 

function greeting(){
    return " ¡Welcome! Transportation system travel";
}

function askData(){
    const age = parseInt(prompt("Enter your age: "));
    const days = parseInt(prompt("Enter the days you will be traveling: "));
    const service = prompt("Choose the type of service: (1 = ECONOMIC, 2 = EXPRESS, 3 = LUXURY): ");
    return { age, days, service };
}

function verifyAge(age) {
    if (age <= 5) return "free";
    if (age >= 6 && age <= 60) return "regular";
    return "discount";
}

function typeService(service) {
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
            return "economic"; 
    }
}

function calculateCost(ageType, serviceType, days) {
    if (ageType === "free") return 0;
    const baseCost = 5000;
    let cost = 0;
    let multiplier;
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
    for (let i = 0; i < days; i++) {
        cost += baseCost * multiplier;
    }
    if (ageType === "discount") {
        cost = cost * 0.5; 
    }
    return cost;
}

function show(data) {
    const ageType = verifyAge(data.age);
    const serviceType = typeService(data.service);
    const totalCost = calculateCost(ageType, serviceType, data.days);
    console.log("------------------------")
    console.log(`Rate type: ${ageType}`);
    console.log(`Number of days: ${data.days}`);
    console.log(`Service type: ${serviceType}`);
    console.log(`Total cost: $${totalCost}`);
    console.log("------------------------")
}

function init() {
    console.log(greeting());
    const data = askData();
    show(data);
}

init();