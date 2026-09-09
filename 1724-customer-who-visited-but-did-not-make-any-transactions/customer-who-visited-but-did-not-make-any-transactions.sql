# Write your MySQL query statement below
SELECT customer_id, COUNT(V.VISIT_ID) AS count_no_trans
FROM VISITS V
LEFT JOIN TRANSACTIONS T
ON  V.VISIT_ID = T.VISIT_ID
WHERE t.transaction_id IS NULL
GROUP BY v.customer_id
 