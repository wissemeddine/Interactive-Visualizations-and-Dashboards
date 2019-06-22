function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  var url = "/metadata/" + sample;
  // Use `d3.json` to fetch the metadata for a sample
  d3.json(url).then(function(response) {
    // Use d3 to select the panel with id of `#sample-metadata`
    var metadata_panel = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    metadata_panel.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    Object.entries(response).forEach(function([key, value]) {
    // Hint: Inside the loop, you will need to use d3 to append new
    var row = metadata_panel.append("tr");
    // tags for each key-value in the metadata.
    var cell = row.append("td");
    cell.text(`${key}: ${value}`);
    // BONUS: Build the Gauge Chart
   


});

    // buildGauge(data.WFREQ);
    buildGauge(response.WFREQ);
});
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = "/samples/" + sample;
  d3.json(url).then(function(response) {

    // @TODO: Build a Bubble Chart using the sample data
    // @TODO: Build a Pie Chart
    var pieData = [{
      values: pieValue,
      labels: pielabel,
      hovertext: pieHover,
      type: 'pie'
    }];
    var pieLayout = {
      margin:{t:0,1:0}
      };
    Plotly.newPlot('pie', pieData,pieLayout);
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    var topSamples = response.sample_values.slice(0,10);
    var topIds = response.otu_ids.slice(0,10);
    var sampleLabels = response.otu_labels.slice(0,10);
    var topSamples = response.sample_values.slice(0,10);
    var topIds = response.otu_ids.slice(0,10);
    var sampleLabels = response.otu_labels.slice(0,10);
    var layout = {
      height: 400,
      width: 600
    };
    var pieValue = sample_values.slice(0,10);
   var pielabel = otu_ids.slice(0, 10);
   var pieHover = otu_labels.slice(0, 10);


 
  });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
