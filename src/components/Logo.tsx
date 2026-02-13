export default function Logo({
    width = 32,
    height = 32,
    className,
    ...props
}: React.ComponentProps<"svg"> & { width?: number | string; height?: number | string }) {
    return (
        <svg
            viewBox="0 0 32 32"
            width={width}
            height={height}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
            <rect x="4" y="4" width="24" height="24" rx="6" fill="currentColor" fillOpacity="0.2" />
            <path
                d="M22 10H10C9.44772 10 9 10.4477 9 11V21C9 21.5523 9.4477 22 10 22H22C22.5523 22 23 21.5523 23 21V11C23 10.4477 22.5523 10 22 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M13 14H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M13 18H16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <circle cx="21" cy="11" r="2" fill="currentColor" />
        </svg>
    );
}
