import { MouseEventHandler, useCallback, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import { NavLink } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import AddIcon from '@mui/icons-material/Add'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import LogoSection from 'components/LogoSection'
import AddChannelDialog from './AddChannelDialog'
import {
  useGetChannelsQuery,
  useGetMeQuery,
  useGetUsersQuery,
} from 'generated/graphql'

type MenuSection = {
  type: 'CHANNEL' | 'DIRECT_MESSAGE'
  content: { id: string; label: string }[]
}

export const Menu = () => {
  const [openAddChannel, setOpenAddChannel] = useState<boolean>(false)

  const { data: channelsData } = useGetChannelsQuery()
  const { data: usersData } = useGetUsersQuery()
  const { data } = useGetMeQuery()
  const me = data?.me

  const handleAddBtnClick = useCallback<
    (
      type: 'CHANNEL' | 'DIRECT_MESSAGE',
    ) => MouseEventHandler<HTMLButtonElement | HTMLDivElement>
  >(
    (type) => (event) => {
      event.stopPropagation()

      if (type === 'CHANNEL') {
        setOpenAddChannel(true)
      }
    },
    [],
  )

  const handleCloseAddChannelDialog = useCallback(() => {
    setOpenAddChannel(false)
  }, [])

  const menuSections = useMemo<MenuSection[]>(() => {
    const sections: MenuSection[] = [
      {
        type: 'CHANNEL',
        content: [],
      },
      {
        type: 'DIRECT_MESSAGE',
        content: [],
      },
    ]

    if (channelsData?.channels) {
      sections[0] = {
        type: 'CHANNEL',
        content: channelsData.channels.map((channel) => ({
          id: channel.id,
          label: channel.name,
        })),
      }
    }

    if (usersData?.users && me) {
      sections[1] = {
        type: 'DIRECT_MESSAGE',
        content: usersData?.users
          .filter((user) => user.id !== me.id)
          .map((user) => ({
            id: user.id,
            label: user.firstName,
          })),
      }
    }

    return sections
  }, [channelsData, usersData, me])

  return (
    <Box sx={{ width: 260 }}>
      <Box sx={{ py: '12px', px: 2 }}>
        <LogoSection />
      </Box>
      <Divider />

      {menuSections.map((section) => (
        <Accordion key={section.type} defaultExpanded>
          <AccordionSummary
            aria-controls={`${section.type}-content`}
            id={`${section.type}-header`}
            sx={{
              '& .add-btn': {
                display: { xs: 'flex', sm: 'none' },
              },

              '&:hover': {
                '& .add-btn': {
                  display: 'flex',
                },
              },
            }}
          >
            <Typography>
              {section.type === 'CHANNEL' ? 'Channels' : 'Direct Messages'}
            </Typography>

            {section.type === 'CHANNEL' && (
              <IconButton
                size="small"
                style={{ marginLeft: 'auto' }}
                className="add-btn"
                onClick={handleAddBtnClick(section.type)}
              >
                <AddIcon />
              </IconButton>
            )}
          </AccordionSummary>
          <AccordionDetails>
            <List
              sx={{
                '& .active-menu-link': {
                  backgroundColor: 'primary.light',
                  color: 'common.white',
                  '&:hover': {
                    color: 'text.secondary',
                  },
                },
              }}
              dense
              disablePadding
              component="nav"
            >
              {section.content?.map((item) => (
                <ListItemButton
                  component={NavLink}
                  sx={{ paddingLeft: (theme) => theme.spacing(3) }}
                  to={`${
                    section.type === 'CHANNEL'
                      ? '/channels'
                      : '/direct-messages'
                  }/${item.id}`}
                  key={item.id}
                  activeClassName="active-menu-link"
                >
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
                  <ListItemText primary={item.label} />
                </ListItemButton>
              ))}

              {section.type === 'CHANNEL' && (
                <ListItemButton
                  sx={{ paddingLeft: (theme) => theme.spacing(3) }}
                  onClick={handleAddBtnClick(section.type)}
                >
                  <ListItemIcon style={{ minWidth: 32 }}>
                    <AddCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add channel" />
                </ListItemButton>
              )}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}

      <AddChannelDialog
        open={openAddChannel}
        onClose={handleCloseAddChannelDialog}
      />
    </Box>
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
  <MuiAccordionSummary expandIcon={<ArrowRightIcon />} {...props} />
))(() => ({
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    alignItems: 'center',
    margin: '7px 0px 7px 8px',
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: 0,
}))

export default Menu
