import { Oval } from "react-loader-spinner"

export default function Loader() {
    return(
        <div style={{width: "250px", margin: "30px auto"}}>
            <Oval
                visible={true}
                height="80"
                width="80"
                color="#fff"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
};
