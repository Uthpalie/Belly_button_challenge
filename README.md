# Belly_button_challenge
This repository contains work done with JavaScript. This particular challenge required to create an interactive dashboard for the belly button experiments where the samples for each person ID is filtered to obtain their specific demographic details, bar chart containing top ten bacteria culture data and corresponding buble chart.

### The following were conducted:

Complete the following steps:

### Use the D3 library to read in samples.json from the URL https://static.bc-edx.com/data/dla-1-2/m14/lms/starter/samples.json.

-Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

Use sample_values as the values for the bar chart.

Use otu_ids as the labels for the bar chart.

Use otu_labels as the hovertext for the chart.

- Create a bubble chart that displays each sample.

Use otu_ids for the x values.

Use sample_values for the y values.

Use sample_values for the marker size.

Use otu_ids for the marker colors.

Use otu_labels for the text values.

- Display the sample's metadata, i.e., an individual's demographic information.

Loop through each key-value pair from the metadata JSON object and create a text string.

Append an html tag with that text to the #sample-metadata panel.


