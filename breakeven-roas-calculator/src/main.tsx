import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { ConfigProvider } from 'antd';
import App from './App.tsx';
import './index.css';
import './i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#4f46e5', // INDIGO 600
          borderRadius: 12,
          fontFamily: 'Inter, system-ui, sans-serif',
        },
        components: {
          Collapse: {
            contentPadding: '0px 24px 24px 24px',
            headerPadding: '24px',
          }
        }
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>,
);
