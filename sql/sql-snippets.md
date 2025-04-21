# FakeStore Orders – Analysis Queries

## 1 · Total sales for March 2024
```sql
SELECT SUM(amount) AS total_sales_march_2024
FROM orders
WHERE order_date BETWEEN '2024-03-01' AND '2024-03-31';
```

## 2 · Top‑spending customer
```sql
SELECT customer, SUM(amount) AS total_spent
FROM orders
GROUP BY customer
ORDER BY total_spent DESC
LIMIT 1;
```

## 3 · Average order value for the last three months (Jan – Mar 2024)
```sql
SELECT ROUND(SUM(amount)*1.0 / COUNT(*), 2) AS avg_order_value_last_3_months
FROM orders
WHERE order_date BETWEEN DATE('2024-03-31','-2 months','start of month')
                    AND '2024-03-31';
```

