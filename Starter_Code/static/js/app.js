//Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    
    //get metadata field
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let filtered = metadata.filter(sampleobj=> sampleobj.id==sample)[0];
    
    // Select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");
    
    // Clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.

    for(key in filtered){
      //console.log(key,filtered[value]);
      panel.append("h6").text(`${key}: ${filtered[key]}`);
    };

  });

};

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field

    let samples = data.samples;

    // Filter the samples for the object with the desired sample number

    let resultsArray = samples.filter(obj=> obj.id == sample);
    let results = resultsArray[0]; 


    // Get the otu_ids, otu_labels, and sample_values

    let otu_ids = results.otu_ids;
    let otu_labels = results.otu_labels;
    let sample_values = results.sample_values;


    // Build a Bubble Chart

    let bubbleLayout = {
      title: "Bacteria Cultures per Sample",
      margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
      yaxis: {title: "Number of Bacteria"},
      margin: { t: 30 }
    };
    let bubbleData = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "Earth"
      }
    }];
   

    // Render the Bubble Chart

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yticks= otu_ids.map(otu_id=> `OTU ${otu_id}`)
    
    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately

    let trace1 = {
      x: sample_values.slice(0,10).reverse(),
      y: yticks.slice(0,10).reverse(),
      type: 'bar',
      orientation:'h', 
      text: otu_labels.slice(0,10).reverse(),
    };
    
    let data1 = [trace1];
    
    let layout = {
      title: "Top 10 Bacteria Cultures Found", 
      margin: { t: 30, l:140 },
      xaxis: { title: "Number of Bacteria" }
    };


    // Render the Bar Chart
    Plotly.newPlot("bar", data1, layout);

  });
}

// // Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`

    let dropdownMenu = d3.select("#selDataset");


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.

    for (let i=0; i<names.length; i++){
      dropdownMenu.append("option").text(names[i]).property("value",names[i]);
    };

    // Get the first sample from the list

    firstSample = names[0];

    // Build charts and metadata panel with the first sample

    buildCharts(firstSample);
    buildMetadata(firstSample);

  });
}

//Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
};

// Initialise the dashboard
init();
