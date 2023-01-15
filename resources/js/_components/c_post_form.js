/**削除予定 */
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

const PostForm = (props) => {
    const classes = useStyles();
    const { data, inputChange, btnFunc, setSelectedFile } = props; //追記
    return (
        <form>
            <TextField
                id="name"
                label="タスク名"
                variant="outlined"
                className={classes.textArea}
                name="taskName"
                value={data.taskName}
                onChange={(e) =>
                    inputChange({ ...data, taskName: e.target.value })
                }
            />
            <TextField
                id="content"
                label="内容"
                variant="outlined"
                className={classes.textArea}
                name="content"
                value={data.content}
                onChange={(e) =>
                    inputChange({ ...data, content: e.target.value })
                }
            />
            <input
                type="file"
                name="file"
                className="mb-4"
                onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <Button color="primary" variant="contained" onClick={btnFunc}>
                登録
            </Button>
        </form>
    );
};

export default PostForm;
