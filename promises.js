const axios = require("axios");
const https = require("https");
const fetch = require("node-fetch");

const url = "https://jsonplaceholder.typicode.com/todos/1";
const postUrl = "https://jsonplaceholder.typicode.com/posts";

//Axios method
const getAxios = (url, outUrl) => {
  axios
    .get(url)
    .then(response => {
      console.log("firstResponse", response.data);
      const firstResponseEdited = { ...response.data, userId: 3 };
      console.log("firstResponseEdited", firstResponseEdited);
      return firstResponseEdited;
    })
    .then(firstResponseEdited => {
      console.log("second call Passed", firstResponseEdited);
      axios({
        method: "POST",
        url: outUrl,
        data: JSON.stringify(firstResponseEdited)
      })
        .then(response => {
          console.log("secondResponseAfterPost", response.data);
        })
        .catch(error => {
          console.log("axios error", error);
        });
    });
};

//https method
// no promise support
const getHttps = url => {
  https.get(url, res => {
    // res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
    });
    res.on("end", () => {
      body = JSON.parse(body);
      console.log("https", body);
    });
  });
};

const getFetch = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    console.log("fetch", json);
  } catch (error) {
    console.log("fetch error", error);
  }
};

getAxios(url, postUrl);
getHttps(url);
getFetch(url);
