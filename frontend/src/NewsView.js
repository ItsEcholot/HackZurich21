import { Layout, Typography } from 'antd';

import './NewsView.css';

function NewsView() {

    return (
        <div className="NewsView">
            <Layout>
                <Layout.Header>
                    <Typography.Title level={2} >Überschwemmung</Typography.Title>
                </Layout.Header>
                <Layout>
                    <Layout.Sider>Sider</Layout.Sider>
                    <Layout.Content>Content</Layout.Content>
                </Layout>
                <Layout.Footer>Footer</Layout.Footer>
            </Layout>
        </div>
    );
}

export default NewsView;