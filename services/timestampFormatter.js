const timestampToDate = (timestamp, language, timeZone) => {
  const date = new Date(timestamp * 1000).toLocaleString(language, {
    timeZone,
  });

  return date;
};

module.exports = { timestampToDate };
