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

var generateColorData = (product_id) => {
  // color pool
  let colorNames = ['CLOUD WHITE', 'DASH GREY', 'SOLAR RED', 'CORE BLACK', 'FLASH ORANGE', 'CARBON', 'YELLOW', 'SCARLET', 'GLORY PURPLE', 'COLLEGIATE NAVY'];

  let seedGen = String(Math.random() * Math.pow(10,17));
  let res = [];

  // create each data point
  res.push(product_id); // product id
  res.push(`${colorNames[seedGen[0]]} / ${colorNames[seedGen[1]]} / ${colorNames[seedGen[2]]}`); // color name
  let listPrice = (Number(seedGen[3]) + 8) * 10;
  res.push(listPrice);
  res.push(Math.floor((1 - (Math.floor(seedGen[4]/2) * .1)) * listPrice)); // sale price

  // return comma joined for csv
  return res.join(',');
}

var generateImageData = (color_id) => {
  let seedGen1 = String(Math.random() * Math.pow(10,17));
  let seedGen2 = String(Math.random() * Math.pow(10,17));
  let res = [];

  // create each data point
  res.push(color_id);
  for (let i = 0; i < 4; i++) {
    res.push(seedGen1.slice(i * 3, (i * 3) + 3));
    res.push(seedGen2.slice(i * 3, (i * 3) + 3));
  }

  return res.join(',');
}

var generateQuantityData = (product_id, color_id) => {
  let seedGen1 = String(Math.random() * Math.pow(10,17));
  let seedGen2 = String(Math.random() * Math.pow(10,17));
  let seedGen3 = String(Math.random() * Math.pow(10,17));
  let res = [];

  // create each data point
  res.push(product_id);
  res.push(color_id);
  for (let i = 0; i < 15; i++) {
    if (Math.floor(seedGen1[i]/5)) {

      res.push(Number(seedGen2[i]) + Number(seedGen3[i]));
    } else {
      res.push(0);
    }
  }

  return res.join(',')
}

var saveToFiles = () => {
  // save cnt for id
  let cnt = 0;
  let colorcnt = 0;

  for (let i = 0; i < 100; i++) {
    // set up file names
    let productFile = path.join(__dirname, 'seed_data', 'product_data', `prod${i}.csv`);
    let imageFile = path.join(__dirname, 'seed_data', 'image_data', `img${i}.csv`);
    let colorFile = path.join(__dirname, 'seed_data', 'color_data', `color${i}.csv`);
    let quantityFile = path.join(__dirname, 'seed_data', 'quantity_data', `qty${i}.csv`);

    // write headers
    fs.appendFileSync(productFile, 'id,name,collectionName,reviewCount,reviewAverage\n');
    fs.appendFileSync(colorFile, 'product_id,colorName,listPrice,salePrice\n');
    fs.appendFileSync(imageFile, 'color_id,img1,img2,img3,img4,img5,img6,img7,img8\n');

    for (let j = 0; j < 100000; j++) {
      fs.appendFileSync(productFile, generateProductData(cnt) + '\n');
      for (let k = 0; k < (Math.ceil(Math.random()*5)); k++) {
        fs.appendFileSync(colorFile, generateColorData(cnt) + '\n');
        fs.appendFileSync(imageFile, generateImageData(colorcnt) + '\n');
        fs.appendFileSync(quantityFile, generateQuantityData(cnt, colorcnt) + '\n');
        colorcnt++;
      }
      cnt++;
    }

    let date = new Date();
    console.log(`file set ${i} written! at ${date.toLocaleDateString()}`);
  }
};

saveToFiles();