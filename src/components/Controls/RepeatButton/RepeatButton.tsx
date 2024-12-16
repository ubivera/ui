import React, {useRef} from 'react';
import Button, {ButtonProps} from '../Button/Button';
import '../Button/Button.scss';

export interface RepeatButtonProps extends ButtonProps {
    Delay?: number;
    Interval?: number;
}

const RepeatButton: React.FC<RepeatButtonProps> = ({
                                                       Click,
                                                       Command,
                                                       Delay = 250,
                                                       Interval = 250,
                                                       ...props
                                                   }) => {
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleClick = (
        event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>
    ) => {
        if (Click) {
            Click(event);
        }

        if (Command) {
            Command(event);
        }

        if (!timerRef.current) {
            timerRef.current = setTimeout(() => {
                timerRef.current = setInterval(() => {
                    if (Click) {
                        Click(event);
                    }

                    if (Command) {
                        Command(event);
                    }
                }, Interval);
            }, Delay);
        }
    };

    const handleMouseUpOrLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (props.onMouseUp) props.onMouseUp(event);
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    return (
        <Button
            {...props}
            Click={(event) => {
                handleClick(event);
            }}
            onMouseUp={(event: React.MouseEvent<HTMLButtonElement>) => handleMouseUpOrLeave(event)}
            onMouseLeave={(event: React.MouseEvent<HTMLButtonElement>) => {
                if (props.onMouseLeave) props.onMouseLeave(event);
                handleMouseUpOrLeave(event);
            }}
            ClickMode="Press"
        />
    );
};

RepeatButton.displayName = 'RepeatButton';
export default RepeatButton;