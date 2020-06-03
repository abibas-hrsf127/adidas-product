//let arr = [0,1,2,3,4,5,6,7,8,9]
//console.log(arr[String(Math.random()).slice(2)[1]]);

const fs = require('fs');
const path = require('path');

var generateProductData = (id) => {
  // name pool
  let adjectivePool = 'agile,brisk,hot,nimble,quick,rapid,swift,accelerated,active,dashing,electric,flashing,fleet,fleeting,flying,hurried,racing,ready,snap,winged'.toUpperCase().split(',');
  let namePool = ['RACER', 'SENSEBOOST', 'MATCHBREAK', 'ULTRABOOST', 'YEEZY BOOST', 'PROPHERE', 'CONTINENTAL', 'SOBAKOV', 'DEERUPT', 'KAMANDA']
  let collectionNamePool = ['RUNNING', 'ORIGINALS', 'WALKING', 'TENNIS', 'ESSENTIALS']

  let seedGen = String(Math.random() * Math.pow(10,17));
  let res = [];
  res.push(id);

  // create each data point
  res.push(`${adjectivePool[Math.floor(seedGen.slice(0,2)/5)]} ${namePool[seedGen[2]]}`); //name
  res.push(collectionNamePool[Math.floor(seedGen[3]/2)]); // collection name
  res.push(seedGen.slice(4,7)); // number of ratings
  res.push((seedGen.slice(7,10)/200).toFixed(2)); // average rating

  // return comma joined for csv
  return res.join(',');
}

var generateColorData = (color_id, product_id) => {
  // color pool
  let colorNames = ['CLOUD WHITE', 'DASH GREY', 'SOLAR RED', 'CORE BLACK', 'FLASH ORANGE', 'CARBON', 'YELLOW', 'SCARLET', 'GLORY PURPLE', 'COLLEGIATE NAVY'];

  let seedGen = String(Math.random() * Math.pow(10,17));
  let res = [];

  // create each data point
  res.push(color_id)
  res.push(product_id); // product id
  res.push(`${colorNames[seedGen[0]]} / ${colorNames[seedGen[1]]} / ${colorNames[seedGen[2]]}`); // color name
  let listPrice = (Number(seedGen[3]) + 8) * 10;
  res.push(listPrice);
  res.push(Math.floor((1 - (Math.floor(seedGen[4]/2) * .1)) * listPrice)); // sale price

  // return comma joined for csv
  return res.join(',');
}

var generateImageData = (image_id, color_id) => {
  let seedGen1 = String(Math.random() * Math.pow(10,17));
  let seedGen2 = String(Math.random() * Math.pow(10,17));
  let res = [];

  // create each data point
  res.push(image_id);
  res.push(color_id);
  for (let i = 0; i < 4; i++) {
    res.push(seedGen1.slice(i * 3, (i * 3) + 3));
    res.push(seedGen2.slice(i * 3, (i * 3) + 3));
  }

  return res.join(',');
}

var generateQuantityData = (qty_id, product_id, color_id) => {
  let seedGen = String(Math.random() * Math.pow(10,17));
  let res = [];

  // create each data point
  for (let i = 0; i < 9; i+=2) {
    let temp = [];
    if (Math.floor(seedGen[i]) > 6) {
      temp.push(qty_id);
      temp.push(product_id);
      temp.push(color_id);
      temp.push(4 + (i * 0.5));
      temp.push(seedGen[i+1]);
      qty_id++;
      res.push(temp.join(','));
    }
  }

  return res;
}

var saveToFiles = () => {
  // save cnt for id
  let cnt = 1;
  let colorcnt = 1;
  let imgcnt = 1;
  let qtycnt = 1;

  for (let i = 0; i < 100; i++) {
    // set up file names
    let productFile = path.join(__dirname, 'seed_data', 'product_data', `prod${i}.csv`);
    let imageFile = path.join(__dirname, 'seed_data', 'image_data', `img${i}.csv`);
    let colorFile = path.join(__dirname, 'seed_data', 'color_data', `color${i}.csv`);
    let quantityFile = path.join(__dirname, 'seed_data', 'quantity_data', `qty${i}.csv`);

    // write headers
    fs.appendFileSync(productFile, 'id,name,collectionName,reviewCount,reviewAverage\n');
    fs.appendFileSync(colorFile, 'id,product_id,colorName,listPrice,salePrice\n');
    fs.appendFileSync(imageFile, 'id,color_id,img1,img2,img3,img4,img5,img6,img7,img8\n');
    fs.appendFileSync(quantityFile, 'id,product_id,color_id,size,quantity\n')

    for (let j = 0; j < 100000; j++) {
      fs.appendFileSync(productFile, generateProductData(cnt) + '\n');
      for (let k = 0; k < (Math.ceil(Math.random()*5)); k++) {
        fs.appendFileSync(colorFile, generateColorData(colorcnt, cnt) + '\n');
        fs.appendFileSync(imageFile, generateImageData(imgcnt, colorcnt) + '\n');
        let qtyData = generateQuantityData(qtycnt, cnt, colorcnt);
        if (qtyData.length > 0) {
          fs.appendFileSync(quantityFile, qtyData.join('\n') + '\n');
        }
        colorcnt++;
        imgcnt++;
        qtycnt+=qtyData.length;
      }
      cnt++;
    }

    let date = new Date();
    console.log(`file set ${i} written! at ${date.toTimeString()}`);
  }
};

saveToFiles();