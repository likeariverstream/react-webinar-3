export function findId(array, openId) {
    const commentedItem = array.filter(i => i._id === openId)
    if (commentedItem.length === 0) {
        return null
    }
    const commentedItemChildren = commentedItem[0]?.children
    const lastChild = commentedItemChildren[commentedItemChildren.length - 1];
    if (!lastChild) {
        return openId
    }
    const openedItemId = lastChild._id
    return openedItemId || openId
}
