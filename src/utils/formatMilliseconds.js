const formatMilliseconds = (milliseconds) => {
  if (isNaN(milliseconds) || milliseconds < 0) {
    return "Invalid input";
  }

  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes < 60) {
    return `${minutes}`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hr ${remainingMinutes}`;
  }
};

export default formatMilliseconds;
