



const PrimaryButton = ({ children, onClick,className }) => {
    return (
        <div className={"rounded-md border border-white text-center bg-blue-500 px-2 text-white hover:bg-blue-400 cursor-pointer duration-100 "+className} onClick={onClick}>{children}</div >
    );
}

const SecondaryButton = ({ children, onClick,className }) => {
    return (
        <div className={" rounded-md text-center border border-blue-500 bg-white px-2 hover:text-blue-600 cursor-pointer duration-100 "+className} onClick={onClick}>{children}</div >
    );
}

export { PrimaryButton, SecondaryButton };