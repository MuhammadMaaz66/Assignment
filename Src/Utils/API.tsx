const API_URL = 'https://crudcrud.com/api/0de6f86092554f1a984f644dc24fb0f5/trips';

export interface Trip {
    _id?: string;
    EntryDateTime: string;
    NumberPlate: string;
    EntryInterchange: string;
    ExitDateTime?: string;
    ExitInterchange?: string;
    TotalCostTrip?: number;
    TripStatus: 'Active' | 'Completed';
}

export const postTrip = async (data: Trip): Promise<void> => {
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
};

export const getTrips = async (): Promise<Trip[]> => {
    const response = await fetch(API_URL);
    return await response.json();
};

export const updateTrip = async (id: string, data: Trip): Promise<void> => {
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
};
