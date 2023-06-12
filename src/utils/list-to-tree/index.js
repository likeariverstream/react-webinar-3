/**
 * Преобразование списка в иерархию
 * @param list {Array} Список объектов с отношением на родителя
 * @param [key] {String} Свойство с первичным ключом
 * @returns {Array} Корневые узлы
 */
export default function listToTree(list, key = '_id') {
  const map = {};
  let node;
  let roots = [];

  for (let i = 0; i < list.length; i += 1) {
    map[list[i]._id] = i;
    list[i].children = [];
  }

  for (let i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parent && map[node.parent._id] !== undefined) {
      list[map[node.parent._id]].children.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}
