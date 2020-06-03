\c abibas_products

\copy products FROM PROGRAM 'awk FNR-1 seed_data/product_data/prod*.csv | cat' CSV HEADER;

\copy shoeColors FROM PROGRAM 'awk FNR-1 seed_data/color_data/color*.csv | cat' CSV HEADER;

\copy colorImages FROM PROGRAM 'awk FNR-1 seed_data/image_data/img*.csv | cat' CSV HEADER;

\copy shoeQuantity FROM PROGRAM 'awk FNR-1 seed_data/quantity_data/qty*.csv | cat' CSV HEADER;