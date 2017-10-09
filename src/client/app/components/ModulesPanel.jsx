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
      ]
    };
    this.renderCategoryItems = this.renderCategoryItems.bind(this);
  }

  isActiveCategory(category) {
    if (category === this.props.selectedCategory) {
      return "selected-category";
    } else {
      return "";
    }
  }

  renderCategoryItems() {

    return (
      this.state.categories.map((category) => {
        return (
            <table className={"table table-striped table-hover category-item " + this.isActiveCategory(category)} onClick={(e) => this.props.selectCategory(category)}>
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
        <h2 className="module-title text-center">Categories</h2>
        <table className={"table table-striped table-hover category-item " + this.isActiveCategory(null)} onClick={(e) => this.props.selectCategory(null)}>
          <tbody>
          <tr>
            <td>All</td>
          </tr>
          </tbody>
        </table>
        {this.renderCategoryItems()}

      </div>
    )
  }
}

export default ModulesPanel;