
import React from "react";
import { DivProps } from ".";



interface DataTableTemplatesProps extends Omit<DivProps, "tile"> {
    // buttonComponent?: React.ReactNode;
    // inputComponent?: React.ReactNode;
    // tableComponent?: React.ReactNode;
    // paginationComponent?: React.ReactNode;
    // titleComponent?: React.ReactNode;
}


export const DataTableTemplates = React.forwardRef<
    HTMLElement,
    DataTableTemplatesProps
>(
    ({
        className = "",
        // inputComponent,
        // buttonComponent,
        // tableComponent,
        // paginationComponent,
        // titleComponent,
        children,
        // title,
        ...props

    }
        , ref,
    ) => {
        return (
            <div
                className={className}
            >
                <div>
                    {children}
                </div>
                {/* {paginationComponent} */}

            </div>
        )
    }
)