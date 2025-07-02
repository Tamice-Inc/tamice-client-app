declare module 'react-naver-login' {
    import * as React from 'react';

    export interface NaverLoginProps {
        clientId: string;
        callbackUrl?: string;
        render?: (props: any) => React.ReactElement;
        onSuccess?: (naverUser: any) => void;
        onFailure?: (result: any) => void;
    }

    export default function NaverLogin(props: NaverLoginProps): React.ReactElement;
}
