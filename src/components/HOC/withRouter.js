import { useLocation, useParams } from "react-router-dom";

const withRouter = WrappedComponent => props => {
    const locations = useLocation();
    const params = useParams();
    // etc... other react-router-dom v6 hooks

    return (
        <WrappedComponent
            {...props}
            locations={locations}
            params={params}
        // etc...
        />
    );
};

export default withRouter;