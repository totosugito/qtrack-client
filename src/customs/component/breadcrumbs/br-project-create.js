import {Link} from "@mui/material";
import {getRouterUrl} from "../../router";

const BrProjectCreate = ({hasClick=true}) => {
    return (
        <Link underline="hover" color="inherit" sx={{display: 'flex', alignItems: 'center'}}
              href={hasClick ? getRouterUrl("skk-project-create") : "#"}>
            Create
        </Link>
    )
}
export default BrProjectCreate
