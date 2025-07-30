module.exports = function (options) {
  return {
    ...options,
    devtool: 'source-map', // ts가 어떤 위치에서 에러가 났는지를 해줌
  };
};
