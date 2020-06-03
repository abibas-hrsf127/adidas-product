import { check, sleep } from "k6";
import http from "k6/http";

export let options = {
  stages: [
      { duration: "30s", target: 600 },
      { duration: "30s", target: 800 },
      { duration: "30s", target: 1000 },
      { duration: "30s", target: 0 }
    ]
};

export default function() {
  let gen = Math.floor(Math.random() * 10000000);
  let res = http.get(`http://localhost:3001/api/products/${gen}`);
  check(res, {
    "is status 200": (r) => r.status === 200
  });
  sleep(1);
};