async function unique(value, { Model }, field) {
  const data = {};
  data[field] = value;
  const exist = await Model.find(data);
  if (!exist.length) return;
  return `^This ${field} is already taken`;
}

module.exports = {
  unique,
};
