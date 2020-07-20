const asyncForEach = async (array, callback) => {
  console.log('hello from async foreach \n');
  for (let index = 0; index < array.length; index++) {
    await callback(array[index]);
  }
};

module.exports = asyncForEach;
