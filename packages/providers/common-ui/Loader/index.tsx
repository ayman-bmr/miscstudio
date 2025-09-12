import React from "react"
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

interface LoaderProps {
    children: React.ReactNode;
    loading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ loading, children }) => {
    return loading ?
        (<Container sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <CircularProgress />
        </Container>) : <> {children} </>;
}

export default Loader;