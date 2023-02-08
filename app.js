//d3 read
function basic(sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var resultsarray = metadata.filter(sampleobject =>
            sampleobject.id == sample);
        var result = resultsarray[0]
        var panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(result).forEach(([key,value]) => {
            panel.append("h6").text(`${key}: ${value}`);
        });
    });
}

//create chart
function CreateCharts(sample) {
d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var resultsarray = samples.filter(sampleobject =>
        sampleobject.id == sample);
    var result = resultsarray[0]
    var ids = results.otu_ids;
    var labels = results.otu_labels;
    var values = result.sample_values;
    
    //bar chart
    var BarData = [
    {
        y:ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
        x:values.slice(0,10).reverse(),
        text:labels.slice(0,10).reverse(),
        type:"bar",
        orientation: "h"
    }];
    var BarchartDisplay = {
    title: "Top 10 OTUs found",
    margin: { t:30, l: 150}};
    Plotly.newPlot("bar", BarData, BarchartDisplay);
    //bubble chart
    var BubbleData = [
    {
        x: ids,
        y: values,
        text: labels,
        mode: "markers",
        marker: {
            color: ids,
            size: values,
            }
    }
    ];
    var BubbleDisplay = {
        margin: { t:0 },
        xaxis: { title: "OTU_ID"},
        hovermode: 'closest',
    };
    Plotly.newPlot("bubble", BubbleData, BubbleDisplay);
    })};
function init() {
var selector = d3.select("#selDataset");

//create dropdown list
d3.json("samples.json").then((data) => {
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
    });
    //try with first sample
    const firstSample = sampleNames[0];
    CreateCharts(firstSample);
    basic(firstSample);
});
}
//all functions
function All(newSample) {
    CreateCharts(newSample);
    basic(newSample);
}
//dashboard
init();

    
        
    








