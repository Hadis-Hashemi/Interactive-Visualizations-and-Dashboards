// form.on("submit",getIDPlot);

id = "941";
function getIDPlot(id) {
// getting data from json file 
d3.json("../../samples.json").then((data) => {
  console.log(data)

  var wfreq = data.metadata.map(d => d.wfreq)
  console.log(`Washing Freq:`, wfreq);
  
// filter the data based on user's ID
  var filteredSample = data.samples.filter(asdf => asdf.id.toString() === id)[0];
  console.log(filteredSample);

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
                  color: {colors: ['yellow', 'red']}

              };
              var data2 = [trace2];
          Plotly.newPlot("bubble", data2, layout_2); 
    
// create Basic Gauge
var trace3 = 
	{
		domain: { x: [0, 1], y: [0, 1] },
		value: parseFloat(wfreq),
		title: { text: "Belly Button washing Frequency" },
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


Plotly.newPlot("gauge", data3, layout3);

})
};



// create the function to get the necessary data
function getInfo(id) {
  // read the json file to get data
  d3.json("../../samples.json").then((data)=> {
      

      // select demographic panel to put data 
 
var selDataSet = d3.select("#selDataset");
var idNew = selDataSet.property("value");
console.log(idNew)


      // get the metadata info for the demographic panel
      var metadata = data.metadata;

      console.log(metadata)

      // // filter meta data info by id
      var result = metadata.filter(meta => meta.id.toString() === id)[0];
      var selectedID = result.id;
      var selectedEtnicity = result.ethnicity;
      var selectedGender = result.gender;
      var selectedAge = result.age;
      var selectedLocation = result.location;
      var selectedBbtype = result.bbtype ;
      var selectedFreq = result.wfreq;

      var dic = {
        "id": selectedID, 
        "ethnicity":selectedEtnicity,
        "gender": selectedGender,
        "age": selectedAge,
        "location": selectedLocation,
        "bbtype": selectedBbtype,
        "wfreq":selectedFreq
        };
      console.log(dic);
 
// select demographic panel to put data
var demographicInfo = d3.select("#sample-metadata");  
var input =   demographicInfo.property ("value"); 
d3.select("span").text(input);



  })


}

getIDPlot(id);
getInfo(id)







// button.on("click", runEnter);
// form.on("submit",runEnter);

// // Create the function to run for both events
// function runEnter() {

//   // Prevent the page from refreshing
//   d3.event.preventDefault();

//   // Select the input element and get the raw HTML node
//   var inputElement = d3.select("#example-form-input");

//   // Get the value property of the input element
//   var inputValue = inputElement.property("value");

//   // Print the value to the console
//   console.log(inputValue);

//   // Set the span tag in the h1 element to the text
//   // that was entered in the form
//   d3.select("h1>span").text(inputValue);
// }
