DROP DATABASE IF EXISTS abibas_products;

CREATE DATABASE abibas_products;

\c abibas_products

CREATE TABLE products (
  id integer PRIMARY KEY,
  name varchar(50) NOT NULL,
  collectionName varchar(50),
  reviewCount smallint,
  reviewAverage decimal
);

CREATE TABLE shoeColors (
  id integer PRIMARY KEY,
  products_id integer REFERENCES products,
  name varchar(500) NOT NULL,
  listPrice smallint NOT NULL,
  salePrice smallint
);

CREATE TABLE colorImages (
  id integer PRIMARY KEY,
  colors_id integer REFERENCES shoeColors,
  imageUrl1 varchar(500) NOT NULL,
  imageUrl2 varchar(500) NOT NULL,
  imageUrl3 varchar(500) NOT NULL,
  imageUrl4 varchar(500) NOT NULL,
  imageUrl5 varchar(500) NOT NULL,
  imageUrl6 varchar(500) NOT NULL,
  imageUrl7 varchar(500) NOT NULL,
  imageUrl8 varchar(500) NOT NULL
);

CREATE TABLE shoeQuantity (
  id integer PRIMARY KEY,
  products_id integer REFERENCES products,
  colors_id integer REFERENCES shoeColors,
  shoeSize decimal NOT NULL,
  quantity smallint NOT NULL
);