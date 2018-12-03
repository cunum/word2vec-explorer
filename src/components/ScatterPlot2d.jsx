import React, { Component } from 'react'
import * as d3 from 'd3';

class ScatterPlot2d extends Component {

  constructor (props) {
    super(props);
    this.state = {
      points: props.points,
      clusters: props.clusters,
      labels: props.labels,
      showLabels: props.showLabels,
      clusterFilter: props.clusterFilter
    }
    this.plotRef = React.createRef();
    this.showLabels = React.createRef();
  }

  componentDidMount () {
    this._renderD3()
    this._updateD3()
  }

  componentWillReceiveProps(props) {
    if (this.state.points !== props.points ||
      this.state.clusters !== props.clusters ||
      this.state.labels !== props.labels ||
      this.state.showLabels !== props.showLabels ||
      this.state.clusterFilter !== props.clusterFilter
    ) {

      let points = [];
      let clusters = [];
      let labels = [];
      if (props.clusterFilter) {
        for (let i = 0; i < props.clusters.length; i++) {
          if (props.clusters[i] === props.clusterFilter) {
            points.push(props.points[i]);
            clusters.push(props.clusters[i]);
            labels.push(props.labels[i]);
          }
        }
      } else {
        points = props.points;
        clusters = props.clusters;
        labels = props.labels;
      }

      this.setState({
        points,
        clusters,
        labels,
        showLabels: props.showLabels
      }, () => this._updateD3());
    }
  }

  render () {
    let scatterClasses = 'scatter-plot-2d'
    if (this.state.showLabels) scatterClasses += ' show-labels'
    return (
      <div className='scatter-plot-2d-container'>
        <div id='scatter-plot-2d' ref={this.plotRef} className={scatterClasses}>
        </div>
      </div>
    )
  }

  _nodeRadius () {
    var nodeRadius = 2
    if (this.state.points.length > 5000) nodeRadius = 1
    if (this.state.points.length < 500) nodeRadius = 3
    if (this.state.points.length < 50) nodeRadius = 4
    return nodeRadius
  }

  _maxLabelTextSize () {
    return 20
  }

  _nominalNodeLabelTextSize () {
    var size = 10
    if (this.state.points.length >= 10000) size = 1
    if (this.state.points.length >= 1000) size = 2
    if (this.state.points.length >= 500) size = 5
    if (this.state.points.length <= 500) size = 15
    if (this.state.points.length <= 50) size = 20
    return size
  }

  _renderD3 () {

    const plot = this.plotRef.current;
    var dataset = this.state.points
    var self = this

    var colors = this.props.color || d3.scaleOrdinal(d3.schemeCategory10)
    // const maxDimension = window.innerHeight - 170;
    const width = window.innerWidth;
    const height = window.innerHeight - 60;
    var padding = 20;
    var labelNodes = null;

    console.log(`ScatterPlot2d width=${width}, height=${height}, dataset.length=${dataset.length}`)
    const zoom = d3.zoom().scaleExtent([1, 10]).on('zoom', zoomed);

    function zoomed () {
      container.attr('transform', d3.event.transform);
      const zoomScale = d3.event.transform.k;
      if (labelNodes) {
        var labelTextSize = self._nominalNodeLabelTextSize()
        if (self._nominalNodeLabelTextSize() * zoomScale > self._maxLabelTextSize()) labelTextSize = self._maxLabelTextSize() / zoomScale
        // console.debug('Setting labelTextSize (onZoom)', labelTextSize)
        labelNodes.style('font-size', labelTextSize + 'px')
      }
    }

    var xScale = d3.scaleLinear()
      .domain([d3.min(dataset, (d) => d[0]), d3.max(dataset, (d) => d[0])])
      .range([padding, width - padding])

    var yScale = d3.scaleLinear()
      .domain([d3.min(dataset, (d) => d[1]), d3.max(dataset, (d) => d[1])])
      .range([height - padding, padding])

    var xAxis = d3.axisBottom(xScale).ticks(5)
    var yAxis = d3.axisLeft(yScale).ticks(5)

    var svg = d3.select(plot)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + 0 + ',' + 0 + ')')
      .call(zoom)

    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .style('fill', 'black')
      .style('pointer-events', 'all')

    var container = svg.append('g')

    if (this.props && this.props.axes && this.props.axes.length) {
      // console.log('Drawing axes labels')

      container.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + (height - padding) + ')')
        .call(xAxis)
        .attr('class', 'axis-text')
        .append('text')
        .attr('class', 'axis-label')
        .attr('x', width - padding)
        .attr('y', -6)
        .style('text-anchor', 'end')
        .text(this.props.axes[0])

      container.append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(' + (padding + 10) + ',0)')
        .call(yAxis)
        .attr('class', 'axis-text')
        .append('text')
        .attr('class', 'axis-label')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('x', 0 - padding)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text(this.props.axes[1])
    }

    function update () {

      let dataset = this.state.points
      let clusters = this.state.clusters
      let labels = this.state.labels
      const showLabels = this.state.showLabels

      // console.log(`ScatterPlot2d update, dataset.length=${dataset.length}`)

      xScale.domain([d3.min(dataset, (d) => d[0]), d3.max(dataset, (d) => d[0])])
      yScale.domain([d3.min(dataset, (d) => d[1]), d3.max(dataset, (d) => d[1])])

      // Update data for existing nodes
      var nodes = container.selectAll('circle.node').data(dataset)

      // Change existing nodes
      nodes
        .transition()
        .duration(1000)
        .delay((d, i) => i / dataset.length * 500)
        .attr('cx', (d) => xScale(d[0]))
        .attr('cy', (d) => yScale(d[1]))
        .attr('fill', (d, i) => colors(clusters ? clusters[i] : 0))
        .attr('r', this._nodeRadius())

      // Render new nodes
      nodes
        .enter()
        .append('circle')
        .transition()
        .duration(1000)
        .delay((d, i) => i / dataset.length * 500)
        .on('start', function () {
          d3.select(this)
            .attr('fill', 'black')
        })
        .on('end', function (d, i) {
          d3.select(this)
            .attr('fill', () => colors(clusters ? clusters[i] : 0))
        })
        .attr('class', 'node')
        .attr('cx', (d) => xScale(d[0]))
        .attr('cy', (d) => yScale(d[1]))
        .attr('fill', (d, i) => colors(clusters ? clusters[i] : 0))
        .attr('r', this._nodeRadius())

      if (showLabels) {
        labelNodes = container.selectAll('text.node-label').data(dataset)

        var labelTextSize = this._nominalNodeLabelTextSize()
        if (this._nominalNodeLabelTextSize() * zoom.scale > this._maxLabelTextSize()) labelTextSize = this._maxLabelTextSize() / zoom.scale
        // console.log('Setting labelTextSize', labelTextSize)
        labelNodes.style('font-size', labelTextSize + 'px')

        labelNodes
          .transition()
          .duration(1000)
          .delay((d, i) => i / dataset.length * 500)
          .on('start', function () {
            d3.select(this)
              .attr('fill', 'black')
          })
          .on('end', function (d, i) {
            d3.select(this)
              .attr('fill', () => colors(clusters ? clusters[i] : 0))
          })
          .attr('x', (d) => xScale(d[0]))
          .attr('y', (d) => yScale(d[1]))

        labelNodes
          .enter()
          .append('text')
          .attr('class', 'node-label')
          .attr('text-anchor', 'middle')
          .attr('x', (d) => xScale(d[0]))
          .attr('y', (d) => yScale(d[1]))
          .attr('dy', 0 - this._nodeRadius() - 1.5)
          .style('font-size', (d, i) => "bier" === labels[i] ? '40px' : labelTextSize + 'px')
          .text((d, i) => { if ("bier" === labels[i]) console.log("bier"); return labels[i]})
          .on("mouseover", (d, i) => mouseovered(d, i))
          .on("mouseout", mouseouted)

        labelNodes
          .exit()
          .remove()
      } else {
        container.selectAll('text.node-label')
          .remove()
      }

      function mouseovered(d, i) {
        container.append('text')
          .attr('class', 'node-tooltip')
          .attr('y', yScale(d[1]) - 20)
          .attr('x', xScale(d[0]) + 10)
          .text(labels[i]);
      }

      function mouseouted(d) {
        container.selectAll('text.node-tooltip').remove();
      }

      // Remove old nodes
      nodes
        .exit()
        .remove()

      // Update X Axis
      container.select('.x.axis')
        .transition()
        .duration(1000)
        .call(xAxis)
        .call(d3.drag().subject(function (d) { return d; }).on("drag", null))

      // Update Y Axis
      container.select('.y.axis')
        .transition()
        .duration(100)
        .call(yAxis)
        .call(d3.drag().subject(function (d) { return d; }).on("drag", null))
    }

    this._updateD3 = update.bind(this)
    this._updateD3()
  }
}

export default ScatterPlot2d;
