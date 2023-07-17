// set the dimensions and margins of the graph
// const margin = {top: 10, right: 30, bottom: 30, left: 60},
//     width = 460 - margin.left - margin.right, 370
//     height = 400 - margin.top - margin.bottom; 360

// append the svg2 object to the body of the page
const svg2 = d3.select("#scatterplot")
    .append("svg")
    .attr("width", 750)
    .attr("height", 500)
    .append("g")
    .attr("transform",
        `translate(60, 10)`);

//Read the data
d3.csv("age_preds.csv").then(function (data) {

    // Add X axis
    const x = d3.scaleLinear()
        .domain([0, 60])
        .range([0, 500]);
    svg2.append("g")
        .attr("transform", `translate(0, 400)`)
        .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, 60])
        .range([400, 0]);
    svg2.append("g")
        .call(d3.axisLeft(y));

    // Color scale: give me a specie name, I return a color
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.Subgroup))
        .range(d3.schemeCategory10)

    // Add dots
    svg2.append('g')
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x(d.pred); })
        .attr("cy", function (d) { return y(d.Value); })
        .attr("r", 4)
        .style("fill", function (d) { return color(d.Subgroup) })

    svg2.append('text')
        .attr('x', - 360 / 2)
        .attr('y', - 60 * 0.7)
        .attr('transform', 'rotate(-90)')
        .attr('class', 'label')
        .append('tspan').text('Actual rate (%)')
        .style('font-size', '1em');

    //label
    svg2.append("text").attr("x", 100).attr("y", 430).text("Predicted Anxiety and Depression Rate (%)").style("font-size", "13px").attr("alignment-baseline", "middle")
    svg2.append("text").attr("x", 20).attr("y", 5).text("R−squared: 0.92, RMSE: 3.3").style("font-size", "17px").attr("alignment-baseline", "middle")

    svg2.append("circle").attr("cx", 500).attr("cy", 130).attr("r", 5).style("fill", "rgb(31, 119, 180)")
    svg2.append("circle").attr("cx", 500).attr("cy", 160).attr("r", 5).style("fill", "rgb(255, 127, 14)")
    svg2.append("circle").attr("cx", 500).attr("cy", 190).attr("r", 5).style("fill", "rgb(214, 39, 40)")
    svg2.append("circle").attr("cx", 500).attr("cy", 220).attr("r", 5).style("fill", "rgb(44, 160, 44)")
    svg2.append("circle").attr("cx", 500).attr("cy", 250).attr("r", 5).style("fill", "rgb(148, 103, 189)")
    svg2.append("circle").attr("cx", 500).attr("cy", 280).attr("r", 5).style("fill", "rgb(227, 119, 194)")
    svg2.append("circle").attr("cx", 500).attr("cy", 310).attr("r", 5).style("fill", "rgb(140, 86, 75)")

    svg2.append("text").attr("x", 500).attr("y", 100).text("Age Group").style("font-size", "13px").attr("alignment-baseline", "middle")
    svg2.append("text").attr("x", 520).attr("y", 130).text("18 − 29 years").style("font-size", "13px").attr("alignment-baseline", "middle")
    svg2.append("text").attr("x", 520).attr("y", 160).text("30 − 39 years").style("font-size", "13px").attr("alignment-baseline", "middle")
    svg2.append("text").attr("x", 520).attr("y", 190).text("40 − 49 years").style("font-size", "13px").attr("alignment-baseline", "middle")
    svg2.append("text").attr("x", 520).attr("y", 220).text("40 − 49 years").style("font-size", "13px").attr("alignment-baseline", "middle")
    svg2.append("text").attr("x", 520).attr("y", 250).text("60 − 69 years").style("font-size", "13px").attr("alignment-baseline", "middle")
    svg2.append("text").attr("x", 520).attr("y", 280).text("70 − 79 years").style("font-size", "13px").attr("alignment-baseline", "middle")
    svg2.append("text").attr("x", 520).attr("y", 310).text("80 years and above").style("font-size", "13px").attr("alignment-baseline", "middle")


});