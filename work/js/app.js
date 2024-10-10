// 都市の選択
document.getElementById("get-weather").addEventListener("click",function (){
  let element = document.getElementById("city-select");
  //選択されたコードを取得
  let citycode = element.value;
  console.log(citycode);

  let url=`https://www.jma.go.jp/bosai/forecast/data/forecast/${citycode}.json`;

  fetch(url)
  .then(function (response){
    return response.json();
  })
  .then(function(weather){
    console.log(weather);
    
  //発表者と報告日時
  let publishingOffice = weather[0].publishingOffice;
  let reportDatetime = weather[0].reportDatetime;
  //エリア情報の取得
  let area = weather[0].timeSeries[0].areas[0];
  console.log(area);
  //気温情報の取得
  let tempsArea = weather[1].tempAverage.areas[0];
  let todayHighTemperature = tempsArea.max;
  let todayLowTemperature = tempsArea.min;
  console.log(tempsArea);

  //HTML要素にデータを反映 発表者と報告日時
  document.getElementById("publishingOffice").lastElementChild.textContent = weather[0].publishingOffice;
  document.getElementById("reportDatetime").lastElementChild.textContent = weather[0].reportDatetime;
  //地域名と情報
  document.getElementById("targetArea").lastElementChild.textContent = area.area.name;
  document.getElementById("today").lastElementChild.textContent = area.weathers[0];
  document.getElementById("tomorrow").lastElementChild.textContent = area.weathers[1];
  document.getElementById("dayAfterTomorrow").lastElementChild.textContent = area.weathers[2];
  //気温
  document.getElementById("todayHighTemperature").lastElementChild.textContent = tempsArea.max+"℃";
  document.getElementById("todayLowTemperature").lastElementChild.textContent = tempsArea.min+"℃";
  })

  .catch(function (error){
    console.error("エラーが発生しました",error);
  });
});