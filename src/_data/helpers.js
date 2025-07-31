module.exports = {
  currentYear() {
    const today = new Date();
    const year  = today.getFullYear();
    const dash  = `&NoBreak;&hairsp;&NoBreak;&ndash;&NoBreak;&hairsp;&NoBreak;`;
    if (year > 2024) {
      return dash + year;
    } else {
      return;
    }
  },
  raysMistakeYears() {
    const today    = new Date();
    const year     = today.getFullYear();
    let   interval = 56
    if (year > 2024) {
      interval = year - 1968;
      return interval
    } else {
      return interval;
    }
  },
  currentYearRSS() {
    const today = new Date();
    const year  = today.getFullYear();
    const dash  = `⁠ ⁠–⁠ ⁠`;
    if (year > 2024) {
      return dash + year;
    } else {
      return;
    }
  }
};
