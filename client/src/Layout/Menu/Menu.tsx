import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { styled } from '@mui/material/styles'
import LogoSection from './LogoSection'
import AccountBoxIcon from '@mui/icons-material/AccountBox'

const menuSections: {
  type: 'CHANNEL' | 'DIRECT_MESSAGE'
  content: { id: string; label: string }[]
}[] = [
  {
    type: 'CHANNEL',
    content: [
      {
        id: '1111',
        label: 'Happy admin',
      },
      {
        id: '2222',
        label: 'Happy team',
      },
      {
        id: '3333',
        label: 'Happy dev',
      },
    ],
  },
  {
    type: 'DIRECT_MESSAGE',
    content: [
      {
        id: '1111',
        label: 'Dude',
      },
      {
        id: '2222',
        label: 'Bro',
      },
    ],
  },
]

export const Menu = () => {
  return (
    <div style={{ width: 260 }}>
      <Box sx={{ py: '12px', px: 2 }}>
        <LogoSection />
      </Box>
      <Divider />

      {menuSections.map((section) => (
        <Accordion key={section.type} defaultExpanded>
          <AccordionSummary
            aria-controls={`${section.type}-content`}
            id={`${section.type}-header`}
          >
            <Typography>
              {section.type === 'CHANNEL' ? 'Channels' : 'Direct Messages'}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense disablePadding component="nav">
              {section.content?.map((link) => (
                <ListItemButton key={link.id}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      width: 24,
                      marginRight: 1,
                    }}
                  >
                    {section.type === 'CHANNEL' ? '#' : <AccountBoxIcon />}
                  </Box>
                  <ListItemText primary={link.label} />
                </ListItemButton>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  '&:before': {
    display: 'none',
  },
}))

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
}))

export default Menu
