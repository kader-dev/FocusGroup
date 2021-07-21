import React, { useState, useEffect } from "react";
import Icon from "@material-ui/core/Icon";
import LinearProgress from "@material-ui/core/LinearProgress";
import styled from "styled-components";
import { withStyles } from "@material-ui/core";
import clsx from "clsx";
import './timer.css'
const TimerContainer = styled.div``;

const TimerIcon = styled(Icon)``;

const TimerBar = styled(LinearProgress)``;

export const styles = theme => ({
    root: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    icon: {
        padding: "1rem",
        color: "black"
    },
    timer: { width: "100rem", borderRadius: 10 }
});

const Timer = ({
    classes,
    className,
    hasIcon,
    timerIcon,
    tickFrequency,
    initialTime,
    timeLeft,
    prog,
    timerProps,
    iconProps,
    ...otherProps
}) => {
    const [progress, setProgress] = useState(initialTime);
    const time_to_subtrack = 1000;

    useEffect(() => {
        if (!progress) return;
        const progress_timer = setTimeout(() => {
            setProgress(progress => progress - time_to_subtrack);
            prog(progress);
        }, tickFrequency);
        return () => {
            clearInterval(progress_timer);
        };
    }, [progress]);

    useEffect(() => {
        if (!timeLeft || timeLeft > initialTime) return;
        setProgress(timeLeft);
    }, [timeLeft]);

    const formatMillisToPercentage = milliseconds => {
        return Math.floor((milliseconds / initialTime) * 100);
    };

    return (
        <TimerContainer className={clsx(classes.root, className)} {...otherProps}>
            {hasIcon ? (
                <TimerIcon className={classes.icon} {...iconProps}>
                    {timerIcon}
                </TimerIcon>
            ) : null}
            <TimerBar
                className={classes.timer}
                variant="determinate"
                value={formatMillisToPercentage(progress)}
                {...timerProps}
            />
        </TimerContainer>
    );
};

export default withStyles(styles)(Timer);