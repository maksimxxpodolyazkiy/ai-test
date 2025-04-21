import axios from 'axios';

interface Product {
  id: number;
  title: string;
  price: number;
  rating: { rate: number; count: number };
}

const URL = 'https://fakestoreapi.com/products';

describe('FakeStore API quality gates', () => {
  let products: Product[] = [];
  let status = 0;

  beforeAll(async () => {
    const res = await axios.get<Product[]>(URL);
    status = res.status;
    products = res.data;
  });

  it('responds with HTTP 200', () => {
    expect(status).toBe(200);
  });

  it('returns a non-empty product array', () => {
    expect(products.length).toBeGreaterThan(0);
  });

  it('detects data defects against business rules', () => {
    const defects: { id: number; reason: string }[] = [];

    for (const p of products) {
      if (!p.title || !p.title.trim()) defects.push({ id: p.id, reason: 'EMPTY_TITLE' });
      if (p.price < 0) defects.push({ id: p.id, reason: 'NEGATIVE_PRICE' });
      if (p.rating.rate > 5) defects.push({ id: p.id, reason: 'RATE_GT_5' });
    }

    if (defects.length) console.table(defects);
    expect(defects).toHaveLength(0);
  });
});
