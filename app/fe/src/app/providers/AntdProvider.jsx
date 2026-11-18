import { ConfigProvider, App as AntdApp } from 'antd';
// import viVN from "antd/locale/vi_VN";

const AntdProvider = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1677ff",
          fontSize: 16
        },
        components: {
          Button: {
            borderRadius: 4
          },
        }
      }}
      // locale={viVN}
      componentSize="middle"
    >
      <AntdApp
        message={{
          maxCount: 3,
          top: 24,
          duration: 1,
        }}

        notification={{
          duration: 3,
          placement: "topRight"
        }}
      >
        {children}
      </AntdApp>
    </ConfigProvider >
  );
};
export default AntdProvider;
