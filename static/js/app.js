d3.json("../../samples.json").then(function (data) {

    console.log(data)

    data.names.map(item => d3.select("#selDataset").append("option").attr("value", item).text(item))
    updateBarChart()
    d3.select("#selDataset").on("change", updateBarChart)

    function updateBarChart() {

        id = parseInt(d3.select("#selDataset").property("value"))
        console.log(id)

        data_id = data.samples.filter(item => item.id == id)

        let sample_values = data_id[0].sample_values
        let otu_ids = data_id[0].otu_ids
        let otu_ids_string = data_id[0].otu_ids.map(item => "OTU " + item)
        let otu_labels = data_id[0].otu_labels

        trace = {
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids_string.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
            text: otu_labels.slice(0, 10).reverse()
        }

        plotdata = [trace]

        var layout = {
            title:`OTU for Subject ID: ${id}`
        }

        Plotly.newPlot("bar", plotdata, layout)

        trace_bubble = {
            y: sample_values,
            x: otu_ids,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids
            },
            text: otu_labels
        }

        var layout = {
            title: 'Bubble Chart',
            showlegend: false,
            height: 600,
            width: 1200,
            xaxis: {
                title: 'OTU',
                titlefont: {
                    family: 'Arial, sans-serif',
                    size: 18,
                    color: 'lightgrey'
                }
            }
        };
        plotdata = [trace_bubble]
        Plotly.newPlot("bubble", plotdata, layout)


    }

})





// function updateBarChart(id) {

//     data_id = data.samples.filter(item => item.id == id)

//     let sample_values = data_id[0].sample_values
//     let otu_ids = data_id[0].otu_ids
//     let otu_ids_string = data_id[0].otu_ids.map(item => "OTU " + item)
//     let otu_labels = data_id[0].otu_labels

//     trace = {
//         x: sample_values.slice(0, 10).reverse(),
//         y: otu_ids_string.slice(0, 10).reverse(),
//         type: "bar",
//         orientation: "h",
//         text: otu_labels.slice(0, 10).reverse()
//     }

//     plotdata = [trace]

//     Plotly.newPlot("bar", plotdata)
// }
// let id = 940
// let data_id = data[0].samples.filter(item => item.id == 940)

// let sample_values = data_id[0].sample_values
// let otu_ids = data_id[0].otu_ids
// let otu_ids_string = data_id[0].otu_ids.map(item => "OTU " + item)
// let otu_labels = data_id[0].otu_labels

// // let id_sv = []
// // for (i=0; i < otu_ids.length; i++){
// //     id_sv.push([otu_ids[i], sample_values[i]])
// // }
// // id_sv.sort((a,b) => b[1]-a[1])
// // console.log(id_sv)

// console.log(otu_ids)
// console.log(sample_values)

// trace = {
//     x: sample_values.slice(0, 10).reverse(),
//     y: otu_ids_string.slice(0, 10).reverse(),
//     type: "bar",
//     orientation: "h",
//     text: otu_labels.slice(0, 10).reverse()
// }
// plotdata = [trace]
// Plotly.newPlot("bar", plotdata)

// trace_bubble = {
//     y: sample_values,
//     x: otu_ids,
//     mode: "markers",
//     marker: {
//         size: sample_values,
//         color: otu_ids
//     },
//     text: otu_labels
// }

// var layout = {
//     title: 'Bubble Chart',
//     showlegend: false,
//     height: 600,
//     width: 1200,
//     xaxis: {
//         title: 'OTU',
//         titlefont: {
//             family: 'Arial, sans-serif',
//             size: 18,
//             color: 'lightgrey'
//         }
//     }
// };
// plotdata = [trace_bubble]
// Plotly.newPlot("bubble", plotdata, layout)
// console.log(data_id)
// d3.select("#id").text(`id: ${data_id[0].id}`)
// // d3.select("#id").text(`id: ${data_id[0].id}`)
// // d3.select("#id").text(`id: ${data_id[0].id}`)
// // d3.select("#id").text(`id: ${data_id[0].id}`)
// // d3.select("#id").text(`id: ${data_id[0].id}`)