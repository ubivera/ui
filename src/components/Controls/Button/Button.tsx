import React from 'react';
import ButtonBase from '../ButtonBase';
import './styles.scss';

type ButtonProps = {
    Content?: string | React.ReactNode;
    Click?: () => void;
    IsEnabled?: boolean;
    Style?: 'Primary' | 'Secondary' | 'Accent';
    ClickMode?: 'Release' | 'Press' | 'Hover';
    children?: React.ReactNode;
};

type ButtonImageProps = {
    Source: string;
};

const ButtonImage: React.FC<ButtonImageProps> = ({ Source }) => {
    return <img src={Source} alt="Button Image" className="button-image" />;
};

class Button extends ButtonBase {
    constructor(props: ButtonProps) {
        super(props);
    }

    static defaultProps = {
        IsEnabled: true,
        Style: 'Primary',
        ClickMode: 'Release'
    };

    public render(): JSX.Element {
        const { children } = this.props;
        let imageElement = null;

        React.Children.forEach(children, (child) => {
            if (React.isValidElement(child) && child.type === ButtonImage) {
                imageElement = child;
            }
        });

        return (
            <button
                onClick={this.handleClick}
                onMouseDown={this.handleMouseDown}
                onMouseEnter={this.handleMouseEnter}
                onKeyDown={this.handleKeyPress}
                className={this.props.Style}
                disabled={!this.props.IsEnabled}
            >
                <span className='button-content-wrapper'>
                    {imageElement && <span className='button-image-wrapper'>{imageElement}</span>}
                    <span className='button-text-wrapper'>{this.getContent()}</span>
                </span>
            </button>
        );
    }

    static Image = ButtonImage;
}

export default Button;