class ContentControl
{
    private _content: string | React.ReactNode;

    constructor(content: string | React.ReactNode = '')
    {
        this._content = content;
    }

    public getContent(): string | React.ReactNode
    {
        return this._content;
    }

    public setContent(content: string | React.ReactNode): void
    {
        this._content = content;
    }
}

export default ContentControl;