DROP DATABASE IF EXISTS abibas_products;

CREATE DATABASE abibas_products;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  collectionName TEXT,
  reviewCount NUMBER,
  reviewAverage NUMBER
);

CREATE TABLE colors (
  id SERIAL PRIMARY KEY,
  products_id Number NOT NULL,
  name TEXT NOT NULL,
  listPrice Number NOT NULL,
  salePrice Number,
  images TEXT[],
  FOREIGN KEY products_id REFERENCES products (id)
);

CREATE TABLE quantity (
  id SERIAL PRIMARY KEY,
  products_id NUMBER NOT NULL,
  colors_id Number NOT NULL,
  size TEXT UNIQUE NOT NULL,
  quantity NUMBER NOT NULL,
  FOREIGN KEY products_id REFERENCES products (id),
  FOREIGN KEY colors_id REFERENCES colors (id)
)