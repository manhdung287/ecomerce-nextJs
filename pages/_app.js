
import Layout from "../components/Layout";
import { Dataprovider } from "../store/GlobaState";
import "../styles/index.scss";

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
