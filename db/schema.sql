DROP DATABASE IF EXISTS abibas_products;

CREATE DATABASE abibas_products;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name varchar(50) NOT NULL,
  collectionName varchar(50),
  reviewCount smallint,
  reviewAverage smallint
);

CREATE TABLE shoeColors (
  id SERIAL PRIMARY KEY,
  products_id smallint NOT NULL,
  name varchar(50) NOT NULL,
  listPrice smallint NOT NULL,
  salePrice smallint,
  FOREIGN KEY products_id REFERENCES products (id)
);

CREATE TABLE colorImages (
  id SERIAL PRIMARY KEY,
  colors_id smallint NOT NULL,
  imageUrl varchar(100) NOT NULL,
  FOREIGN KEY colors_id REFERENCES shoeColors (id)
)

CREATE TABLE shoeQuantity (
  id SERIAL PRIMARY KEY,
  products_id smallint NOT NULL,
  colors_id smallint NOT NULL,
  shoeSize varchar(50) UNIQUE NOT NULL,
  quantity smallint NOT NULL,
  FOREIGN KEY products_id REFERENCES products (id),
  FOREIGN KEY colors_id REFERENCES shoeColors (id)
);