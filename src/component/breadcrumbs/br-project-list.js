import {Link} from "@mui/material";
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';

const BrProjectList = ({hasClick=true}) => {
    return (
        <Link underline="hover" color="inherit" sx={{display: 'flex', alignItems: 'center'}}
              href={hasClick ? "#" : "#"}>
            <FolderOutlinedIcon sx={{mr: 0.5}} fontSize="inherit"/>
            Project
        </Link>
    )
}
export default BrProjectList
