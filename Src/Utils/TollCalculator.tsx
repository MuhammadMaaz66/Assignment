import { Trip } from "./API";

export const calculateToll = (
    trip: Trip,
    exitDateTime: string,
    exitInterchange: string
): number => {
    const baseRate = 20;
    const distanceRates = {
        'Zero Point': 0,
        'NS Interchange': 5,
        'Ph4 Interchange': 10,
        'Ferozpur Interchange': 17,
        'Lake City Interchange': 24,
        'Raiwand Interchange': 29,
        'Bahria Interchange': 34,
    };

    const entryDistance = distanceRates[trip.EntryInterchange];
    const exitDistance = distanceRates[exitInterchange];
    const distanceTraveled = Math.abs(exitDistance - entryDistance);

    const date = new Date(exitDateTime);
    const day = date.getDay();
    const isWeekend = day === 0 || day === 6;

    let cost = baseRate + distanceTraveled * (isWeekend ? 0.3 : 0.2);

    if ((day === 1 && parseInt(trip.NumberPlate.slice(-1)) % 2 === 0) ||
        (day === 3 && parseInt(trip.NumberPlate.slice(-1)) % 2 === 0)) {
        cost *= 0.9;
    } else if ((day === 2 && parseInt(trip.NumberPlate.slice(-1)) % 2 !== 0) ||
        (day === 4 && parseInt(trip.NumberPlate.slice(-1)) % 2 !== 0)) {
        cost *= 0.9;
    }

    return parseFloat(cost.toFixed(2));
};
