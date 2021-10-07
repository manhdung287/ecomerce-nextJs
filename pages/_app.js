
import Layout from "../src/components/Layout";
import { Dataprovider } from "../src/store/GlobaState";
import "../src/styles/index.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Dataprovider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Dataprovider>
  );
}

export default MyApp;
