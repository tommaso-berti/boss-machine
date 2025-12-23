const checkMillionDollarIdea = (req, res, next) => {
    const numWeeks = Number(req.body.numWeeks);
    const weeklyRevenue = Number(req.body.weeklyRevenue);
    if(Number.isNaN(numWeeks) || Number.isNaN(weeklyRevenue) || numWeeks * weeklyRevenue < 1000000) {
        res.status(400).send()
    } else {
       next()
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
