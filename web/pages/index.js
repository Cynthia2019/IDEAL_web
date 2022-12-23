import Link from 'next/link';
import dynamic from "next/dynamic";
import Pairwise_d3 from "../components/pairwise_d3";


export default function Home() {
    // const Pairwise_plotly = dynamic(() => import("../components/pairwise_plotly"), {
    //     ssr: false,
    // });

    return (
        <div>
            <Pairwise_d3 />
            {/*<div>*/}
            {/*    <Link href="/scatter_page">*/}
            {/*    <button>Scatter</button>*/}
            {/*    </Link>*/}

            {/*</div>*/}
        </div>
    );
}





