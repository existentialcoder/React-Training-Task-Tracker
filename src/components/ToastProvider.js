import React, { createContext, useState, useContext } from 'react';

import { Snackbar, Alert } from '@mui/material';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState({
        open: false,
        message: '',
        severity: 'info',
    });

    const showToast = (message, severity = 'info') => {
        setToast({ open: true, message, severity });
    };

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
