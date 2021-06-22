function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

$.ajax({
    url: "http://172.23.14.98:3000/detect_count_by_month",
    type: 'GET',
    dataType: "json"
}).done(function (data) {
        console.log("im here")
        dados = []
        let months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dec'];
        for (let i = 0; i < data.length; i++) { //percorro o vetor json
            let mes = data[i].month.slice(0, data[i].month.indexOf('T')); //pego o mes. ex: 2020-01-01
            let date_obj = new Date(mes); //crio um objeto date com a data
            let label_linha = months[date_obj.getUTCMonth()]; //pego o nome do mês
            let cor_randomica = getRandomColor(); //cor randomica aleatoria
            dados.push(data[i].detections)
        }
        var ctx = $('#myChart')
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                datasets: [{
                    label: 'Detecções',
                    data: dados,
                    backgroundColor: 'red',
                    borderColor: 'red',
                    borderWidth: 1
                }]
            },
            options: {
                elements: {
                    line: {
                        tension: 0
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
).fail(function () {
    console.log("ERROR !!");
});


