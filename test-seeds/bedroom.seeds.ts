import { apartment1 } from "./apartment.seeds";

export const bedroom1 = {
    "description": "This is the bedroom 1 description",
    "size": 14,
    "numberofBeds": 1,
    "apartment": 1
}


export const resultBedroom1 = {
    "id": 1,
    "description": "This is the bedroom 1 description",
    "size": 14,
    "numberofBeds": 1,
    "apartment": apartment1
}

export const bedroom2 = {
    "description": "This is the bedroom 2 description",
    "size": 20,
    "numberofBeds": 2,
    "apartment": 1
}


export const resultBedroom2 = {
    "id": 2,
    "description": "This is the bedroom 2 description",
    "size": 20,
    "numberofBeds": 2,
    "apartment": apartment1
}

export const partBedroom2 = {
    "id": 2,
    "size": 19
}

export const updateBedroom2 = {
    "id": 2,
    "description": "This is the bedroom 2 description",
    "size": 19,
    "numberofBeds": 2,
    "apartment": apartment1
}