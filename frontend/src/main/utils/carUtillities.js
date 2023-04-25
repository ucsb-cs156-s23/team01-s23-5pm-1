// get cars from local storage
const get = () => {
    const carValue = localStorage.getItem("car");
    if (carValue === undefined) {
        const carCollection = { nextId: 1, cars: [] }
        return set(carCollection);
    }
    const carCollection = JSON.parse(carValue);
    if (carCollection === null) {
        const carCollection = { nextId: 1, cars: [] }
        return set(carCollection);
    }
    return carCollection;
};

const getById = (id) => {
    if (id === undefined) {
        return { "error": "id is a required parameter" };
    }
    const carCollection = get();
    const cars = carCollection.cars;

    /* eslint-disable-next-line eqeqeq */ // we really do want == here, not ===
    const index = cars.findIndex((r) => r.id == id);
    if (index === -1) {
        return { "error": `car with id ${id} not found` };
    }
    return { car: cars[index] };
}

// set cars in local storage
const set = (carCollection) => {
    localStorage.setItem("cars", JSON.stringify(carCollection));
    return carCollection;
};

// add a car to local storage
const add = (car) => {
    const carCollection = get();
    car = { ...car, id: carCollection.nextId };
    carCollection.nextId++;
    carCollection.cars.push(car);
    set(carCollection);
    return car;
};

// update a car in local storage
const update = (car) => {
    const carCollection = get();

    const cars = carCollection.cars;

    /* eslint-disable-next-line eqeqeq */ // we really do want == here, not ===
    const index = cars.findIndex((r) => r.id == car.id);
    if (index === -1) {
        return { "error": `car with id ${car.id} not found` };
    }
    cars[index] = car;
    set(carCollection);
    return { carCollection: carCollection };
};

// delete a car from local storage
const del = (id) => {
    if (id === undefined) {
        return { "error": "id is a required parameter" };
    }
    const carCollection = get();
    const cars = carCollection.cars;

    /* eslint-disable-next-line eqeqeq */ // we really do want == here, not ===
    const index = cars.findIndex((r) => r.id == id);
    if (index === -1) {
        return { "error": `car with id ${id} not found` };
    }
    cars.splice(index, 1);
    set(carCollection);
    return { carCollection: carCollection };
};

const carUtils = {
    get,
    getById,
    add,
    update,
    del
};

export { carUtils };