
var margin = { top: 20, left: 75, bottom: 50, right: 50 },
width = 1300 - margin.left - margin.right,
height = 650 - margin.top - margin.bottom;

var svg = d3.select('#statebarchart').append('svg')
.attr('width', width + margin.left + margin.right)
.attr('height', height + margin.top + margin.bottom)
.append('g')
.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

var all, closer, farther, earth;
d3.json('state.json', d => {
return {
    name: d.Subgroup,
    value: +d.Value
};
}).then(data => {
reset = data.sort((a, b) => d3.ascending(a.Subgroup, b.Subgroup));
all50 = data.slice();
top10 = data.sort((a, b) => d3.descending(a.Value, b.Value)).slice(0, 10);
bottom10 = data.sort((a, b) => d3.ascending(a.Value, b.Value)).slice(0, 10);


//set initial state
filter('#reset');
sort('#name');

toggleFilter('#all50');
toggleSort('#name');

draw();
});

///////////////////////////////////////////////////////////////
// Controls
///////////////////////////////////////////////////////////////

var current, sortMode, filterMode;

//sort event handlers
d3.select('#name')
.on('click', () => {
    sort('#name');
    transition();
    toggleSort('#name');
});

d3.select('#value')
.on('click', () => {
    //🚧 implement sort by temperature
    sort('#value');
    transition();
    toggleSort('#value');
});

d3.select('#devalue')
.on('click', () => {
    //🚧 implement sort by gravity
    sort('#devalue');
    transition();
    toggleSort('#devalue');
});

//filter event handlers
d3.select('#reset')
.on('click', () => {
    filter('#all10');
    sort(sortMode);
    toggleSort(sortMode);
    toggleFilter('#all10');
    sort('#name');
    transition();
    toggleSort('#name');
    redraw();
});

d3.select('#all50')
.on('click', () => {
    filter('#all50');
    sort(sortMode);
    toggleSort(sortMode);
    toggleFilter('#all50');
    sort('#name');
    transition();
    toggleSort('#name');
    redraw();
});

d3.select('#top10')
.on('click', () => {
    filter('#top10');
    sort(sortMode);
    toggleSort(sortMode);
    toggleFilter('#top10');
    sort('#devalue');
    transition();
    toggleSort('#devalue');
    redraw();
});

d3.select('#bottom10')
.on('click', () => {
    filter('#bottom10');
    sort(sortMode);
    toggleSort(sortMode);
    toggleFilter('#bottom10');
    sort('#value');
    transition();
    toggleSort('#value');
    redraw();
});

function filter(mode) {
if (mode === '#reset') {
    current = JSON.parse(JSON.stringify(reset));
} else if (mode === '#all50') {
    current = JSON.parse(JSON.stringify(all50));
} else if (mode === '#top10') {
    current = JSON.parse(JSON.stringify(top10));
} else if (mode === '#bottom10') {
    current = JSON.parse(JSON.stringify(bottom10));
}
filterMode = mode;
}

function sort(mode) {
if (mode === '#name') {
    current.sort((a, b) => d3.ascending(a.Subgroup, b.Subgroup));
    //🚧 update x axis label
    xlabel = 'Sorted data in ascending order by name'
    draw();

} else if (mode === '#value') {
    current.sort((a, b) => d3.ascending(a.Value, b.Value));
    //🚧 update x axis label
    xlabel = 'Sorted data in ascending order by value'
    draw();
} else if (mode === '#devalue') {
    current.sort((a, b) => d3.descending(a.Value, b.Value));
    //🚧 update x axis label
    xlabel = 'Sorted data in descending order by value'
    draw();
}
x.domain(current.map(d => d.Subgroup));
sortMode = mode;
}

function toggleSort(id) {
d3.selectAll('.sort')
    .style('background-color', '#eee');
d3.select(id)
    .style('background-color', 'lightblue'); // #add8e6 is hex code for lightblue
}

function toggleFilter(id) {
//🚧 write code to toggle buttons with class .filter here
d3.selectAll('.filter')
    .style('background-color', '#eee');
d3.select(id)
    .style('background-color', 'yellow');
}

///////////////////////////////////////////////////////////////
// draw the chart
///////////////////////////////////////////////////////////////

var x = d3.scaleBand();
var y = d3.scaleLinear();

var delay = function (d, i) {
return i * 50;
};

function redraw() {
//update scale
x.domain(current.map(d => d.Subgroup));

////////////////////////////////
// DATA JOIN FOR BARS.
var bars = svg.selectAll('.bar')
    .data(current, d => d.Subgroup);

// UPDATE.
bars.transition()
    .duration(750)
    .delay(delay)
    .attr('x', d => x(d.Subgroup))
    .attr('width', x.bandwidth());

// ENTER.
bars.enter()
    .append('rect')
    .attr('x', d => x(d.Subgroup))
    .attr('y', d => y(0))
    .attr('width', x.bandwidth())
    .transition()
    .duration(750)
    .attr('class', 'bar')
    .attr('x', d => x(d.Subgroup))
    .attr('y', d => y(d.Value))
    .attr('width', x.bandwidth())
    .attr('height', d => height - y(d.Value));

// EXIT.
bars.exit()
    .transition()
    .duration(750)
    .style('opacity', 0)
    .remove();

////////////////////////////////
// DATA JOIN FOR NAMES.
var name = svg.selectAll('.name')
    .data(current, d => d.Subgroup);

// UPDATE.
name.transition()
    .duration(750)
    .delay(delay)
    .attr('x', (d, i) => x(d.Subgroup) + x.bandwidth() / 2);

// ENTER.
name.enter()
    .append('text')
    .attr('x', d => x(d.Subgroup) + x.bandwidth() / 2)
    .attr('y', d => y(d.Value) + (height - y(d.Value)) / 2)
    .style('opacity', 0)
    .transition()
    .duration(1000)
    .text(d => d.name)
    .attr('class', 'name')
    .attr('x', d => x(d.name) + x.bandwidth() / 2)
    .attr('y', d => y(d.Value) + (height - y(d.Value)) / 2)
    .style('opacity', 1);

// EXIT.
name.exit()
    .transition()
    .duration(750)
    .style('opacity', 0)
    .remove();
}

function transition() {
var transition = svg.transition()
    .duration(750);

transition.selectAll('.bar')
    .delay(delay)
    .attr('x', d => x(d.Subgroup));

transition.selectAll('.name')
    .delay(delay)
    .attr('x', d => x(d.Subgroup) + x.bandwidth() / 2);
}

function draw() {
x.domain(current.map(d => d.Subgroup))
    .range([0, width])
    .paddingInner(0.2);

y.domain([0, d3.max(current, d => d.Value)])
    .range([height, 0]);

svg.selectAll('.bar')
    .data(current, d => d.Subgroup)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.Subgroup))
    .attr('y', d => y(d.Value))
    .attr('width', x.bandwidth())
    .attr('height', d => height - y(d.Value));

svg.selectAll('.name')
    .data(current, d => d.Subgroup)
    .enter()
    .append('text')
    .text(d => d.Subgroup)
    .attr('class', 'name')
    .attr('x', d => x(d.Subgroup) + x.bandwidth() / 2)
    .attr('y', d => y(d.Value) + (height - y(d.Value)) / 2);

var xAxis;
xAxis = d3.axisBottom()
    .scale(x)
    .ticks(0)
    .tickSize(0)
    .tickFormat('');

svg.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);

svg.selectAll('.label').remove()
svg.append('text')
    .attr('x', width / 2)
    .attr('y', height + 20)
    .attr('class', 'label')
    .text(xlabel);  //🚧 update the label based on sort mode

var yAxis = d3.axisLeft()
    .scale(y)
    .ticks(5, 'd');

svg.append('g')
    .attr('class', 'axis')
    .call(yAxis);

svg.append('text')
    .attr('x', - height / 2)
    .attr('y', - margin.left * 0.7)
    .attr('transform', 'rotate(-90)')
    .attr('class', 'label')
    .append('tspan').text('Depressive disorder rate')
    .style('font-size', '1.5em');
}