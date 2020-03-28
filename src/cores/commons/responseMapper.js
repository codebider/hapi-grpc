const mapData = (data, meta) => {
  return {
    data,
    meta,
  };
};

const OK = () => ({ success: true });

module.exports = {
  OK,
  mapData,
};
