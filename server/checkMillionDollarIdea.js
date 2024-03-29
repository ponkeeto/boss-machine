const checkMillionDollarIdea = (req, res, next) => {
  const { numWeeks, weeklyRevenue } = req.body;
  const totalIncome = Number(numWeeks) * Number(weeklyRevenue);
  const isBadIdea =
    !numWeeks || !weeklyRevenue || isNaN(totalIncome) || totalIncome < 1000000;
  if (isBadIdea) {
    res.status(400).send();
  } else {
    next();
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
