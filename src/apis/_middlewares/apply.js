module.exports = (routes, fn = []) => {
  return routes.map(item => {
    const { options, ...rest } = item;
    const { pre, ...remain } = options;

    // Push middleware to pre
    const newPre = pre || [];
    fn.forEach(f => {
      newPre.push({
        method: f,
      });
    });
    return {
      ...rest,
      options: {
        ...remain,
        pre: newPre,
      },
    };
  });
};
