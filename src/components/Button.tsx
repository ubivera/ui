type ButtonProps = React.HTMLAttributes<HTMLButtonElement>;

export default function Button(props: ButtonProps) {
    return <button {...props} />;
}