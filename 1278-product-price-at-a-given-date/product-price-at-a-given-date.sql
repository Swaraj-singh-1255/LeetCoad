# Write your MySQL query statement below
-- 1. Latest price for products modified on or before 2019-08-16
SELECT product_id, new_price AS price
FROM Products
WHERE (product_id, change_date) IN (
    SELECT product_id, MAX(change_date)
    FROM Products
    WHERE change_date <= '2019-08-16'
    GROUP BY product_id
)

UNION ALL

-- 2. Default price (10) for products whose first price change occurred after 2019-08-16
SELECT DISTINCT product_id, 10 AS price
FROM Products
GROUP BY product_id
HAVING MIN(change_date) > '2019-08-16';