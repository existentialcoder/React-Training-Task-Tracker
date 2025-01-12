/**
 * @module ToastProvider - ToastProvider component
 */

import React, { createContext, useState, useContext } from 'react';

import { Snackbar, Alert } from '@mui/material';

const ToastContext = createContext();

/**
 * React component for ToastProvider to show toast
 *
 * @param {Object} props - The props object.
 * @param {HTMLElement[]} props.children - Children elements for the provider
 * @returns {JSX.Element} The rendered component. 
 */
export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState({
        open: false,
        message: '',
        severity: 'info',
    });

    /**
     * Takes the message and toasts it using Snackbar
     * 
     * @param {string} message - Message to be toasted
     * @param {string} severity - One of {info | warning | error}
     */
    const showToast = (message, severity = 'info') => {
        setToast({ open: true, message, severity });
    };

    /**
     * CLoses the toast
     */
    const handleClose = () => {
        setToast({ ...toast, open: false });
    };

    return (
        <ToastContext.Provider value={showToast}>
            {children}
            <Snackbar
                open={toast.open}
                autoHideDuration={2000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleClose} severity={toast.severity} variant='filled'>
                    {toast.message}
                </Alert>
            </Snackbar>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    return useContext(ToastContext);
};
