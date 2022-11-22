import numpy as np


def transform(itr,tmx):
    '''
    Transform 3D-tensor (Euclidean or Cartesion tensor) of any order (>0) to another coordinate system
    Parameters:
        itr: input tensor, before transformation; should be a 3-element vector, a 3x3 matrix, or a 3x3x3x... multidimensional array, each dimension containing 3 elements
        tmx: transformation matrix, 3x3 matrix that contains the direction cosines between the old and the new coordinate system
    Returns:
        otr: output tensor, after transformation; has the same dimensions as the input tensor
    '''
    ne = np.asarray(itr).size
    nd = np.asarray(itr).ndim
    
    if (ne == 3):
        nd = 1
    
    otr = np.zeros_like(itr)
    
    iie = np.zeros((nd,1))
    ioe = np.zeros((nd,1))
    cne = np.cumprod(3 * np.ones((nd,1))) / 3
    
    for oe in range(ne):
        ioe = np.mod(np.floor(oe / cne).astype(int), 3)
        for ie in range(ne):
            pmx = 1
            iie = np.mod(np.floor(ie / cne).astype(int), 3)
            for i in range(nd):
                pmx = pmx * tmx[ioe[i], iie[i]]
            otr[np.unravel_index(oe, otr.shape)] = otr[np.unravel_index(oe, otr.shape)] + pmx * itr[np.unravel_index(ie, itr.shape)]
    
    return otr