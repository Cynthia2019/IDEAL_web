import { useContext, useState, useEffect } from "react";
import Header from "../components/header";
import styles from "../styles/Home.module.css";
import ChartWrapper from "../components/ChartWrapper";
import Pyodide from "../components/pyodide";
//import { PyodideContext } from "../components/pyodide-provider";

export default function Home() {
  const [initialData, setInitialData] = useState([]);
  const [query1, setQuery1] = useState(
    "Minimal directional Young's modulus [N/m]"
  );
  const [query2, setQuery2] = useState(
    "Maximal directional Young's modulus [N/m]"
  );

  return (
    <div>
      <Header/>
      <div className={styles.body}>
        <div className={styles.mainPlot}>
          <div className={styles.mainPlotHeader}>
            <p className={styles.mainPlotTitle}>Material Data Explorer</p>
            <p className={styles.mainPlotSub}>
              Select properties from the dropdown menus below to graph on the x
              and y axes. Hovering over data points provides additional
              information. Scroll to zoom, click and drag to pan, and
              double-click to reset.
            </p>
          </div>

          <div>
            <Pyodide
            id={1}
            pythonCode={"import numpy as np\n" +
                "import matplotlib\n" +
                "import matplotlib.pyplot as plt\n" +
                "\n" +
                "def transform(itr, tmx):\n" +
                "    '''\n" +
                "    Transform 3D-tensor (Euclidean or Cartesion tensor) of any order (>0) to another coordinate system\n" +
                "    Parameters:\n" +
                "        itr: input tensor, before transformation; should be a 3-element vector, a 3x3 matrix, or a 3x3x3x... multidimensional array, each dimension containing 3 elements\n" +
                "        tmx: transformation matrix, 3x3 matrix that contains the direction cosines between the old and the new coordinate system\n" +
                "    Returns:\n" +
                "        otr: output tensor, after transformation; has the same dimensions as the input tensor\n" +
                "    '''\n" +
                "    ne = np.asarray(itr).size\n" +
                "    nd = np.asarray(itr).ndim\n" +
                "\n" +
                "    if (ne == 3):\n" +
                "        nd = 1\n" +
                "\n" +
                "    otr = np.zeros_like(itr)\n" +
                "\n" +
                "    iie = np.zeros((nd, 1))\n" +
                "    ioe = np.zeros((nd, 1))\n" +
                "    cne = np.cumprod(3 * np.ones((nd, 1))) / 3\n" +
                "\n" +
                "    for oe in range(ne):\n" +
                "        ioe = np.mod(np.floor(oe / cne).astype(int), 3)\n" +
                "        for ie in range(ne):\n" +
                "            pmx = 1\n" +
                "            iie = np.mod(np.floor(ie / cne).astype(int), 3)\n" +
                "            for i in range(nd):\n" +
                "                pmx = pmx * tmx[ioe[i], iie[i]]\n" +
                "            otr[np.unravel_index(oe, otr.shape)] = otr[np.unravel_index(oe, otr.shape)] + pmx * itr[\n" +
                "                np.unravel_index(ie, itr.shape)]\n" +
                "\n" +
                "    return otr\n" +
                "\n" +
                "def visual2D(c): \n" +
                "    '''\n" +
                "\n" +
                "    Parameters\n" +
                "    ----------\n" +
                "    c : 1D numpy array\n" +
                "        [C11, C12, C22, C16, C26, C66].\n" +
                "\n" +
                "    Returns\n" +
                "    -------\n" +
                "    None.\n" +
                "\n" +
                "    '''\n" +
                "    # transform c to CH (a 6x6 matrix)\n" +
                "    CH = np.ones((6,6)) * 1e-7\n" +
                "    CH[0,0] = c[0]\n" +
                "    CH[0,1] = c[1]\n" +
                "    CH[1,0] = c[1]\n" +
                "    CH[1,1] = c[2]\n" +
                "    CH[0,5] = c[3]\n" +
                "    CH[5,0] = c[3]\n" +
                "    CH[1,5] = c[4]\n" +
                "    CH[5,1] = c[4]\n" +
                "    CH[5,5] = c[5]\n" +
                "    # transform CH to a 3*3*3*3 tensor\n" +
                "    tensor = generate(CH)\n" +
                "    # find the E1 in 360 degree\n" +
                "    a = np.arange(0, 2*np.pi+0.02*np.pi, 0.02*np.pi)\n" +
                "    E1 = np.zeros_like(a)\n" +
                "    P1 = np.zeros_like(a)\n" +
                "    for i in range(len(a)):\n" +
                "        trans_z = np.array([[np.cos(a[i]), -np.sin(a[i]), 0],\n" +
                "                            [np.sin(a[i]),  np.cos(a[i]), 0],\n" +
                "                            [0,             0,            1]])\n" +
                "        # calculate the new tensor\n" +
                "        N_tensor = transform(tensor, trans_z)\n" +
                "        # transform the tensor to 6*6\n" +
                "        N_CH = ToMatrix(N_tensor)\n" +
                "        # calculate the E1\n" +
                "        E, P = modulus(N_CH)\n" +
                "        E1[i] = E[0]\n" +
                "        P1[i] = P[0,1]\n" +
                "    # x,y = pol2cart(a,E1)\n" +
                "    \n" +
                "    # Plot figure\n" +
                "    fig, axs = plt.subplots(1, 2, subplot_kw={'projection': 'polar'})\n" +
                "    axs[0].plot(a, E1)\n" +
                "    axs[0].grid(True)\n" +
                "    axs[0].set_title(\"Young's Modulus\")\n" +
                "    axs[1].plot(a, P1)\n" +
                "    axs[1].grid(True)\n" +
                "    axs[1].set_title(\"Poisson's Ratio\")\n" +
                "    plt.tight_layout()\n" +
                "    plt.show()\n" +
                "    \n" +
                "    \n" +
                "def modulus(CH = None): \n" +
                "    S = np.linalg.inv(CH[np.ix_([0,1,3], [0,1,3])])\n" +
                "    E = np.zeros((3,1))\n" +
                "    P = np.zeros((3,3))\n" +
                "    E[0] = 1 / S[0,0]\n" +
                "    E[1] = 1 / S[1,1]\n" +
                "    E[2] = 1 / S[2,2]\n" +
                "    P[0,1] = -S[0,1] * E[1];\n" +
                "    P[1,0] = -S[1,0] * E[0];\n" +
                "    P[2,1] = -S[1,2] * E[1];\n" +
                "    P[1,2] = -S[2,1] * E[2];\n" +
                "    return E, P\n" +
                "    \n" +
                "    \n" +
                "def generate(CH = None): \n" +
                "    C = np.zeros((3,3,3,3))\n" +
                "    for i in range(6):\n" +
                "        for j in range(6):\n" +
                "            a,b = change(i)\n" +
                "            c,d = change(j)\n" +
                "            C[a,b,c,d] = CH[i,j]\n" +
                "    for i in range(3):\n" +
                "        if (i == 2):\n" +
                "            j = 0\n" +
                "        else:\n" +
                "            j = i + 1\n" +
                "        for m in range(3):\n" +
                "            if (m == 2):\n" +
                "                n = 0\n" +
                "            else:\n" +
                "                n = m + 1\n" +
                "            C[j,i,n,m] = C[i,j,m,n]\n" +
                "            C[j,i,m,n] = C[i,j,m,n]\n" +
                "            C[i,j,n,m] = C[i,j,m,n]\n" +
                "            C[j,i,m,m] = C[i,j,m,m]\n" +
                "            C[m,m,j,i] = C[m,m,i,j]\n" +
                "    return C\n" +
                "    \n" +
                "    \n" +
                "def change(w = None): \n" +
                "    # change the index 4 5 6 to 23 31 12\n" +
                "    if (w < 3):\n" +
                "        a = w\n" +
                "        b = w\n" +
                "    else:\n" +
                "        if (w == 3):\n" +
                "            a = 1\n" +
                "            b = 2\n" +
                "        else:\n" +
                "            if (w == 4):\n" +
                "                a = 2\n" +
                "                b = 0\n" +
                "            else:\n" +
                "                if (w == 5):\n" +
                "                    a = 0\n" +
                "                    b = 1\n" +
                "    return a,b\n" +
                "    \n" +
                "    \n" +
                "def ToMatrix(C = None): \n" +
                "    CH = np.zeros((6,6))\n" +
                "    for i in range(6):\n" +
                "        for j in range(6):\n" +
                "            a,b = change(i)\n" +
                "            c,d = change(j)\n" +
                "            CH[i,j] = C[a,b,c,d]\n" +
                "        return CH\n" +
                "\n" +
                "if __name__ == '__main__':\n" +
                "    \n" +
                "    # c = np.array([2963290579, 1459531181, 2963290579, 0, 0, 751879699])\n" +
                "    # c = np.array([2563908499, 1191999318, 2563908499, 0, 0, 650861882])\n" +
                "    c = np.array([604591262.41, 102330968.98, 1157840534.65, 0.00, 0.00, 156833419.95])\n" +
                "    visual2D(c)\n" +
                "\n" +
                "\n"}
            />
          </div>


          <ChartWrapper
            data={initialData}
            setData={setInitialData}
            query1={query1}
            query2={query2}
          />

        </div>
        <div className={styles.selectors}></div>
      </div>
    </div>
  );
}
