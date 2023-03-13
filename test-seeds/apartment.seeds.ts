import { user1 } from "./user.seeds"

export const apartment1 = {
    "address": "Villa Belazur",
    "city": "Valence",
    "zipcode": "26000",
    "owner_id": 1
}

export const resultApartment1 = {
    "id": 1,
    "address": "Villa Belazur",
    "city": "Valence",
    "zipcode": "26000",
    "owner": user1
}

export const resultApartment2 = {
    "id": 2,
    "address": "Appartement Les fleurs bleues",
    "city": "Paris",
    "zipcode": "75000",
    "owner": user1
}

export const apartment2 = {
    "address": "Appartement Les fleurs bleues",
    "city": "Paris",
    "zipcode": "75000",
    "owner_id": 1
}

export const partApartment2 = {
    "id": 2,
    "zipcode": "75007"
}

export const updateApartment2 = {
    "id": 2,
    "address": "Appartement Les fleurs bleues",
    "city": "Paris",
    "zipcode": "75007",
    "owner": user1
}