import React from "react";
import Button from "@material-ui/core/Button";

const example = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>
                        <div className="card-body">
                            I'm an example component!!!
                        </div>
                        <Button
                            color="secondary"
                            variant="contained"
                            href={`/`}
                        >
                            Go Home!!!
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default example;
