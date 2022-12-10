import Link from 'next/link';
import dynamic from "next/dynamic";


export default function Home() {
    const Pairwise = dynamic(() => import("../components/pairwise"), {
        ssr: false,
    });
    return (
        <div>
            <div>
                <Pairwise/>
            </div>
            <div>
                <Link href="/scatter">Scatter Plot</Link>
            </div>
        </div>
    );
}





