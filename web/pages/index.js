import Link from 'next/link';
import dynamic from "next/dynamic";


export default function Home() {
    const Pairwise = dynamic(() => import("../components/pairwise"), {
        ssr: false,
    });

    const handleClick = event => {
    console.log(event.detail);
    switch (event.detail) {
      case 1: {
        console.log('single click');
        break;
      }
      case 2: {
        console.log('double click');
        break;
      }
      default: {
        break;
      }
    }
  };
    return (
        <div>
            <div>
                <Pairwise/>
                <Link href="/scatter">
                <button onClick={handleClick}>Scatter</button>
                </Link>

            </div>
        </div>
    );
}





