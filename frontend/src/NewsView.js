import { Layout, Typography } from 'antd';
import { Chrono } from "react-chrono";

import './NewsView.css';

function NewsView(props) {
    // props.selectedterms
    // props.selectedterms.term -> string

    return (
        <div className="NewsView">
            <Layout>
                <Layout.Header>
                    <Typography.Title level={2} >{props.selectedTerm.term}</Typography.Title>
                </Layout.Header>
                <div className="chrono-wrap">
                    <Chrono  
                        items={props.selectedTermArticles}
                        mode="VERTICAL"
                        allowDynamicUpdate={true}
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