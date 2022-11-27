const Stepper = ({ currentIndex, items }) => {
    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "24px",
            }}
        >
            <div
                style={{
                    display: "flex",
                }}
            >
                {items.map((item, index) => (
                    <div
                        style={{
                            borderBottom: !(currentIndex === index) ? "2px solid black" : "3px solid green",
                            marginLeft: "20px",
                            color: !(currentIndex === index) ? "black" : "green",
                        }}
                    >
                        {item.title}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stepper;
