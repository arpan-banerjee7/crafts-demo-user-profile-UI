import React from 'react'
import Alert from '@mui/material/Alert';

function Message({ children }) {
    return (
        <Alert severity={"error"}>
            {children}
        </Alert>
    )
}

export default Message
