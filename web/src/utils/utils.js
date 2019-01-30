import { MENUS as menus } from '../constants'

import { fetchUtils } from '../react-admin';

export const getUser = () => {
    const persistedUser = localStorage.getItem('user');
    return persistedUser ? JSON.parse(persistedUser) : null;
}

export const getUserLandingPage = (user) => {
    if(user) {
        const visibleMenus = menus.filter(menu => hasPermission(user.permissions, menu.permission));
        if(visibleMenus.length > 0) {
            return '/'+visibleMenus[0].id;
        }
    }

    return '/';
}

export const hasOnlyOneMenuItem = (user) => {
    if(user) {
        const visibleMenus = menus.filter(menu => hasPermission(user.permissions, menu.permission));
        if(visibleMenus.length === 1) {
            return true;
        }
    }

    return false;
}

export const hasPermission = (permissions, permission) => {
    permissions = permissions || [];
    return permissions.indexOf(permission) !== -1;
}

export const permissionChecker = permissions => {
    return permission => {
        return hasPermission(permissions, permission);
    }
}

export const getHttpClient = () => {
    return (url, options = {}) => {
        if (!options.headers) {
            options.headers = new Headers({ Accept: 'application/json' });
        }

        const persistedTokens = localStorage.getItem('tokens');
        if(persistedTokens) {
            const tokens = JSON.parse(persistedTokens);
            options.headers.set('Authorization', `Bearer ${tokens.access_token}`);
        }

        return fetchUtils.fetchJson(url, options);
    };
}

export const getRawHttpClient = (token=true) => {
    return (url, options = {}) => {
        if(token) {
            const persistedTokens = localStorage.getItem('tokens');
            if(persistedTokens) {
                const tokens = JSON.parse(persistedTokens);
                if(options.headers === undefined) {
                    options.headers = {Authorization: `Bearer ${tokens.access_token}`};
                }else {
                    options.headers['Authorization'] = `Bearer ${tokens.access_token}`;
                }
            }
        }

        return fetch(url, options);
    };
}

export const getWrappedHttpClient = (token=true) => {
    return async function(url, options){
        const httpClient = getRawHttpClient(token);
        const response = await httpClient(url, options);
        try {
            const json = await response.json();
            return {
                success: response.ok ? true : false,
                payload: json,
            };
        }catch(error){
            throw new Error(response.statusText);
        }
    };
}

const dataSizeUnits = ['Bits', 'Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
const coefficients = [1, 8, 1024, 1024, 1024, 1024, 1024];

export const transformDataSize = (size, toUnit, fromUnit) => {
    size = size || 0;
    fromUnit = fromUnit || 'Bytes';

    let fromIndex = dataSizeUnits.indexOf(fromUnit);
    if(fromIndex === -1) {
        throw new Error('Unknown data size unit: '+fromUnit);
    }

    // guess the best target data size unit
    if(toUnit === undefined) {
        while(fromIndex + 1 < dataSizeUnits.length) {
            const coefficient = coefficients[fromIndex + 1];
            if(size < coefficient) {
                return { size, unit: dataSizeUnits[fromIndex]};
            }

            size = size * 1.0 / coefficient;
            fromIndex += 1;
        }
    }else {
        const toIndex = dataSizeUnits.indexOf(toUnit);
        if(toIndex === -1) {
            throw new Error('Unknown data size unit: '+toUnit);
        }

        if(fromIndex < toIndex) {
            const product = coefficients.reduce((accumulator, coefficient, index) => {
                if(index > fromIndex && index <= toIndex) {
                    accumulator *= coefficient;
                }

                return accumulator;
            },1);
            return {size: size * 1.0 / product, unit: toUnit};
        }else if (fromIndex > toIndex) {
            const product = coefficients.reduce((accumulator, coefficient, index) => {
                if(index > toIndex && index <= fromIndex) {
                    accumulator *= coefficient;
                }

                return accumulator;
            },1);
            return {size: size * product, unit: toUnit};
        }else {
            return {size, unit: toUnit};
        }
    }
}