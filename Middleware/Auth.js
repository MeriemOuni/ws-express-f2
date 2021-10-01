let day = new Date().getDate(); // return the day
let hour = new Date().getHours(); // return current hour

function byDate (req, res, next) {
    if (hour > 8 && hour < 17 && day > 0 && day < 6) {
        next()
    } else {
        res.send(`<h1> Sorry we are closed </h1> <h3> Our working hours: from Monday to Friday, 9am to 17pm</h3>`)
    }
}

module.exports = byDate;