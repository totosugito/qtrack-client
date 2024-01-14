import {Link} from "@mui/material";
import {getRouterUrl} from "../../../../router";

const BrProjectOpen = ({hasClick=true, label}) => {
    return (
        <Link underline="hover" color="inherit" sx={{display: 'flex', alignItems: 'center'}}
              href={hasClick ? getRouterUrl("skk-project-open") : "#"}>
            {label}
        </Link>
    )
}
export default BrProjectOpen