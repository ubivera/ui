import React from 'react';
import Names from '../../Names';
import ButtonBase from '../ButtonBase';
import './styles.scss';

type ButtonProps = {
    Name?: string;
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

type ButtonContentProps = {
    children: React.ReactNode;
};

const ButtonContent: React.FC<ButtonContentProps> = ({ children }) => {
    return <span className="button-text-wrapper">{children}</span>;
};

class Button extends ButtonBase {
    private buttonRef: React.RefObject<HTMLButtonElement>;

    constructor(props: ButtonProps) {
        super(props);
        this.buttonRef = React.createRef();
    }

    static defaultProps = {
        IsEnabled: true,
        Style: 'Primary',
        ClickMode: 'Release'
    };

    componentDidMount() {
        if (this.props.Name && this.buttonRef.current) {
            new Names(this.props.Name, this.buttonRef.current);
        }
    }

    public render(): JSX.Element {
        const { children } = this.props;
        let imageElement = null;
        let contentElement = null;

        React.Children.forEach(children, (child) => {
            if (React.isValidElement(child)) {
                if (child.type === ButtonImage) {
                    imageElement = child;
                }
                if (child.type === ButtonContent) {
                    contentElement = child;
                }
            }
        });

        return (
            <button
                ref={this.buttonRef}
                onClick={this.handleClick}
                onMouseDown={this.handleMouseDown}
                onMouseEnter={this.handleMouseEnter}
                onKeyDown={this.handleKeyPress}
                className={this.props.Style}
                disabled={!this.props.IsEnabled}
            >
                <span className="button-content-wrapper">
                    {imageElement && <span className="button-image-wrapper">{imageElement}</span>}
                    {contentElement ? (
                        contentElement
                    ) : (
                        <span className="button-text-wrapper">{this.getContent()}</span>
                    )}
                </span>
            </button>
        );
    }

    static Image = ButtonImage;
    static Content = ButtonContent;
}

export default Button;