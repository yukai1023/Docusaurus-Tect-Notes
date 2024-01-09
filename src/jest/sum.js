function sum(numbers) {
  return numbers.reduce((acc, current) => acc + current, 0);
}

function average(numbers) {
  if (numbers.length === 0) return 0;
  return sum(numbers) / numbers.length;
}

module.exports = { sum, average };