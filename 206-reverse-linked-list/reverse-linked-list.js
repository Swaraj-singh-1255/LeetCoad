/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let prev = null;
    let curr = head;
    
    while (curr !== null) {
        let nextTemp = curr.next; // Store the next node
        curr.next = prev;         // Reverse the current node's pointer
        prev = curr;              // Move prev one step forward
        curr = nextTemp;          // Move curr one step forward
    }
    
    return prev; // prev will be the new head of the reversed list
};