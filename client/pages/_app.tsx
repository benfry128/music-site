import type { AppProps } from "next/app";
import Layout from "@/components/Layout";

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import './styles.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Layout>
    <Component {...pageProps} />
  </Layout>;
}
