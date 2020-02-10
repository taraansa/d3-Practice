
function makeScatterPLot(){   
    var data = [[100,50], [200,100], [ 300,150], [400,200], [500,250], [600,300], [700,350], [800,400]];
    var pxX = 500;
    var pxY = 300;
    var scX = d3.scaleLinear().domain(d3.extent(data,d => d[0])).range([10,pxX]);
    var scY = d3.scaleLinear().domain(d3.extent(data,d => d[1])).range([pxY,10]);
    var svg = d3.select("#practice1");

    svg.selectAll("circle")
        .data(data).enter().append("circle")
        .attr("r",5) .attr("fill","blue")
        .attr("cx",d => scX(d[0]))
        .attr("cy",d => scY(d[1]));
    }

function makeDualLine(){
    var data = [[1.0,0.001,0.63],[3.0,0.003,0.84],[4.0,0.024,0.56],[4.5,0.054,0.22],[4.6,0.062,0.15]];
    var svg = d3.select("#practice2");
    var pxX = svg.attr("width");
    var pxY = svg.attr("height");
    var padding = 40;
    var paddingMinor = 20;
    var scX = d3.scaleLinear().domain(d3.extent(data,d => d[0])).range([padding,pxX-padding]);
    var scY1 = d3.scaleLinear().domain(d3.extent(data,d => d[1])).range([pxY-padding,paddingMinor]);
    var scY2 = d3.scaleLinear().domain(d3.extent(data,d => d[2])).range([pxY-padding,paddingMinor]);
    
    var lineMaker = d3.line()
                        .x(d => scX(d[0])) 
                        .y(d => scY1(d[1]));
    var plot1 = d3.select("svg").append("g") .attr("id","ds1")
    var plot2 = d3.select("svg").append("g") .attr("id","ds2")


    plot1.selectAll("circle")
        .data(data).enter().append("circle")
        .attr("r",3) .attr("fill","blue")
        .attr("cx", d => scX(d[0]))
        .attr("cy", d => scY1(d[1]))

    
    plot1.append("path")
        .attr("fill","none") .attr("stroke","blue")
        .attr("d",lineMaker(data));

    lineMaker.y(d => scY2(d[2]));
    // lineMaker.curve(d3.curveStep);

    plot2.attr("fill", "green")
        .selectAll("circle")
        .data(data).enter().append("circle")
        .attr("r",3) 
        .attr("cx", d => scX(d[0]))
        .attr("cy", d => scY2(d[2]))
    
    plot2.append("path")
        .attr("fill","none") .attr("stroke","green")
        .attr("d",lineMaker(data)); 

    svg.append("g").call(d3.axisLeft(scY1))
                    .attr("transform", "translate(" + padding+ ",0)")
                    .attr("stroke", "blue");
                    
    svg.append("g").call(d3.axisRight(scY2))
                    .attr("transform", "translate(" + (pxX-padding)+ ",0)")
                    .attr("stroke", "green");

    svg.append("g").call(d3.axisBottom(scX))
                    .attr("transform", "translate(0," + (pxY-padding)+ ")");
        
}

function makeBar() {
    var data = [["apple", 20],["pear",30],["orange",15],["fig",12],["apricot",25]];
    var svg = d3.select("#practice3");
    var pxX = svg.attr("width");
    var pxY = svg.attr("height");
    var padding = 40;
    var paddingMinor = 20;
    var scX = d3.scaleBand().domain(d3.range(data.length)).range([padding,pxX-padding]).padding(0.1);
    var scY = d3.scaleLinear().domain([0,30]).range([pxY-padding,paddingMinor]);
 

    svg.selectAll("rect")
        .data(data).enter().append("rect")
        .attr("fill", "teal")
        .attr("x", (d,i) => scX(i))
        .attr("y",d => scY(d[1]))
        .attr("height", d =>scY(0)- scY(d[1]))
        .attr("width",scX.bandwidth());
    // console.log(d3.range(data.length));
    var xAxis = svg.append("g")
                    .call(d3.axisBottom(scX))
                    .attr("transform", "translate(0," + (pxY-padding)+ ")");
                    
    var xAxisLabel = xAxis.append("text")
                            .attr("x", pxX/2) 
                            .attr("y", 30)
                            .attr("fill", "black")
                            .text("Fruits")
                            .style('font-size', '15');         
                    

    var yAxis = svg.append("g").call(d3.axisLeft(scY))
                    .attr("transform", "translate(" + padding+ ",0)");

    var YAxisLabel = yAxis.append("text")
                            .attr("transform", "rotate(-90)")
                            .attr("x",-150 ) 
                            .attr("y", -25)
                            .attr("fill", "black")                         
                            .style("text-anchor", "end")
                            .text("Sales")
                            .style('font-size', '15'); 

}


function makeBarWithKey() {
    var dataPre = [["apple", 20],["pear",30],["orange",15],["fig",12],["apricot",25]];
    var dataPost = [["apple", 30],["pear",40],["kiwi",20],["fig",5],["apricot",12]];
    var svg = d3.select("#practice4");
    var pxX = svg.attr("width");
    var pxY = svg.attr("height");
    var padding = 40;
    var paddingMinor = 20;
    mx = d3.max((d3.merge([dataPre, dataPost])), d=> d[1])
    var scX = d3.scaleBand().domain(d3.range(dataPre.length)).range([padding,pxX-padding]).padding(0.1);
    var scY = d3.scaleLinear().domain([0,mx]).range([pxY-padding,paddingMinor]);
           
    var bars = svg.selectAll("rect")
                    .data(dataPre,d => d[0])
                    .enter().append("rect")
                    .attr("fill", function(d){
                        if (d[1] > 20){ return "red"}
                        else { return "blue"}
                    })
                    // .attr("fill", d => d[1]>10:"blue"|"red")          
                    .attr("x",(d,i) => scX(i))
                    .attr("y", d => scY(d[1]))
                    .attr("height", d => scY(0) - scY(d[1]))
                    .attr("width", d => scX.bandwidth());


    var yAxis = svg.append("g")
                    .attr("transform", "translate(" + padding+ ",0)")
                    .call(d3.axisLeft(scY));


    var barlabel = svg.selectAll("text")
                        .data(dataPre,d => d[0])                        
                        .enter().append("text")
                        .attr("x", (d,i) => scX(i))
                        .attr("y", d => scY(d[1]))
                        .text(d => d[0] + "," + d[1]);

    
    svg.on("click", function(){
        [dataPre, dataPost] = [dataPost, dataPre];

        // scY.domain([0, d3.max(dataPre, d=> d[1])]);

        // yAxis.transition()
        //     .duration(1000)
        //     .call(d3.axisLeft(scY));

        bars.data(dataPre,d => d[0])
            .transition().duration(1000)
            .attr("y", d => scY(d[1]))
            .attr("height", d => scY(0) - scY(d[1]));

        barlabel.data(dataPre,d => d[0])
                .transition().duration(1000)
                .attr("y", d => scY(d[1]))
                .text(d => d[0] + "," + d[1]);
    });
}

function makeBarDiffData() {
    var dataPre = [["apple", 20],["pear",30],["orange",15],["fig",12],["apricot",25]];
    var dataPost = [["apple", 30],["pear",40],["kiwi",20],["fig",5],["apricot",12]];
    var svg = d3.select("#practice4");
    var pxX = svg.attr("width");
    var pxY = svg.attr("height");
    var padding = 40;
    var paddingMinor = 20;
    

    svg.on("click", function(){
        [dataPre, dataPost] = [dataPost, dataPre];

        var scX = d3.scaleBand().domain(d3.range(dataPre.length)).range([padding,pxX-padding]).padding(0.1);
        var scY = d3.scaleLinear().domain([0, d3.max(dataPre, d=> d[1])]).range([pxY-padding,paddingMinor]);
   
        var bars = svg.selectAll("rect")
                        .data(dataPre,d => d[0]);
        
        bars.exit().remove();
                        
        bars =  bars.enter().append("rect")
                    .attr("fill", "blue")
                    .merge(bars);
        bars.transition().duration(5000).delay(200);            
        bars.attr("x",(d,i) => scX(i))
            .attr("y", d => scY(d[1]))
            .attr("height", d => scY(0) - scY(d[1]))
            .attr("width", d => scX.bandwidth());

        var yAxis = svg.append("g").call(d3.axisLeft(scY))
                    .attr("transform", "translate(" + padding+ ",0)");


        var barlabel = svg.selectAll("text")
                            .data(dataPre,d => d[0])
        barlabel.exit().remove();
                            
        barlabel = barlabel.enter().append("text")
                            .merge(barlabel);

        barlabel.attr("x", (d,i) => scX(i))
                .attr("y", d => scY(d[1]))
                .text(d => d[0] + "," + d[1]);

    });

    svg.dispatch("click");
}

function makeScatter(){
    var dataset = d3.csv("/data/apartmentPrices.csv", function(d){
                    return{
                        area: +d.GrLivArea,
                        price: +d.SalePrice
                    }               
        });  
    var xValue = function(d) { return d.area;} ;
    var yValue = function(d) { return d.price;} ;
    // .row(function(d){
    //                     return {area= +d.GrLivArea,
    //                             price= +d.SalePrice
    //                     };
    //                 })
    //                 .get(function(d){
    //                     console.log(d);
    //             });

    // console.log(data1);
    // var data1  = [[100,50], [200,100], [ 300,150], [400,200], [500,250], [600,300], [700,350], [800,400]];

    var svg = d3.select("#practice5");
    var pxX = svg.attr("width");
    var pxY = svg.attr("height");
    var padding = 40;
    var paddingMinor = 20;

    var scX = d3.scaleLinear()
                .domain([0,4000])
                .range([paddingMinor, pxX-padding]);
    var scY = d3.scaleLinear()
                .domain([0,500000])
                .range([pxY-padding,paddingMinor]);

    var plot = svg.selectAll("circle")
                    .data(dataset).enter().append("circle")
                    .attr("cx", d => scX(xValue))
                    .attr("cy", d => scY(yValue))
                    .attr("r", 5)
                    .attr("fill", "blue");
                    // d3.extent(data1, d => d.area)
}
