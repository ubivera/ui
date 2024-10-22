class ContentControl {
    private _content: string | React.ReactNode;
    private _renderContent?: (content: string | React.ReactNode) => React.ReactNode;

    constructor(content: string | React.ReactNode = '', renderContent?: (content: string | React.ReactNode) => React.ReactNode) {
        this._content = content;
        this._renderContent = renderContent;
    }

    public getContent(): string | React.ReactNode {
        return this._renderContent ? this._renderContent(this._content) : this._content;
    }

    public setContent(content: string | React.ReactNode): void {
        this._content = content;
    }

    public setRenderContentTemplate(template: (content: string | React.ReactNode) => React.ReactNode): void {
        this._renderContent = template;
    }
}

export default ContentControl;