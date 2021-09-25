import {Layout, Input} from 'antd';

import 'antd/dist/antd.css';
import './App.css';

function App() {
  const onSearch = () => {

  };

  return (
    <div className="App">
      <Layout>
        <Layout.Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <Input.Search 
            placeholder="input search text" 
            allowClear onSearch={onSearch} 
            style={{ marginTop: 15 }}
            enterButton
            size="large"
          />
        </Layout.Header>
      </Layout>
    </div>
  );
}

export default App;
