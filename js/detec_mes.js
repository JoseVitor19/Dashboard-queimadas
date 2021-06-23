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

    //SEGUNDO CHART
    function getMonthFromJulianDay(d) {
        //para ano bisexto
        switch (d) {
            case d <= 31:
                return '0';
            case d > 31 && d <= 59:
                return '1';
            case d > 59 && d <= 90:
                return '2';
            case d > 90 && d <= 120:
                return '3';
            case d > 120 && d <= 151:
                return '4';
            case d > 151 && d <= 181:
                return '5';
            case d > 181 && d <= 212:
                return '6';
            case d > 212 && d <= 243:
                return '7';
            case d > 243 && d <= 273:
                return '8';
            case d > 273 && d <= 304:
                return '9';
            case d > 304 && d <= 334:
                return '10';
            case d > 334 && d <= 365:
                return '11';
        }
    }

    var linha_2021 = $.get({url: "http://172.23.14.98:3000/detection_2021_count_juliandate", dataType: "json"})


    // LINHA DE 2020 PREENCHIMENTO DE DADOS -------------------------------------------------
    linha_2020.done(function (data) {
        //aqui eu crio um callback para pegar o resultado assincrono

        let dados_deteccoes_2020 = []

        for (let i = 0; i < data.length; i++) {
            dados_deteccoes_2020.push(data[i].detections);
        }

        y = {
            label: 'Detecções 2020',
            data: dados_deteccoes_2020,
            backgroundColor: 'blue',
            borderColor: 'blue',
            borderWidth: 1
        }

    });

    // ----------------------------------------


    linha_2021.done(function (data) {

        // vamos agrupar os dados em juliano por mes
        var dados_deteccoes_2021 = []
        for (let i = 0; i < data.length; i++) {
            let jan = 0, fev = 0, mar = 0, abr = 0, mai = 0, jun = 0, jul = 0, ago = 0, set = 0, out = 0,
                nov = 0,
                dec = 0;
            switch (getMonthFromJulianDay(data[i].start_doy)) { //vou agrupar as deteccoes por mes
                case '0':
                    jan += linha_2021_response[i].detections
                    break;
                case '1':
                    fev += linha_2021_response[i].detections
                    break;
                case '2':
                    mar += linha_2021_response[i].detections
                    break;
                case '3':
                    abr += linha_2021_response[i].detections
                    break;
                case '4':
                    mai += linha_2021_response[i].detections
                    break;
                case '5':
                    jun += linha_2021_response[i].detections
                    break;
                case '6':
                    jul += linha_2021_response[i].detections
                    break;
                case '7':
                    ago += linha_2021_response[i].detections
                    break;
                case '8':
                    set += linha_2021_response[i].detections
                    break;
                case '9':
                    out += linha_2021_response[i].detections
                    break;
                case '10':
                    nov += linha_2021_response[i].detections
                    break;
                case '11':
                    dec += linha_2021_response[i].detections
                    break;
            }
            if (i === data.length) //aqui ele evita de adicionar no array toda hora os valores
                dados_deteccoes_2021.push(jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dec); //crio o array na ordem
        }

        x = { //GERO A LINHA 2 COM OS DADOS AGRUPADOS
            label: 'Detecções 2021',
            data: dados_deteccoes_2021,
            backgroundColor: 'green',
            borderColor: 'green',
            borderWidth: 1
        }

    });

    var ctxx = $("#detec-ano") // CRIO O CHART 2
    var myChart = new Chart(ctxx, { //gero um chart
        type: 'line',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [y, x]
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

});