const express = require(`express`);

const app = express();
const PORT = 3000;

app.use(express.json());

let cars = [
    {
        id: 1,
        name: "Lexus",
        location: "New York",
        color: "Black"
    },
    {
        id: 2,
        name: "Toyota",
        location: "Los Angeles",
        color: "White"
    },
    {
        id: 3,
        name: "Honda",
        location: "Chicago",
        color: "Red"
    },
    {
        id: 4,
        name: "Ford",
        location: "Houston",
        color: "Blue"
    }
];

// GET
app.get(`/cars`, (req, res) => {
    res.status(200).json({
        success: true,
        message: `Cars retrieved successfully`,
        car: cars,
    })

});

app.get(`/cars/:id`, (req, res) => {
    const car = cars.find(car => car.id === Number(req.params.id))

    res.status(200).json({
        success: true,
        message: `Single car retrieved successfully`,
        car: car,
    })
})


// POST
app.post(`/cars`, (req, res) => {
    const newCar = req.body;
    cars.push (newCar);
    
    res.status(200).json({
        success: true,
        message: `Car added successfully`,
        car: newCar,
    })
})

// put
app.put(`/cars/:id`, (req, res) => {
    const carY = cars.find(carY => carY.id === Number(req.params.id));

    carY.name = req.body.name;
    res.status(200).json({
        success: true,
        message: `Car updated successfully`,
        car: carY,
    });
})

// patch
app.patch(`/cars`, (req, res) => {
    const carU = cars.find(carU => carU.id ===
        Number(req.params.id)
    );
    carU.id = req.body.id;
    carU.name = req.body.name;
    carU.color = req.body.color;
    carU.location = req.body.location;
    res.status(200).json({
        success: true,
        message: `All Cars updated successfully`,
        car: carU,
    });
})

// delete
app.delete(`/cars/:id`, (req, res) => {
    const carZ = parseInt(req.params.id);
    const carIndex = cars.findIndex(car => car.id === carZ);
    if (carIndex !== -1) {
        cars.splice(carIndex, 1);
        res.status(200).json({
            success: true,
            message: `Car deleted successfully`,
        });
    } else {
        res.status(404).json({
            success: false,
            message: `Car not found`,
        });
    }
});

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});