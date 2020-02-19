google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      async function drawChart() {
          let dataArray = [['Дата', 'Значение']]
          let responce = await fetch('http://localhost:8080/api/rate', {
              method : 'GET'
          })
          let fetched = await responce.json()
          dataArray = dataArray.concat( fetched.data)
          console.log(dataArray)
        var data = google.visualization.arrayToDataTable(dataArray);
        var options = {
          title: 'Курс фунт/рубль',
          hAxis: {title: 'Дата',  titleTextStyle: {color: '#333'}},
          vAxis: {minValue: 0}
        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }

      async function changeChart() {
        if((document.getElementById('from_year').value > document.getElementById('to_year').value)
         || ((document.getElementById('from_year').value == document.getElementById('to_year').value)
          && (document.getElementById('from_month').value > document.getElementById('to_month').value))) {
            alert('huynya')
            return
          }
        let dataArray = [['Дата', 'Значение']]
        let from = document.getElementById('from_year').value +'-'+document.getElementById('from_month').value + '-01'
        let to = document.getElementById('to_year').value +'-'+document.getElementById('to_month').value + '-31'
        let responce = await fetch('http://localhost:8080/api/rate?from=' + from + "&to=" +to, {
          method : 'GET'
        })
        let fetched = await responce.json()
        dataArray = dataArray.concat( fetched.data)
        console.log(dataArray)
       var data = google.visualization.arrayToDataTable(dataArray);
        var options = {
        title: 'Курс фунт/рубль',
        hAxis: {title: 'Дата',  titleTextStyle: {color: '#333'}},
        vAxis: {minValue: 0}
       };

      var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
      chart.draw(data, options);
      }