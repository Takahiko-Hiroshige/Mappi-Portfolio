import React from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
    createStyles({
        textArea: {
            marginRight: theme.spacing(2),
        },
    })
);

function PostForm(props) {
    const classes = useStyles();
    const { data, inputChange, btnFunc } = props; //追記
    return (
        <form>
            <TextField
                id="name"
                label="タスク名"
                variant="outlined"
                className={classes.textArea}
                name="name"
                value={data.name}
                onChange={inputChange}
            />
            <TextField
                id="content"
                label="内容"
                variant="outlined"
                className={classes.textArea}
                name="content"
                value={data.content}
                onChange={inputChange}
            />
            <Button
                color="primary"
                variant="contained"
                href="/"
                onClick={btnFunc}
            >
                登録
            </Button>
        </form>
    );
}

export default PostForm;
