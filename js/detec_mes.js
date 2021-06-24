$(document).ready(function () { //quando a pagina estiver pronta....


    function getRandomColor() { //função para gerar cores aleatórias
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    //PRIMEIRO CHART

    $.get({ // AJAX request
        url: "http://172.23.14.98:3000/detect_count_by_month", // REST API com view no postgresql
        dataType: "json"
    }).done(function (data) { // HTTP 200
            let dados = [] // array de dados para o grafico
            for (let i = 0; i < data.length; i++) { //percorro o vetor json para pegar os dados
                dados.push(data[i].detections) //add no array
            }
            let cor = getRandomColor();
            var ctx = $('#detec-mes') //meu div do grafico
            var myChart = new Chart(ctx, { //gero um chart
                type: 'line',
                data: {
                    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
                    datasets: [{
                        label: 'Detecções',
                        data: dados,
                        backgroundColor: cor,
                        borderColor: cor,
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
    ).fail(function () { //caso error
        console.log("ERROR !!");
        $("#detec-mes").parent("div").append('<span style="color:red;font-size: 30px"> ERROR AO CARREGAR CHART</span>')
    });

});