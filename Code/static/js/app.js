
// id = "941";
function getIDPlot(id) {
// getting data from json file 
d3.json("Code/samples.json").then((data) => {
  console.log(data)

  

// filter the data based on user's ID

  var filteredSample = data.samples.filter(data => data.id.toString() === id)[0];
  console.log(filteredSample);

  var metadata = data.metadata.filter(data => data.id.toString() === id)[0];
  console.log(metadata.wfreq);
  var wfreq = metadata.wfreq;
  console.log(`Washing Freq:`, wfreq);


// grap sample_value, otu_ids and otu_labele and then slice it 
  var sample_values = filteredSample["sample_values"].slice(0, 10).reverse();
  console.log(sample_values);

  var otu_ids = filteredSample.otu_ids.slice(0, 10).reverse();
  var otu_ids_map = otu_ids.map(d => "OTU" + d )
  console.log(otu_ids_map);  

  var labels = filteredSample.otu_labels.slice(0, 10);
  console.log(labels);  

// create a plot for selected ID
var trace1 = {
          y: otu_ids_map,
          x: sample_values,  
          text: labels,
          type: "bar",
          orientation: "h"
          
        };
var data1 = [trace1];
        
Plotly.newPlot("bar", data1);

var trace2 = {
          x: otu_ids,
          y: sample_values,
          mode: "markers",
          marker: {
            size: sample_values,
            color:otu_ids
            },
              };
              var layout_2 = {
                  xaxis:{title: "OTU ID"},
                  color: {colors: ['green', 'blue']},
                  colorscale: "Earth"

              };
              var data2 = [trace2];
          Plotly.newPlot("bubble", data2, layout_2); 
    
// create Basic Gauge
var trace3 = 
	{
    type: "pie",
    showlegend: false,
    domain: { x: [0, 1], y: [0, 1] },
    hole: .4,
    rotation: 90,
		value: parseFloat(wfreq),
    title: { text: "Belly Button washing Frequency" },
            text: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ""],

		type: "indicator",
    mode: "gauge+number",

    gauge: { axis: { range: [null, 9] },
           steps: [
            { range: [0, 1], color: "#FFFFF0" },
            { range: [1, 2], color: "#FFEFD5" },
            { range: [2, 3], color: "#FFF0F5" },
            { range: [3, 4], color: "#FFB6C1" },
            { range: [4, 5], color: "#F08080" },
            { range: [5, 6], color: "#AFEEEE" },
            { range: [6, 7], color: "#87CEEB" },
            { range: [7, 8], color: "#4682B4" },
            { range: [8, 9], color: "#6A5ACD" },
          
          ]}
    
	};

  var data3= [trace3];

var layout3 = { width: 600, height: 500

};

var gaugeElement = d3.select("#gauge");
gaugeElement.html("");

Plotly.newPlot("gauge", data3, layout3);

})
};



// create the function to get the necessary data
function getInfo(id) {
  // read the json file to get data
  d3.json("Code/samples.json").then((data)=> {
      



      // get the metadata info for the demographic panel
      var metadata = data.metadata;

      // console.log(metadata)

      // // // filter meta data info by id
     var result = metadata.filter(meta => meta.id.toString() === id)[0];
     
 
// select demographic panel to put data
var demographicInfo = d3.select("#sample-metadata");
demographicInfo.html("");
Object.entries(result).forEach(([key,value]) =>{
  demographicInfo.append('h5').text(`${key}: ${value}`);


});



  })


}


function optionChanged(id){
getIDPlot(id);
getInfo(id);


}










