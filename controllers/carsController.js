
exports.getAllCars = async (req, res) => {
    const cars = await Car.findAll();
    console.log(cars);
    res.send("OK")
};
