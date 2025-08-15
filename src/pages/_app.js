import React from "react";
import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";
import LayoutComps from "@/components/Layout/LayoutComponent";

const App = ({ Component, pageProps }) => (
  <ConfigProvider theme={theme}>
    <LayoutComps>
      <Component {...pageProps} />
    </LayoutComps>
  </ConfigProvider>
);

export default App;
