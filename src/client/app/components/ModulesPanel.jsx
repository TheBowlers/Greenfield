import React from 'react';

class ModulesPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
          'JavaScript',
          'CSS',
          'jQuery',
          'HTML',
          'Express'
      ],
      selectedCategory: {

      }
    };
    this.renderCategoryItems = this.renderCategoryItems.bind(this);
  }

  selectCategory() {

  }

  renderCategoryItems() {

    return (
      this.state.categories.map((category) => {
        return (
            <table className="table table-striped table-hover ">
              <tbody>
              <tr>
                <td>{category}</td>
              </tr>
              </tbody>
            </table>
        )
    })
  )
  }

  render() {
    return (
      <div className="col-md-3 modules hidden-sm hidden-xs">
        <table className="table table-striped table-hover ">
          <thead>
          <tr>
            <th>Categories</th>
          </tr>
          </thead>
        </table>
        {this.renderCategoryItems()};
        <ul className="list-unstyled category-list">
          <li className="category-item">JavaScript</li>
          <li className="category-item">CSS</li>
          <li className="category-item">jQuery</li>
          <li className="category-item">HTML</li>
          <li className="category-item">Express</li>
        </ul>
      </div>
    )
  }
}

export default ModulesPanel;