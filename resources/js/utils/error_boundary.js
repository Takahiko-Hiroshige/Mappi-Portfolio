/*ErrorBoundary*
 * Error boundaries catch errors during rendering, in lifecycle methods,
 * and in constructors of the whole tree below them.
 * https://ja.reactjs.org/docs/error-boundaries.html#gatsby-focus-wrapper
 */
import React from "react";
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
    }

    handleClick() {
        try {
            // Do something that could throw
        } catch (error) {
            this.setState({ error });
        }
    }
    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <div>Reactで予期せぬエラーが発生しました。</div>
                    <pre>{this.state.error?.message}</pre>
                </div>
            );
        }
        return <>{this.props.children}</>;
    }
}

export default ErrorBoundary;
