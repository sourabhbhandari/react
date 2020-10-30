import React from 'react';
import { S3_HOST } from '../../constants';

export const HomeNavDataSource = {
  wrapper: { className: 'header0 home-page-wrapper' },
  page: { className: 'home-page' },
  logo: {
    className: 'header0-logo',
    children: 'https://os.alipayobjects.com/rmsportal/mlcYmsRilwraoAe.svg'
  },
  Menu: {
    className: 'header0-menu',
    children: [
      {
        name: 'item0',
        className: 'header0-item',
        children: {
          href: '#',
          children: [
            {
              children: (
                <>
                  <p>Home</p>
                </>
              ),
              name: 'text'
            }
          ]
        },
        subItem: [
          {
            name: 'sub0',
            className: 'item-sub',
            children: {
              className: 'item-sub-item',
              children: [
                {
                  name: 'image0',
                  className: 'item-image',
                  children:
                    'https://gw.alipayobjects.com/zos/rmsportal/ruHbkzzMKShUpDYMEmHM.svg'
                },
                {
                  name: 'title',
                  className: 'item-title',
                  children: 'Ant Design'
                },
                {
                  name: 'content',
                  className: 'item-content',
                  children: '企业级 UI 设计体系'
                }
              ]
            }
          },
          {
            name: 'sub1',
            className: 'item-sub',
            children: {
              className: 'item-sub-item',
              children: [
                {
                  name: 'image0',
                  className: 'item-image',
                  children:
                    'https://gw.alipayobjects.com/zos/rmsportal/ruHbkzzMKShUpDYMEmHM.svg'
                },
                {
                  name: 'title',
                  className: 'item-title',
                  children: 'Ant Design'
                },
                {
                  name: 'content',
                  className: 'item-content',
                  children: '企业级 UI 设计体系'
                }
              ]
            }
          }
        ]
      },
      {
        name: 'item1',
        className: 'header0-item',
        children: {
          href: '#',
          children: [
            {
              children: (
                <>
                  <p>Services</p>
                </>
              ),
              name: 'text'
            }
          ]
        }
      },
      {
        name: 'item6',
        className: 'header0-item',
        children: {
          href: '/blog/home',
          children: [
            {
              children: (
                <>
                  <p>Blog</p>
                </>
              ),
              name: 'text'
            }
          ]
        }
      },
      {
        name: 'item2',
        className: 'header0-item',
        children: {
          href: '#',
          children: [
            {
              children: (
                <>
                  <p>About Us</p>
                </>
              ),
              name: 'text'
            }
          ]
        }
      },
      {
        name: 'item3',
        className: 'header0-item',
        children: {
          href: '/contact-us',
          children: [
            {
              children: (
                <>
                  <p>Contact Us</p>
                </>
              ),
              name: 'text'
            }
          ]
        }
      },

      {
        name: 'item4',
        className: 'header0-item',
        children: {
          children: [
            {
              children: (
                <>
                  <p>Sign in</p>
                </>
              ),
              name: 'text'
            }
          ]
        }
      }
    ]
  },
  mobileMenu: { className: 'header0-mobile-menu' }
};
export const Banner20DataSource = {
  wrapper: { className: 'banner2' },
  BannerAnim: {
    children: [
      {
        name: 'elem0',
        BannerElement: { className: 'banner-user-elem' },
        page: { className: 'home-page banner2-page' },
        textWrapper: {
          className: 'banner2-text-wrapper k3bsaq3c0l7-editor_css'
        },
        bg: { className: 'bg bg0' },
        title: {
          className: 'banner2-title',
          children: 'Want to test your skills?'
        },
        content: {
          className: 'banner2-content',
          children: (
            <>
              <font>
                <font>An efficient way to master your preparation.</font>
                <font style={{ display: 'block' }}>
                  We help you crack your next exam
                </font>
              </font>
            </>
          )
        },
        button: { className: 'banner2-button', children: 'Learn More' }
      }
    ]
  }
};
export const ProductsAndServicesDataSource = {
  wrapper: { className: 'home-page-wrapper ProductsAndServices-wrapper' },
  page: { className: 'home-page ProductsAndServices k3bn1dqgrq9-editor_css' },
  OverPack: { playScale: 0.3, className: '' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'title',
        children: (
          <>
            <font>
              <font>Features</font>
            </font>
          </>
        )
      }
    ]
  },
  childWrapper: {
    className: 'ProductsAndServices-block-wrapper',
    children: [
      {
        name: 'block0',
        className: 'ProductsAndServices-block',
        md: 8,
        xs: 24,
        children: {
          className: 'ProductsAndServices-block-item',
          children: [
            {
              name: 'image',
              className: 'ProductsAndServices-block-icon',
              children: `${S3_HOST}/home/certificate_with_dollar.png`
            },
            {
              name: 'title',
              className: 'ProductsAndServices-block-title',
              children: (
                <>
                  <font>
                    <font>One-stop to manage tests</font>
                  </font>
                </>
              )
            },
            {
              name: 'content',
              children: (
                <>
                  <font>
                    <font>
                      Create, manage and host your own test/questions using our
                      huge collections of question library in seconds.
                    </font>
                  </font>
                </>
              )
            }
          ]
        }
      },
      {
        name: 'block1',
        className: 'ProductsAndServices-block',
        md: 8,
        xs: 24,
        children: {
          className: 'ProductsAndServices-block-item',
          children: [
            {
              name: 'image',
              className: 'ProductsAndServices-block-icon',
              children: `${S3_HOST}/home/graph.png`
            },
            {
              name: 'title',
              className: 'ProductsAndServices-block-title',
              children: (
                <>
                  <font>
                    <font>One-stop to monitor reports</font>
                  </font>
                </>
              )
            },
            {
              name: 'content',
              children: (
                <>
                  <font>
                    <font>
                      We provide the cutting edge technologies to pin point the
                      area where you need to improve.
                    </font>
                  </font>
                </>
              )
            }
          ]
        }
      },
      {
        name: 'block2',
        className: 'ProductsAndServices-block',
        md: 8,
        xs: 24,
        children: {
          className: 'ProductsAndServices-block-item',
          children: [
            {
              name: 'image',
              className: 'ProductsAndServices-block-icon',
              children: `${S3_HOST}/home/progress.png`
            },
            {
              name: 'title',
              className: 'ProductsAndServices-block-title',
              children: (
                <>
                  <font>
                    <font>Analyze real-time progress</font>
                  </font>
                </>
              )
            },
            {
              name: 'content',
              children: (
                <>
                  <font>
                    <font>
                      Capture and compare your progress, rank, scores, test &
                      question wise solution and many more.
                    </font>
                  </font>
                </>
              )
            }
          ]
        }
      }
    ]
  }
};
export const ServicesDataSource = {
  wrapper: { className: 'home-page-wrapper Services-wrapper' },
  page: { className: 'home-page Services' },
  OverPack: { playScale: 0.3 },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'title',
        children: (
          <>
            <font>
              <font>Our services</font>
            </font>
          </>
        ),
        className: 'title-h1'
      },
      {
        name: 'content',
        className: 'title-content',
        children: (
          <>
            <font>
              <font>Our commitments to our users</font>
            </font>
          </>
        )
      }
    ]
  },
  block: {
    className: 'Services-block-wrapper',
    children: [
      {
        name: 'block0',
        className: 'Services-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'Services-icon',
            children: `${S3_HOST}/home/eye-graph.png`
          },
          textWrapper: { className: 'Services-text' },
          title: {
            className: 'Services-title',
            children: (
              <>
                <font>
                  <font>Enterprise resource management</font>
                </font>
              </>
            )
          },
          content: {
            className: 'Services-content',
            children: (
              <>
                <font>
                  <font>Cloud resources are centrally&nbsp;</font>
                </font>
              </>
            )
          }
        }
      },
      {
        name: 'block1',
        className: 'Services-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'Services-icon',
            children: `${S3_HOST}/home/A.png`
          },
          textWrapper: { className: 'Services-text' },
          title: {
            className: 'Services-title',
            children: (
              <>
                <font>
                  <font>Cloud security</font>
                </font>
              </>
            )
          },
          content: {
            className: 'Services-content',
            children: (
              <>
                <font>
                  <font>
                    A complete cloud-based security system built on the
                    security&nbsp;
                  </font>
                </font>
              </>
            )
          }
        }
      },
      {
        name: 'block2',
        className: 'Services-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'Services-icon',
            children: `${S3_HOST}/home/cloud_monitoring+.png`
          },
          textWrapper: { className: 'Services-text' },
          title: {
            className: 'Services-title',
            children: (
              <>
                <font>
                  <font>Cloud monitoring</font>
                </font>
              </>
            )
          },
          content: {
            className: 'Services-content',
            children: (
              <>
                <font>
                  <font>
                    Centralized monitoring of distributed cloud environments
                  </font>
                </font>
              </>
            )
          }
        }
      },
      {
        name: 'block3',
        className: 'Services-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'Services-icon',
            children: `${S3_HOST}/home/mobile.png`
          },
          textWrapper: { className: 'Services-text' },
          title: {
            className: 'Services-title',
            children: (
              <>
                <font>
                  <font>
                    <font>
                      <font>Mobile</font>
                    </font>
                  </font>
                </font>
              </>
            )
          },
          content: {
            className: 'Services-content',
            children: (
              <>
                <font>
                  <font>
                    <font>
                      <font>
                        One-stop mobile financial APP development and
                        comprehensive
                      </font>
                    </font>
                  </font>
                </font>
              </>
            )
          }
        }
      },
      {
        name: 'block4',
        className: 'Services-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'Services-icon',
            children: `${S3_HOST}/home/distributed_middleware+.png`
          },
          textWrapper: { className: 'Services-text' },
          title: {
            className: 'Services-title',
            children: (
              <>
                <font>
                  <font>
                    <font>
                      <font>Distributed middleware</font>
                    </font>
                  </font>
                </font>
              </>
            )
          },
          content: {
            className: 'Services-content',
            children: (
              <>
                <font>
                  <font>
                    <font>
                      <font>
                        <font>
                          <font>
                            Financial-grade online transaction processing
                            middleware
                          </font>
                        </font>
                      </font>
                    </font>
                  </font>
                </font>
              </>
            )
          }
        }
      },
      {
        name: 'block5',
        className: 'Services-block',
        md: 8,
        xs: 24,
        children: {
          icon: {
            className: 'Services-icon',
            children: `${S3_HOST}/home/big-data.png`
          },
          textWrapper: { className: 'Services-text' },
          title: {
            className: 'Services-title',
            children: (
              <>
                <font>
                  <font>Big Data</font>
                </font>
              </>
            )
          },
          content: {
            className: 'Services-content',
            children: (
              <>
                <font>
                  <font>
                    <u>
                      One-stop, full-cycle big data collaborative work platform
                    </u>
                  </font>
                </font>
              </>
            )
          }
        }
      }
    ]
  }
};
export const PartnersDataSource = {
  wrapper: { className: 'home-page-wrapper Partners-wrapper' },
  page: { className: 'home-page Partners' },
  OverPack: { playScale: 0.3, className: '' },
  titleWrapper: {
    className: 'title-wrapper',
    children: [
      {
        name: 'title',
        children: (
          <>
            <p>
              <font>
                <font>Our Partners</font>
              </font>
            </p>
          </>
        ),
        className: 'title-h1'
      }
    ]
  },
  block: {
    className: 'img-wrapper',
    children: [
      {
        name: 'block0',
        className: 'block',
        md: 8,
        xs: 24,
        children: {
          wrapper: { className: 'block-content' },
          img: {
            children: `${S3_HOST}/home/partner1.svg`
          }
        }
      },
      {
        name: 'block1',
        className: 'block',
        md: 8,
        xs: 24,
        children: {
          wrapper: { className: 'block-content' },
          img: {
            children: `${S3_HOST}/home/partner2.svg`
          }
        }
      },
      {
        name: 'block2',
        className: 'block',
        md: 8,
        xs: 24,
        children: {
          wrapper: { className: 'block-content' },
          img: {
            children: `${S3_HOST}/home/partner1.svg`
          }
        }
      },
      {
        name: 'block3',
        className: 'block',
        md: 8,
        xs: 24,
        children: {
          wrapper: { className: 'block-content' },
          img: {
            children: `${S3_HOST}/home/partner2.svg`
          }
        }
      },
      {
        name: 'block4',
        className: 'block',
        md: 8,
        xs: 24,
        children: {
          wrapper: { className: 'block-content' },
          img: {
            children: `${S3_HOST}/home/partner1.svg`
          }
        }
      },
      {
        name: 'block5',
        className: 'block',
        md: 8,
        xs: 24,
        children: {
          wrapper: { className: 'block-content' },
          img: {
            children: `${S3_HOST}/home/partner2.svg`
          }
        }
      }
    ]
  }
};
export const HomeFooterDataSource = {
  wrapper: { className: 'home-page-wrapper HomeFooter-wrapper' },
  OverPack: { className: 'HomeFooter', playScale: 0.2 },
  block: {
    className: 'home-page',
    gutter: 0,
    children: [
      {
        name: 'block0',
        xs: 24,
        md: 6,
        className: 'block',
        title: {
          className: 'logo',
          children: `${S3_HOST}/home/antd_logo.svg`
        },
        childWrapper: {
          className: 'slogan',
          children: [
            {
              name: 'ProductsAndServices',
              children: 'Animation specification and components of Ant Design.'
            }
          ]
        }
      },
      {
        name: 'block1',
        xs: 24,
        md: 6,
        className: 'block',
        title: {
          children: (
            <>
              <font>
                <font>product</font>
              </font>
            </>
          )
        },
        childWrapper: {
          children: [
            {
              name: 'link0',
              href: '#',
              children: (
                <>
                  <p>
                    <font>
                      <font>Product update record</font>
                    </font>
                  </p>
                </>
              )
            },
            {
              name: 'link1',
              href: '#',
              children: (
                <>
                  <font>
                    <font>API documentation</font>
                  </font>
                </>
              )
            },
            {
              name: 'link2',
              href: '#',
              children: (
                <>
                  <font>
                    <font>Quick start</font>
                  </font>
                </>
              )
            },
            {
              name: 'link3',
              href: '#',
              children: (
                <>
                  <font>
                    <font>Reference guide</font>
                  </font>
                </>
              )
            }
          ]
        }
      },
      {
        name: 'block2',
        xs: 24,
        md: 6,
        className: 'block',
        title: {
          children: (
            <>
              <p>
                <font>
                  <font>on</font>
                </font>
              </p>
            </>
          )
        },
        childWrapper: {
          children: [
            { href: '#', name: 'link0', children: 'FAQ' },
            {
              href: '#',
              name: 'link1',
              children: (
                <>
                  <font>
                    <font>contact us</font>
                  </font>
                </>
              )
            }
          ]
        }
      },
      {
        name: 'block3',
        xs: 24,
        md: 6,
        className: 'block',
        title: {
          children: (
            <>
              <font>
                <font>
                  <font>
                    <font>
                      <font>
                        <font>Resource</font>
                      </font>
                    </font>
                  </font>
                </font>
              </font>
            </>
          )
        },
        childWrapper: {
          children: [
            { href: '#', name: 'link0', children: 'Ant Design' },
            { href: '#', name: 'link1', children: 'Ant Motion' }
          ]
        }
      }
    ]
  },
  copyrightWrapper: { className: 'copyright-wrapper' },
  copyrightPage: { className: 'home-page' },
  copyright: {
    className: 'copyright',
    children: (
      <>
        <span>
          ©2018 by <a href="https://codeplanet.co.in">Code Planet</a> All Rights
          Reserved
        </span>
      </>
    )
  }
};
