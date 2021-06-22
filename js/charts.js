$(document).ready(function () { //quando a pagina estiver pronta....

    function getRandomColor() { //função para gerar cores aleatórias
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    $.ajax({ // AJAX request
        url: "http://172.23.14.9:3000/detect_count_by_month", // REST API com view no postgresql
        beforeSend: function () {
            $(".lds-dual-ring").show();
        },
        type: 'GET',
        dataType: "json"
    }).done(function (data) {
            $(".lds-dual-ring").hide();
            let dados = [] // array de dados para o grafico
            let months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dec'];
            for (let i = 0; i < data.length; i++) { //percorro o vetor json para pegar os dados
                dados.push(data[i].detections)
            }
            var ctx = $('#detec-mes')
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
        $(".lds-dual-ring").hide();
        $("#detec-mes").parent("div").append('<span style="color:red;font-size: 30px"> ERROR AO CARREGAR CHART</span>')
    });


});