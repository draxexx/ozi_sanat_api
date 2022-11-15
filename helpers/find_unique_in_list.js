const findUniqueItem = (list) =>
  list
    .map((e) => e["id"])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter((obj) => list[obj])
    .map((e) => list[e]);

module.exports = {
  findUniqueItem,
};
