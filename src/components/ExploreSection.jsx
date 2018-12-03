import React, { Component } from 'react';
import Exploration from './Exploration';
import qs from 'qs'

class ExploreSection extends Component {

  constructor (props) {
    super(props);

    const queryParams = this.props.location.search.replace("?", "");
    const queryStr = qs.parse(queryParams);
    this.state = {
      query: queryStr.query ? queryStr.query : '',
      limit: queryStr.limit ? parseInt(queryStr.limit) : 1000,
      num_clusters: queryStr.clusters ? parseInt(queryStr.clusters) : 30,
      showLabels: true,
      explore: false
    }
    this.changeLimit = this.changeLimit.bind(this);
    this.changeNumClusters = this.changeNumClusters.bind(this);
    this.changeQuery = this.changeQuery.bind(this);
    this.changeShowLabels = this.changeShowLabels.bind(this);
    this.changeExplore = this.changeExplore.bind(this);
  }

  changeLimit(e) {
    this.setState({ limit: parseInt(e.target.value, 10) });
  }

  changeNumClusters(e) {
    this.setState({ num_clusters: parseInt(e.target.value, 10) });
  }

  changeQuery(e) {
    const query = e.target ? e.target.value : e.query;
    this.setState({ query });
  }

  changeShowLabels () {
    this.setState({
      showLabels: !this.state.showLabels
    });
  }

  changeExplore (e) {
    e.preventDefault();
    this.setState({ explore: !this.state.explore });
  }

  render () {
    return (
      <div className='row'>
        <div className='query-column col-md-2'>
          <div className='filters'>
            <form className='form' onSubmit={this._explore}>
              <div className='form-group'>
                <label htmlFor='queryInput'>Query:</label>
                <input id='queryInput' className='form-control' type='text' onChange={this.changeQuery} value={this.state.query} />
              </div>
              <div className='form-group'>
                <label htmlFor='limitInput'>Num Vectors:</label>
                <input id='limitInput' className='form-control' type='text' onChange={this.changeLimit} value={this.state.limit} />
              </div>
              <div className='form-group'>
                <label htmlFor='limitInput'>Num Clusters:</label>
                <input id='numClustersInput' className='form-control' type='text' onChange={this.changeNumClusters} value={this.state.num_clusters} />
              </div>
              <div className='form-group'>
                <label><input type='checkbox' checked={this.state.showLabels} onChange={this.changeShowLabels} /> Show Labels</label>
              </div>
              <div className='form-group'>
                <input type='submit' className='btn btn-outline-light btn-block' onClick={this.changeExplore} value='Explore'/>
              </div>
            </form>
          </div>
        </div>
        <Exploration params={this.state} onSelect={this.changeQuery} />
      </div>
    )
  }
}

export default ExploreSection;