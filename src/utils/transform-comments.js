function listToTree(list) {
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
  
  function treeToList(tree, callback, level = 0, count = 1) {
    const list = [];
  
    for (let i = 0; i < tree.length; i += 1) {
      const node = tree[i];
      node.count = count;
      node.level = level;
      list.push(callback(node, level));
      if (node.children.length > 0) {
        list.push(...treeToList(node.children, callback, level + 1, count + 1));
      }
    }
  
    return list;
  }
  
  export function transformComments(data) {
    const sortedData = data.sort((a, b) => new Date(b.dateCreate) - new Date(a.dateCreate));
    const tree = listToTree(sortedData);
    const result = treeToList(tree, (item) => item, 0, 1);
    
    return result;
  }
