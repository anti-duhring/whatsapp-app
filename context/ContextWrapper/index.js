import React from "react";
import Context from '../Context'
import { theme } from "../../lib/constants/colors";

const ContextWrapper = (props) => {
    return (
        <Context.Provider value={{theme}}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextWrapper;