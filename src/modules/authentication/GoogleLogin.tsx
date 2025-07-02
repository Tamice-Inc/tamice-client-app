import React, { Component } from 'react'

import { getScript } from './utils/auth'

export interface IGoogleLoginButtonProps {

    readonly clientConfig: gapi.auth2.ClientConfig,
    readonly singInOptions?: gapi.auth2.SigninOptions | gapi.auth2.SigninOptionsBuilder,
    readonly classNames?: string,
    readonly preLogin?: () => void,
    readonly responseHandler: (response: gapi.auth2.GoogleUser) => void
    readonly failureHandler?: (error: string) => void,
    readonly children?: ReadonlyArray<JSX.Element> | JSX.Element
    readonly renderOptions?: {
        readonly width?: number,
        readonly height?: number,
        readonly longtitle?: boolean,
        readonly theme?: string, // must be either dark or light
    }
}