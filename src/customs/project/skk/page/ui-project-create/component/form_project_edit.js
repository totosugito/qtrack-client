import {Box, Button, InputLabel, TextField, useTheme} from "@mui/material";
import TextEditor from "../../../../../component/TipTap/TextEditor";
import {useRef} from "react";
import {useState} from "react";

const FormProjectEdit = ({onSubmit, data, submitText}) => {
    const theme = useTheme()
    const styles = {
        title: {
            mt: 2,
            mb: 1,
            fontSize: '25px',
            color: theme.palette.secondary.main
        },
        formLabel: {
            mt: 1,
            ml: 1
        }
    }

    const rteRef = useRef(null);
    const [project, setProject] = useState(JSON.parse(JSON.stringify(data)))
    const {title, desc, info} = project

    const onChange = (e) => {
        setProject((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onProjectUpdate = () => {
        project.info = rteRef.current?.editor?.getHTML()
        onSubmit(project);
    }
    return (
        <>
            <form onSubmit={onProjectUpdate}>
                <Box sx={styles.boxField}>
                    <InputLabel sx={styles.formLabel}>
                        Title*
                    </InputLabel>
                    <TextField
                        sx={{p: 1}}
                        fullWidth
                        required
                        type="text"
                        name='title'
                        size={'small'}
                        value={title || ''}
                        onChange={onChange}
                    />
                </Box>
                <Box sx={styles.boxField}>
                    <InputLabel sx={styles.formLabel}>
                        Description
                    </InputLabel>
                    <TextField
                        sx={{p: 1}}
                        fullWidth
                        type="text"
                        name='desc'
                        size={'small'}
                        value={desc || ''}
                        onChange={onChange}
                    />
                </Box>
                <Box sx={styles.boxField}>
                    <InputLabel sx={styles.formLabel}>
                        Info
                    </InputLabel>
                    <Box sx={{ml: 1, mr: -1, mt: 1}}><TextEditor refId={rteRef} content={info || ''}/></Box>
                </Box>
                <Button
                    sx={{m: 1}}
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary">
                    {submitText}
                </Button>
            </form>
        </>
    )
}
export default FormProjectEdit