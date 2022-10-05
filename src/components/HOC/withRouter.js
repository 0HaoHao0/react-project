import { useLocation, useNavigate, useParams } from "react-router-dom";

const withRouter = WrappedComponent => props => {
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    // etc... other react-router-dom v6 hooks

    return (
        <WrappedComponent
            {...props}
            locations={location}
            params={params}
            navigate={navigate}
        // etc...
        />
    );
};

export default withRouter;