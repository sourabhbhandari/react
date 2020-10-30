import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import './category.css';
import CategoryList from './categoryList';

class Category extends Component {
  render() {
    const categoryListState = [
      { Category_Id: '10', Category_Name: 'Programming' },
      { Category_Id: '11', Category_Name: 'JEE Advance' },
      { Category_Id: '12', Category_Name: 'JEE Mains' },
      { Category_Id: '13', Category_Name: 'NEET UG' },
      { Category_Id: '14', Category_Name: 'NEET UG' },
      { Category_Id: '15', Category_Name: 'CAT' },
      { Category_Id: '16', Category_Name: 'MAT' },
      { Category_Id: '17', Category_Name: 'GMAT' }
    ];
    return (
      <div style={{ backgroundColor: '#faf6eb', paddingBottom: '20px' }}>
        <CategoryList categoryListState={categoryListState} />
        <div className="more-category-icon">
          <Link to={'/category'}>
            <Icon type="down" />
          </Link>
        </div>
      </div>
    );
  }
}

export default Category;
