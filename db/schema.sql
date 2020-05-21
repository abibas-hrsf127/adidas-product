DROP DATABASE IF EXISTS abibas_products;

CREATE DATABASE abibas_products;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  collectionName TEXT,
  reviewCount NUMBER,
  reviewAverage NUMBER
);

CREATE TABLE shoeColors (
  id SERIAL PRIMARY KEY,
  products_id Number NOT NULL,
  name TEXT NOT NULL,
  listPrice Number NOT NULL,
  salePrice Number,
  images TEXT[],
  FOREIGN KEY products_id REFERENCES products (id)
);

CREATE TABLE shoeQuantity (
  id SERIAL PRIMARY KEY,
  products_id NUMBER NOT NULL,
  colors_id Number NOT NULL,
  shoeSize TEXT UNIQUE NOT NULL,
  quantity NUMBER NOT NULL,
  FOREIGN KEY products_id REFERENCES products (id),
  FOREIGN KEY colors_id REFERENCES shoe_colors (id)
)