const findEqualEl = (contactRay, toFind) => {
  const ray = contactRay.filter(
    (el) => el.name.toLowerCase() === toFind.toLowerCase(),
  );

  return ray.length >= 1 ? ray : [];
};

export default findEqualEl;
