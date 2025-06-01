import Layout from "@/components/Layout";

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import './styles.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return <html lang="en">
        <body>
            <Layout>
                {children}
            </Layout>
        </body>
    </html>
    
}
