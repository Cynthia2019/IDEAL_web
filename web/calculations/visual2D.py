import numpy as np
import matplotlib.pyplot as plt
from transform import transform
    

def visual2D(c): 
    '''

    Parameters
    ----------
    c : 1D numpy array
        [C11, C12, C22, C16, C26, C66].

    Returns
    -------
    None.

    '''
    # transform c to CH (a 6x6 matrix)
    CH = np.ones((6,6)) * 1e-7
    CH[0,0] = c[0]
    CH[0,1] = c[1]
    CH[1,0] = c[1]
    CH[1,1] = c[2]
    CH[0,5] = c[3]
    CH[5,0] = c[3]
    CH[1,5] = c[4]
    CH[5,1] = c[4]
    CH[5,5] = c[5]
    # transform CH to a 3*3*3*3 tensor
    tensor = generate(CH)
    # find the E1 in 360 degree
    a = np.arange(0, 2*np.pi+0.02*np.pi, 0.02*np.pi)
    E1 = np.zeros_like(a)
    P1 = np.zeros_like(a)
    for i in range(len(a)):
        trans_z = np.array([[np.cos(a[i]), -np.sin(a[i]), 0],
                            [np.sin(a[i]),  np.cos(a[i]), 0],
                            [0,             0,            1]])
        # calculate the new tensor
        N_tensor = transform(tensor, trans_z)
        # transform the tensor to 6*6
        N_CH = ToMatrix(N_tensor)
        # calculate the E1
        E, P = modulus(N_CH)
        E1[i] = E[0]
        P1[i] = P[0,1]
    # x,y = pol2cart(a,E1)
    
    # Plot figure
    fig, axs = plt.subplots(1, 2, subplot_kw={'projection': 'polar'})
    print("Young's r and theta:")
    print(a * 180 / np.pi)
    print(E1)
    print("Poisson r:")
    print(P1)
    axs[0].plot(a, E1)
    axs[0].grid(True)
    axs[0].set_title("Young's Modulus")
    axs[1].plot(a, P1)
    axs[1].grid(True)
    axs[1].set_title("Poisson's Ratio")
    plt.tight_layout()
    plt.show()
    
    
def modulus(CH = None): 
    S = np.linalg.inv(CH[np.ix_([0,1,3], [0,1,3])])
    E = np.zeros((3,1))
    P = np.zeros((3,3))
    E[0] = 1 / S[0,0]
    E[1] = 1 / S[1,1]
    E[2] = 1 / S[2,2]
    P[0,1] = -S[0,1] * E[1];
    P[1,0] = -S[1,0] * E[0];
    P[2,1] = -S[1,2] * E[1];
    P[1,2] = -S[2,1] * E[2];
    return E, P
    
    
def generate(CH = None): 
    C = np.zeros((3,3,3,3))
    for i in range(6):
        for j in range(6):
            a,b = change(i)
            c,d = change(j)
            C[a,b,c,d] = CH[i,j]
    for i in range(3):
        if (i == 2):
            j = 0
        else:
            j = i + 1
        for m in range(3):
            if (m == 2):
                n = 0
            else:
                n = m + 1
            C[j,i,n,m] = C[i,j,m,n]
            C[j,i,m,n] = C[i,j,m,n]
            C[i,j,n,m] = C[i,j,m,n]
            C[j,i,m,m] = C[i,j,m,m]
            C[m,m,j,i] = C[m,m,i,j]
    return C
    
    
def change(w = None): 
    # change the index 4 5 6 to 23 31 12
    if (w < 3):
        a = w
        b = w
    else:
        if (w == 3):
            a = 1
            b = 2
        else:
            if (w == 4):
                a = 2
                b = 0
            else:
                if (w == 5):
                    a = 0
                    b = 1
    return a,b
    
    
def ToMatrix(C = None): 
    CH = np.zeros((6,6))
    for i in range(6):
        for j in range(6):
            a,b = change(i)
            c,d = change(j)
            CH[i,j] = C[a,b,c,d]
    return CH


if __name__ == '__main__':
    
    # c = np.array([2963290579, 1459531181, 2963290579, 0, 0, 751879699])
    # c = np.array([2563908499, 1191999318, 2563908499, 0, 0, 650861882])
    c = np.array([604591262.41, 102330968.98, 1157840534.65, 0.00, 0.00, 156833419.95])
    visual2D(c)