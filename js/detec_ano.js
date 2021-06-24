import {getMonthFromJulianDay} from "../js/Data_Converter.js";

$(document).ready(async function () {
    let global_linha2020,global_linha2021;

    async function create_linha_2020() {
        $.get({ // AJAX request
            url: "http://172.23.14.98:3000/detect_count_by_month", // REST API com view no postgresql
            dataType: "json"
        }).done(function (data) {
            let dados_deteccoes_2020 = []

            for (let i = 0; i < data.length; i++) {
                dados_deteccoes_2020.push(data[i].detections);
            }

            global_linha2020 = {
                label: 'Detecções 2020',
                data: dados_deteccoes_2020,
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1
            }

        }).fail(function () {
            console.log("ERROR !!");
            $("#detec-ano").parent("div").append('<span style="color:red;font-size: 30px"> ERROR AO CARREGAR CHART</span>')
        })
    }

    async function create_linha_2021() {
        $.get({ // AJAX request
            url: "http://172.23.14.98:3000/detection_2021_count_juliandate", // REST API com view no postgresql
            dataType: "json"
        })
            .done(function (data) {
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
                    global_linha2021 = { //GERO A LINHA 2 COM OS DADOS AGRUPADOS
                        label: 'Detecções 2021',
                        data: dados_deteccoes_2021,
                        backgroundColor: 'green',
                        borderColor: 'green',
                        borderWidth: 1
                    };
                }

            })
    }

    await create_linha_2020();
    await create_linha_2021();


//RESOLVER OS CALL BACK PARA GERAR O GRAFICO
    console.log(global_linha2020)
    console.log(global_linha2021)
    var ctx = $("#detec-ano") // CRIO O CHART 2
    var myChart = new Chart(ctx, { //gero um chart
        type: 'line',
        data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            datasets: [global_linha2020, global_linha2021]
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