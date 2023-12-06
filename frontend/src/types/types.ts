export interface LoginParams {
    username: string;
    password: string;
    email: string;
}

export interface authState {
    user: Iuser | null;
    isLoading: boolean;
    token: string | null;
    status: string | null
}

export interface Iuser {
    _id: string,
    username: string;
    name: string;
    email: string;
    achievements: any[]
    purchasedCourses: any[];
    createdAt: string;
    isActivated: boolean;
    ethWallets: any[];
}

export interface WalletBalances {
    [wallet: string]: string;
  }