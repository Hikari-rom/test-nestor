import { resultApartment1 } from "./apartment.seeds";
import { user1 } from "./user.seeds";

export const createBooking1 = {
    "start_date": "2023-05-12",
    "end_date": "2023-05-13",
    "price": 15,
    "user_id": 1,
    "bedroom_id": 1
}

export const bookingsResult1 = [
    {
        "id": 1,
        "price": 15,
        "date": "2023-05-12T00:00:00.000Z",
        "bedroom": {
            "id": 1,
            "description": "This is the bedroom 1 description",
            "size": 14,
            "numberOfBeds": 1,
            "apartment": resultApartment1
        },
        "user": user1
    }, {
        "id": 2,
        "price": 15,
        "date": "2023-05-13T00:00:00.000Z",
        "bedroom": {
            "id": 1,
            "description": "This is the bedroom 1 description",
            "size": 14,
            "numberOfBeds": 1,
            "apartment": resultApartment1
        },
        "user": user1
    },
];

export const bookingGet1 = {
    "id": 1,
    "price": 15,
    "date": "2023-05-12T00:00:00.000Z",
    "bedroom": {
        "id": 1,
        "description": "This is the bedroom 1 description",
        "size": 14,
        "numberOfBeds": 1,
        "apartment": resultApartment1
    },
    "user": user1
}

export const partialBooking2 = {
    "id": 2,
    "price": 30
}

export const bookingUpdate2 = {
    "id": 2,
    "price": 30,
    "date": "2023-05-13T00:00:00.000Z",
    "bedroom": {
        "id": 1,
        "description": "This is the bedroom 1 description",
        "size": 14,
        "numberOfBeds": 1,
        "apartment": resultApartment1
    },
    "user": user1
}
