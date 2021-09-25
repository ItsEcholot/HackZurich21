import { Layout, Typography } from 'antd';
import { Chrono } from "react-chrono";

import './NewsView.css';

function NewsView() {
    const items = [{
        title: "14. Juli 2021, 14:55 Uhr",
        cardTitle: "Allianz-Versicherung rechnet mit Rekordjahr",
        cardSubtitle:"14. Juli 2021, 14:55 Uhr",
        cardDetailedText: "Der Versicherungskonzern Allianz rechnet nach dem Sturmtief «Bernd» mit Schäden von über neun Millionen Franken. Erwartet werden über 2500 Schadenmeldungen. Vor allem Autos und Gartenmöbel wurden stark beschädigt, zahlreiche Keller überflutet. Für die Hagelschäden an Autos hat die Allianz in der ganzen Schweiz acht Hagel-Drive-Ins eingerichtet. Obwohl die Schweiz noch mitten in der Unwetterlage steckt, zeichnet sich bei der Allianz bereits jetzt ein Rekordjahr bei den Schäden durch Naturgefahren ab. Die Schadensbilanz beläuft sich 2021 bisher auf mehr als 106 Millionen Franken, wie die Allianz schätzt. Das liegt deutlich über den bisherigen Rekordjahren 2009 und 2012, als die Unwetterschäden der Versicherung rund 90 Millionen Franken erreichten.",
        media: {
          type: "IMAGE",
          source: {
            url: "https://www.srf.ch/static/cms/images/320w/fd6ca3.jpg"
          }
        }
      },
      {
        title: "14. Juli 2021, 14:32 Uhr",
        cardTitle: "Kanton senkt Pegel des Sihlsees weiter ab",
        cardSubtitle:"14. Juli 2021, 14:32 Uhr",
        cardDetailedText: "Noch immer lässt die Baudirektion des Kantons Zürichs den Pegel des Sihlsees absenken, um dort wieder Kapazitäten für Niederschläge zu schaffen. So hofft man Ende Woche die Hochwasserspitzen der Limmat nicht zusätzlich mit Wasser aus diesem Gebiet belasten zu müssen. Bootfahren und Schwimmen in der Limmat und auch in der Sihl sind verboten. Überhaupt sollten sich die Menschen gemäss Behörden von Ufern fernhalten.",
        media: {
          type: "IMAGE",
          source: {
            url: "https://www.srf.ch/static/cms/images/640ws/fb2fe4.jpg"
          }
        }
      },
      {
        title: "14. Juli 2021, 14:19 Uhr",
        cardTitle: "Limmat tritt über die Ufer",
        cardSubtitle:"14. Juli 2021, 14:19 Uhr",
        cardDetailedText: "Der Pegel der Limmat in Zürich steigt weiter an. An einigen Stellen ist der Fluss bereits über die Ufer getreten, weshalb einige Uferwege gesperrt werden mussten. Wegen der überdurchschnittlich hohen Wassermenge herrscht eine starke Strömung. An einigen besonders gefährlichen Orten weisen Mitarbeiter der Stadt Zürich Schaulustige von der Gefahrenzone weg. Der Wasserstand der Limmat ist hoch, aufgenommen heute Mittag beim Wipkingerpark.",
        media: {
          type: "IMAGE",
          source: {
            url: "https://www.srf.ch/static/cms/images/branded_srf/-regionaljournal/zhsh/2021/07/696226.462076493_highres.jpg-.jpg"
          }
        }
      },
    ];

    return (
        <div className="NewsView">
            <Layout>
                <Layout.Header>
                    <Typography.Title level={2} >Überschwemmung</Typography.Title>
                </Layout.Header>
                <div className="chrono-wrap">
                    <Chrono  
                        items={items}
                        mode="VERTICAL"
                        theme={{ 
                            primary: "rgb(0, 21, 41)",
                            secondary: "rgb(197, 224, 248)",
                            cardBgColor: "white",
                            cardForeColor: "rgb(0, 21, 41)",
                            titleColor: "black"
                        }}
                    />
                </div>
            </Layout>
        </div>
    );
}

export default NewsView;