import React, { Component } from 'react'

import ClusterList from './ClusterList'
import ScatterPlot2d from './ScatterPlot2d';
import VectorList from './VectorList';
import Stats from './Stats';
import * as d3 from 'd3';
import fetch from 'isomorphic-fetch';
import { config } from '../config'

class Exploration extends Component {

  constructor (props) {
    super(props)
    this.state = {
      params: props.params,
      result: null,
      error: null,
      color: d3.scaleOrdinal(d3.schemeCategory10),
      clusterFilter: null
    }
    this.explore = this.explore.bind(this);
    this.drillDown = this.drillDown.bind(this);
    this.filterCluster = this.filterCluster.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.params !== this.state.params) {
      const reload = props.params.explore !== this.state.params.explore;
      if (reload) {
        this.explore(props.params)
      }
    }
  }

  render () {
    let result = this.state.result
    let vectorListTitle = 'Most Similar'
    let params = this.state.params
    if (params && !params.query) vectorListTitle = 'Sample Rated'
    return (
      <div>
        {(this.state.error) && (
          <div className="alert alert-danger" role="alert">{this.state.error.message}</div>
        )}
        {(result) && (
          <div className='exploration'>
              {(result) && (result.stats) && (
                <Stats data={result.stats}/>
              )}
              <ScatterPlot2d color={this.state.color}
                             points={this.state.result.reduction}
                             clusters={this.state.result.clusters}
                             labels={this.state.result.labels}
                             showLabels={this.state.params.showLabels}
                             clusterFilter={this.state.clusterFilter}/>
            <div className='right-pane'>
              <div className='split-pane upper'>
                <VectorList title={vectorListTitle} data={result} onSelect={this.drillDown}/>
              </div>
              <div className='split-pane lower'>
                <ClusterList color={this.state.color} title='K-Means Centroids' data={result} onSelect={this.filterCluster}/>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  drillDown(params) {
    this.explore(params);
    this.props.onSelect && this.props.onSelect(params);
  }

  filterCluster(clusterFilter) {
    this.setState({ clusterFilter });
  }

  explore (params) {
    const state = Object.assign({}, { params }, { error: null });
    this.setState(state);
    const query = new URLSearchParams();
    query.append("query", params.query);
    query.append("limit", (params.limit || 1000));
    query.append("enable_clustering", true);
    query.append("num_clusters", params.num_clusters);
    fetch(config.baseUrl + config.explorePath + '?' + query)
      .then(response => {
        response.json()
          .then(data => {
            this.setState({
              error: data.error ? new Error(data.error.message) : null,
              result: data.result
            });
            this.props.onLoadingComplete();
          })
          .catch(error => {
              this.props.onLoadingComplete();
              console.log(error);
            }
          );
      })
      .catch(error => {
        this.props.onLoadingComplete();
        console.log(error)
      });
  }
}

export default Exploration
