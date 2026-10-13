/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    // Create a dummy node to act as the starting point of the merged list
    let dummy = new ListNode(-1);
    let current = dummy;
    
    // Traverse both lists as long as neither is empty
    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        // Move the current pointer forward
        current = current.next;
    }
    
    // If one of the lists is exhausted, append the remaining elements of the other list
    if (list1 !== null) {
        current.next = list1;
    } else {
        current.next = list2;
    }
    
    // The merged list starts at dummy.next
    return dummy.next;
};