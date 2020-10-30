import React, {Component} from 'react';
import LandingHomeBanner from '../landing_home_banner';
import ProductsAndServices from '../products_and_services';
import Services from '../Services';
import Partners from '../partners';
import Category from '../../../category_home_page/Category';
import ContactUs from '../contact-us';
import {
  Banner20DataSource,
  ProductsAndServicesDataSource,
  ServicesDataSource,
  PartnersDataSource,
} from '../data.source';

class HomeContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        {!window.location.pathname.includes('contact-us') ? (
          <>
            <LandingHomeBanner
              id="Banner2_0"
              key="Banner2_0"
              dataSource={Banner20DataSource}
              isMobile={this.state.isMobile}
            />
           
            <Category
            
             />
            <ProductsAndServices
              id="ProductsAndServices_0"
              key="ProductsAndServices_0"
              dataSource={ProductsAndServicesDataSource}
              isMobile={this.state.isMobile}
            />

            <Services
              id="Services_0"
              key="Services_0"
              dataSource={ServicesDataSource}
              isMobile={this.state.isMobile}
            />
            <Partners
              id="Partners_0"
              key="Partners_0"
              dataSource={PartnersDataSource}
              isMobile={this.state.isMobile}
            />
          </>
        ) : (
          <ContactUs isMobile={this.state.isMobile} />
        )}
      </>
    );
  }
}

export default HomeContent;
