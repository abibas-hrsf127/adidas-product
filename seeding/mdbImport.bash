#!/bin/bash
for i in {0..99}
do
   mongoimport -d abibas_products -c products --type csv --file seed_data/product_data/prod$i.csv --headerline
   mongoimport -d abibas_products -c shoeColors --type csv --file seed_data/color_data/color$i.csv --headerline
   mongoimport -d abibas_products -c colorImages --type csv --file seed_data/image_data/img$i.csv --headerline
   mongoimport -d abibas_products -c shoeQuantity --type csv --file seed_data/quantity_data/qty$i.csv --headerline
   echo 'finished set: $i'
done