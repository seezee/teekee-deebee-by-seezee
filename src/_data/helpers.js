module.exports = {
  currentYear() {
    const today = new Date();
    const year  = today.getFullYear();
    const dash  = `&thinsp;&mdash;&thinsp;`;
    if (year > 2023) {
      return dash + year;
    } else {
      return;
    }
  }
};
