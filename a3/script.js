// Sample dataset
const dataset = [
    { year: 2016, rainfall: 3.0, type: "actual" },
    { year: 2017, rainfall: 4.5, type: "actual" },
    { year: 2018, rainfall: 2.5, type: "actual" },
    { year: 2019, rainfall: 3.5, type: "actual" },
    { year: 2020, rainfall: 4.0, type: "estimated" },
    { year: 2021, rainfall: 2.5, type: "estimated" },
    { year: 2022, rainfall: 3.0, type: "actual" },
    { year: 2023, rainfall: 2.5, type: "actual" },
];

const width = 800;
const height = 500;
const margin = { top: 50, right: 50, bottom: 100, left: 50 };

const svg = d3.select("#rainfallChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Define the gradient
const defs = svg.append("defs");
const gradient = defs.append("linearGradient")
    .attr("id", "skyGradient")
    .attr("x1", "0%").attr("y1", "0%")
    .attr("x2", "0%").attr("y2", "100%");
gradient.append("stop")
    .attr("offset", "0%")
    .style("stop-color", "rgb(135,206,235)")
    .style("stop-opacity", 1);
gradient.append("stop")
    .attr("offset", "100%")
    .style("stop-color", "rgb(255,255,255)")
    .style("stop-opacity", 1);

// Background
svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "url(#skyGradient)");

// Scales
const xScale = d3.scaleBand()
    .domain(dataset.map(d => d.year))
    .rangeRound([margin.left, width - margin.right])
    .padding(0.1);

const yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, d => d.rainfall) + 1])
    .range([height - margin.bottom, margin.top]);

// Axis
svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(yScale));

// Bars
svg.selectAll(".bar")
    .data(dataset)
    .enter().append("rect")
    .attr("x", d => xScale(d.year))
    .attr("y", d => yScale(d.rainfall))
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - margin.bottom - yScale(d.rainfall))
    .attr("fill", d => d.type === "actual" ? "blue" : "orange");

// Legend
svg.append("rect").attr("x", 600).attr("y", 30).attr("width", 20).attr("height", 20).style("fill", "blue");
svg.append("text").attr("x", 630).attr("y", 45).text("Actual Data").style("font-size", "12px").attr("alignment-baseline","middle");
svg.append("rect").attr("x", 600).attr("y", 60).attr("width", 20).attr("height", 20).style("fill", "orange");
svg.append("text").attr("x", 630).attr("y", 75).text("Estimated Data").style("font-size", "12px").attr("alignment-baseline","middle");

// Note for estimated data
svg.append("text")
    .attr("x", 450)
    .attr("y", height - 10)
    .text("*Estimated Data for 2020 and 2021")
    .style("font-size", "12px")
    .attr("fill", "red");
