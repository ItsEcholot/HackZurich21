
import './NewsView.css';

function NewsView() {

    return (
        <div className="NewsView">
            <Layout>
                <Header><Title level={2}>Überschwemmung</Title></Header>
                <Layout>
                    <Sider>Sider</Sider>
                    <Content>Content</Content>
                </Layout>
                <Footer>Footer</Footer>
            </Layout>
        </div>
    );
}

export default NewsView;