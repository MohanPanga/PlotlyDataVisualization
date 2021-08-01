// d3.json("../../samples.json").then(function (data) {
url = "samples.json"

d3.json(url).then(function (data) {
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
            title: `OTU for Subject ID: ${id}`
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

        var layout_bubble = {
            title: `Sample Values vs OTU for Subject ID:${id}`,
            showlegend: false,
            height: 600,
            width: 1200,
            xaxis: {
                title: 'OTU',
                titlefont: {
                    family: 'Arial, sans-serif',
                    size: 18,
                    color: 'black'
                }
            }
        }
        bubbledata = [trace_bubble]
        Plotly.newPlot("bubble", bubbledata, layout_bubble)

        metadata = data.metadata.filter(item => item.id == id)
        keys = Object.keys(metadata[0])
        d3.select("#Demographic").selectAll("li").remove()
        keys.map(item => d3.select("#Demographic").append("li").text(`${item} : ${metadata[0][item]}`))

    }

})