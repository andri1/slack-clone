import { Link } from 'react-router-dom'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import { defaultPath } from 'config'

export const LogoSection = () => (
  <ButtonBase disableRipple color="inherit" component={Link} to={defaultPath}>
    <Typography variant="h6" color="inherit" style={{ fontWeight: 'bold' }}>
      Slack Clone
    </Typography>
  </ButtonBase>
)

export default LogoSection
