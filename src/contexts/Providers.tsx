import type {ReactElement, ReactNode} from "react";
import * as React from "react";

type ProvidersProps = {
    providers: ReactElement[];
    children: ReactNode;
};

const nest = (children: ReactNode, component: React.ReactElement) => {
    return React.cloneElement(component, undefined, children);
};

const Providers = ({ providers, children }: ProvidersProps) => {
    return providers.reduceRight(nest, children);
};

export default Providers;