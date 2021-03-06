import { Layout, Input } from 'antd';
import { useEffect, useState } from 'react';
import NewsView from './NewsView';

import 'antd/dist/antd.css';
import './App.css';

function App(props) {
  const backendUrl = 'http://localhost:8000';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTerm, setSelectedTerm] = useState();
  const [selectedTermArticles, setSelectedTermArticles] = useState();

  useEffect(() => {
    window.particlesJS('particles-js',
      {
        "particles": {
          "number": {
            "value": 0,
            "density": {
              "enable": false,
              "value_area": 800
            }
          },
          "color": {
            "value": "#ffffff"
          },
          "shape": {
            "type": "image",
            "stroke": {
              "width": 0,
              "color": "#ffffff"
            },
            "polygon": {
              "nb_sides": 8
            },
            "image": {
              "src": "sphere.png",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 1,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 0.1,
              "opacity_min": 0.5,
              "sync": false
            }
          },
          "size": {
            "value": 50,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 1,
              "size_min": 50,
              "sync": false
            }
          },
          "line_linked": {
            "enable": false,
            "distance": Infinity,
            "color": "#888888",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 1.5,
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
              "enable": true,
              "mode": ""
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "distance_stop": 100,
              "distance_click": 60,
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

    getTerms(window.pJSDom[0].pJS);
    document.getElementById('particles-js').addEventListener('click', () => onCanvasClick(window.pJSDom[0].pJS));
  }, []);

  useEffect(() => {
    if (!selectedTerm) return;

    fetch(`${backendUrl}/search_filenames/${selectedTerm.term}/20`).then(async (res) => {
      const result = await res.json();
      const articles = [];
      if (!result.files) return;

      for (let filename of result.files) {
        const article = await (await fetch(`${backendUrl}/article/${filename}.json`)).json();

        const newArticle = {
          title: (new Date(article.publishedDate*1000)).toLocaleDateString('de-CH'),
          cardTitle: article.headline,
          cardSubtitle: article.shortLead,
          cardDetailedText: article.paragraphs,
          media: {
            type: "IMAGE",
            source: {
              url: article.teaserImage
            }
          },
          rawDate: article.publishedDate
        };

        articles.push(newArticle);
      }

      articles.sort((a, b) => b.rawDate - a.rawDate);
      setSelectedTermArticles(articles);

      let element = document.getElementById("articles");
      element.scrollIntoView();
      // window.location.href = '#articles';
    });
  }, [selectedTerm]);

  const onSearch = async () => {
    setSelectedTerm({term: searchTerm});
  }

  const getTerms = async (particlejs) => {
    //const terms = await (await fetch(`${backendUrl}/terms/1000`)).json();
    const rawTerms = (await (await fetch(`${backendUrl}/max_tf_idfs`)).json()).tf_idf;
    const terms = rawTerms.filter(term => term.length >= 2);

    for (let i = 0; i < 20; i++) {
      const element = terms[i];
      const particle = new particlejs.fn.particle(
        particlejs.particles.color,
        particlejs.particles.opacity.value,
        {
          'x': Math.random() * particlejs.canvas.w,
          'y': Math.random() * particlejs.canvas.h
        }
      );
      particle.data = {
        term: element,
      };
      particlejs.particles.array.push(particle);
    }

    particlejs.terms = terms;
    particlejs.fn.generateLinkPartners();
  }

  const onCanvasClick = async (particlejs) => {
    if (particlejs.interactivity.last_grabbed_dist < particlejs.interactivity.modes.grab.distance_click) {
      setSelectedTerm(particlejs.interactivity.last_grabbed.data);
    }
  }

  return (
    <div className="App">
      <Layout>

          <Input.Search
            placeholder="SVP vs Berset..."
            allowClear onSearch={onSearch}
            style={{ marginTop: 15 }}
            enterButton
            size="large"
            onChange={e => setSearchTerm(e.target.value)}
          />

        <Layout.Content className="cloud-layout">
          <div className="cloud-layout-img">
            <div id="particles-js"></div>
          </div>
        </Layout.Content>
        <Layout.Content id="articles">
          {selectedTerm ? <NewsView 
            selectedTerm={selectedTerm}
            selectedTermArticles={selectedTermArticles}/> : null }
        </Layout.Content>
      </Layout>
    </div>
  );
}

export default App;
