import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import * as React from 'react';
import {useEffect} from 'react';



export const LinearDeterminate=()=> {

    const [progress, setProgress] = React.useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 300);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={progress}  style={{backgroundColor:"#80cbc4"}}/>
        </Box>
    );
}
