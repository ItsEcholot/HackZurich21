import { Layout, Input } from 'antd';

import 'antd/dist/antd.css';
import { useEffect } from 'react';
import './App.css';
import NewsView from './NewsView';

function App() {
  useEffect(() => {
    window.particlesJS('particles-js',
      {
        "particles": {
          "number": {
            "value": 20,
            "density": {
              "enable": false,
              "value_area": 800
            }
          },
          "color": {
            "value": "#ffffff"
          },
          "shape": {
            "type": "abstract-circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 8
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 1,
            "random": false,
            "anim": {
              "enable": true,
              "speed": 0.1,
              "opacity_min": 0.5,
              "sync": false
            }
          },
          "size": {
            "value": 60,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 1,
              "size_min": 20,
              "sync": false
            }
          },
          "line_linked": {
            "enable": false,
            "distance": Infinity,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 1,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "attract": {
              "enable": false,
              "minDistance": 300,
              "rotateX": 1200,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "last_grabbed_dist": Infinity,
          "events": {
            "onhover": {
              "enable": true,
              "mode": "grab"
            },
            "onclick": {
              "enable": false,
              "mode": "bubble"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "distance_stop": 100,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true,
        "config_demo": {
          "hide_card": false,
          "background_color": "#000000",
          "background_image": "",
          "background_position": "50% 50%",
          "background_repeat": "no-repeat",
          "background_size": "cover"
        }
      }

    );
  }, []);

  const onSearch = () => {

  };

  return (
    <div className="App">
      <Layout>
        <Layout.Header style={{ width: '100%' }}>
          <Input.Search
            placeholder="input search text"
            allowClear onSearch={onSearch}
            style={{ marginTop: 15 }}
            enterButton
            size="large"
          />
        </Layout.Header>
        <Layout.Content className="cloud-layout">
          <div id="particles-js"></div>
        </Layout.Content>
        <Layout.Content>
          <NewsView/>
        </Layout.Content>
      </Layout>
    </div>
  );
}

export default App;