import React from 'react'
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"

interface BtnProps {
  loading: boolean;
  children: React.ReactNode;
  [key: string]: any;
}

const LoadingButton: React.FC<BtnProps> = ({ loading, children, ...rest }) => {
  return (
    <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        sx={{cursor: loading ? 'not-allowed' : 'pointer' }}
        {...rest}
    >
        {loading ? <CircularProgress size={24} /> : <> {children} </>}
    </Button>
  )
}

export default LoadingButton;