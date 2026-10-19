<<<<<<< HEAD
### Steps to run demo:

1. Run 'npm install', 'npm install d3' and 'npm install json' in project-professional-models folder.
2. Run Map_new.html on a local server.
3. Use the buttons at the top to navigate through the pages.

### Technologies and Methods Used:
1. Vanilla Javascript
2. D3.js
3. D3 enter and append selection.
4. CSS, Javascript, Bootstrap.

### Description of Charts:

1. US Choropleth map
This map makes use of topojson files to create a map of the USA with state borders highlighted. It is color coded according to rate of anxiety values color coded with a D3 sequential scale. The chart presents to the user the current anxiety/depression rates that might be vastly different accross states. While hovering over the chart with the mouse, a tooltip of the name of the state and the depression rate is shown. The user can also refer to the legend to get an idea of where the rates stand, with higher rates being coded in a deeper blue.

2. Interactive scatterplot of anxiety rate predictions by state.
This scatterplot is the result of our machine learning model -- comparing the predicted and actual rates of anxiety for the data points corresponding to different state. The points are color coded by state. With a mouse hover over the boxes in the legend, the corresponding data points for the state will enlarge and be highlighted, while all other points in the plot will turn grey. This allows the user to intuitively see where individual people stand corresponding to other people in other states. The user can also move the mouse pointer along the points in the chart, where the different points for the same state will apper and be highlighted.

3. Timeseries Multiline Chart
This chart is a timeline of the depression rate of 50 states. The use is able to over over the lines above to see the timeline corresponding to a specific state.

4. Barchart of Depresssion Rates
In this interactive barchart, the user can sort the 50 states according to name, ascending, descending, top 10 or bottom 10. The bars will animate and move between selections, to show the user where the diffrent states stand among each other.

5. Model Effectiveness charts
In the model page, the model effectiveness is being evaluated and shown in the form of two charts. The first chart is a barchart for each of the different subgroups that the model is broken down by. The user can see that the predictions are the most accurate when the data predicted by disabilty status. The scatterplot at the bottom of the page presents an example of a highly accurate predictive model. For our age group dataset, we were able to accurately predict the anxiety rates of different age groups, with a r-squared value of 0.92. The scatterplot is color coded by age group, with differences between the groups clearly seen.
=======

>>>>>>> e01b200360f325e3b520a9e12e067268f2a1af67
