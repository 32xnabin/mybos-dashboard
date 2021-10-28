import React, { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { createCase, uploadImage } from '../../../services'
import RichEditor from '../../../components/RichEditor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWrench } from '@fortawesome/free-solid-svg-icons'
import { faPrint } from '@fortawesome/free-solid-svg-icons'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone'
import ExpandMoreTwoToneIcon from '@material-ui/icons/ExpandMoreTwoTone'
import Photo from '../../../components/Photo'

import {
  InputField,
  InputFieldNotes,
  DateField,
  InfoLabel,
  Placeholder,
  MainContainer,
  GridContainer,
  GridContainer1,
  FileuploadContainer,
  DropDown,
  InputFieldSubject,
  InputWrapper,
  WhiteLabel,
  ButtonsContainer,
  HeadingLabel1,
  MainWrapper,
  BlueHeader,
  BlueLine,
  HorDiv,
  StyledDiv,
  Disabled,
  GridContainerPhoto,
  StyledDivSmall,
  HeadingLabel,
} from './Create.style'
import { makeStyles } from '@material-ui/styles'
import { Modal } from '@material-ui/core'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import Select from 'react-select'
import { List, ListItem, Popover } from '@material-ui/core'

function rand() {
  return Math.round(Math.random() * 20) - 10
}

const Create: React.FC = () => {
  const ref = React.useRef<any>(null)
  const [isOpen, setOpen] = React.useState<boolean>(false)

  const handleOpenPop = (): void => {
    setOpen(true)
  }

  const handleClosePop = (): void => {
    setOpen(false)
  }

  const [openSnack, setOpenSnak] = React.useState(false)
  const handleClickSnack = () => {
    setOpenSnak(true)
  }

  const handleCloseSnack = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnak(false)
  }

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnack}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )

  function getModalStyle() {
    const top = 50 + rand()
    const left = 50 + rand()

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    }
  }
  const handleClose = () => {
    setOpenModal(false)
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',

      backgroundColor: '#fff',
      boxShadow: 'none',
      padding: 4,
      outline: 'none',
    },
  }))

  const [modalStyle] = React.useState(getModalStyle)
  let navigate = useNavigate()

  const mock_case_types = [
    'Repair and Maintainance',
    'Requests',
    'Common Repairs',
    'Replacement',
    'Gardening',
    'Incident',
  ]
  const mock_priority = ['High', 'Low', 'Medium']
  const mock_status = [
    'New',
    'In Progress',
    'Completed',
    'Deleted',
    'Awaiting Invoice',
    'Awaiting Quote',
    'Awaiting Approval',
    'Committee Approval',
    'Contractor status',
  ]
  const mock_job_area = ['common-asset', 'common-not-asset', 'private lot']
  const mock_category = [
    'All Categories',
    'CLOUDIO',
    'COMMON AREA',
    'DOOR',
    'ELECTRICAL',
    'EXHAUST',
    'GYM / POOL',
  ]

  const mock_apartments = [
    'Pick Appartments',
    '44',
    '375',
    '77',
    '56',
    '45',
    '66',
    '44',
    '375',
    '77',
    '56',
    '45',
    '66',
  ]

  const mock_assets = [
    { value: 'BLDG-Plumbing', label: 'BLDG-Plumbing' },
    { value: 'BLDG-Toilets', label: 'BLDG-Toilets' },
    { value: 'BLDG-Rest', label: 'BLDG-Rest' },
  ]

  const mock_assigned_to = [
    { value: 'Ace hanndy andy', label: 'Ace hanndy andy' },
    { value: 'bradyos', label: 'bradyos' },
    { value: 'AZ-Electrician', label: 'AZ-Plumbing' },
    { value: 'Chummins', label: 'Chummins' },
  ]
  const mock_subject = [
    'Light out',
    'bulb blown',
    'Inspect water meters',
    'pool clean',
  ]
  const mock_email_template = [
    [
      {
        type: 'paragraph',
        children: [
          {
            text:
              'AWS BM : 1.9.7001(108) - https://drive.google.com/file/d/1YEm6rtKJhkdhqS3-Vi3okZO9yhYzgUzC/view?usp=sharing ',
          },
        ],
      },
      {
        type: 'paragraph',
        children: [
          {
            text:
              'AWS Resident: 1.7.4001(76) - https://drive.google.com/file/d/1S0dsR3nWsTwhsiR2zV857F57OvnVFlKc/view?usp=sharing',
          },
        ],
      },
    ],
    [
      {
        type: 'paragraph',
        children: [{ text: 'Template for bulb blown ' }],
      },
    ],
    [
      {
        type: 'paragraph',
        children: [
          {
            text:
              'Blueridge to survey Main water meter and Residential water meter and random Lot water meters to find out if water usage is appropriate and if any issues with meters such as Lots 35, 63 and 93 ',
          },
        ],
      },
    ],
    [
      {
        type: 'paragraph',
        children: [{ text: 'Clean and test Parts on order ' }],
      },
    ],
  ]

  const validationSchema = Yup.object().shape({
    case_type: Yup.string(),
    added_date: Yup.string(),
    due_date: Yup.string(),
    priority: Yup.string(),
    status: Yup.string(),
    job_area: Yup.string(),
    category: Yup.string(),
    asset_category: Yup.string(),
    assigned_to: Yup.string(),
    email_subject: Yup.string(),
    email_description: Yup.string(),
    notes: Yup.string(),
    logged_by: Yup.string(),
  })

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: ' ' }],
    },
  ]

  const [openModal, setOpenModal] = React.useState(false)
  const [caseImages, setCaseImages] = React.useState([''])
  const [casenum, setCasenum] = React.useState(0)
  const [email_subject, setEmail_subject] = React.useState('')
  const [email_desc, setEmail_desc] = React.useState(initialValue)
  const [jobArea, setJobArea] = React.useState('common-asset')
  const [assignedTo, setAssignedTo] = React.useState([])
  const [asset, setAsset] = React.useState([])
  const [addedDate, setAddedDate] = React.useState(
    new Date().toISOString().substr(0, 10),
  )
  const [dueDate, setDueDate] = React.useState(
    new Date().toISOString().substr(0, 10),
  )

  React.useEffect(() => {
    setCasenum(Number(localStorage.getItem('max_case_number')) + 1)
    setAddedDate(new Date().toISOString().substr(0, 10))
    setDueDate(new Date().toISOString().substr(0, 10))
  }, [])

  const removePhoto = async (e) => {
    const url = e.currentTarget.getAttribute('data-value1')
    const newArray = caseImages
    const index = newArray.indexOf(url)
    if (index > -1) {
      newArray.splice(index, 1)
    }
    setCaseImages(newArray)
    navigate('/bm/cases/create')
    return true
  }

  const onImageUploaded = async (file): Promise<boolean> => {
    const res = await uploadImage(file)
    setCaseImages([...caseImages, res.url])
    return false
  }

  const onJobAreaChange = (e) => {
    let index = mock_job_area.indexOf(e.target.value)
    let template = mock_job_area[index]
    setJobArea(template)
  }

  const onEmailSubjectChangeText = (e) => {
    setEmail_subject(e.target.value)
  }

  const onEmailSubjectChange = (e) => {
    const subject = e.currentTarget.getAttribute('data-subject')
    handleClosePop()

    setEmail_subject(subject)
    let index = mock_subject.indexOf(subject)
    if (index !== -1) {
      let template = mock_email_template[index]
      setEmail_desc(template)
    }
  }

  const onAddedDateChange = (value: any) => {
    const added_date = new Date(value).toISOString().substr(0, 10)
    setAddedDate(added_date)
  }

  const onDueDateChange = (value: any) => {
    const due_date = new Date(value).toISOString().substr(0, 10)
    setDueDate(due_date)
  }

  const onAssignedChange = (value: any) => {
    setAssignedTo(value)
  }

  const onAssetChange = (value: any) => {
    setAsset(value)
  }

  const createCSV = (arr: any[]) => {
    let csv = arr.map((item) => item.value).join(',')
    return csv
  }

  const onSubmit = (data: any) => {
    if (
      assignedTo.length > 0 &&
      (jobArea === 'common-not-asset' || asset.length > 0)
    ) {
      data['due_date'] = dueDate
      data['added_date'] = addedDate
      data['assigned_to'] = createCSV(assignedTo)
      data['asset'] = createCSV(asset)
      data['email_subject'] = email_subject
      data['email_description'] = JSON.stringify(email_desc)
      if (caseImages.length > 0) {
        data['images'] = caseImages
      }

      createCase(data)
        .then((result: any) => {
          localStorage.setItem('max_case_number', String(result.case_number))
          handleClickSnack()
          setTimeout(() => {
            navigate('/bm/cases/list')
          }, 3000)
        })
        .catch((error: any) => {
          navigate('/login')
        })
    }
  }

  const onCancel = (data: any) => {
    navigate('/bm/cases/list')
  }

  const onAddAndReset = (data: any) => {
    if (
      assignedTo.length > 0 &&
      (jobArea === 'common-not-asset' || asset.length > 0)
    ) {
      data['due_date'] = dueDate
      data['added_date'] = addedDate
      data['assigned_to'] = createCSV(assignedTo)
      data['asset'] = createCSV(asset)
      data['email_subject'] = email_subject
      data['email_description'] = JSON.stringify(email_desc)
      if (caseImages.length > 0) {
        data['images'] = caseImages
      }

      //   createCase(data)
      //     .then((result: any) => {
      //       localStorage.setItem('max_case_number', String(result.case_number))
      //       handleClickSnack()
      //       setTimeout(() => {
      //         navigate('/bm/cases/create')
      //       }, 3000)
      //     })
      //     .catch((error: any) => {
      //       navigate('/login')
      //     })
    }
  }
  const classes = useStyles()
  const jobAreaFiled = register('job_area')

  return (
    <div
      style={{
        marginTop: 20,
        border: '1px solid #eee',
        width: '95%',
        marginLeft: 8,
        marginRight: 8,
      }}
    >
      <MainWrapper>
        <Snackbar
          open={openSnack}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Case Successfully Added"
          action={action}
        />
        <BlueHeader>
          <HorDiv>
            <FontAwesomeIcon color="white" icon={faWrench} />
            <WhiteLabel>Create Cases</WhiteLabel>
          </HorDiv>
          <HorDiv style={{ visibility: 'hidden' }}>
            <FontAwesomeIcon color="white" icon={faPrint} />
            <FontAwesomeIcon color="white" icon={faCog} />
          </HorDiv>
        </BlueHeader>
        <MainContainer>
          <GridContainer>
            <HeadingLabel>Case Information</HeadingLabel>
            <Placeholder />
          </GridContainer>
          <GridContainer1>
            <HeadingLabel>Attachments</HeadingLabel>

            <StyledDivSmall
              color="primary"
              style={{ height: 20 }}
              onClick={() => setOpenModal(true)}
            >
              <FontAwesomeIcon color="white" icon={faPaperclip} />
            </StyledDivSmall>
          </GridContainer1>
        </MainContainer>
        <MainContainer>
          <div>
            <BlueLine />
          </div>
          <div>
            <BlueLine />
          </div>
        </MainContainer>
        <MainContainer>
          <GridContainer>
            <InfoLabel bold={true}>Case Number</InfoLabel>
            <Disabled>{casenum}</Disabled>
            <InfoLabel>Case Type</InfoLabel>
            <DropDown id="case_type" {...register('case_type')}>
              {mock_case_types.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </DropDown>

            <InfoLabel>Added</InfoLabel>

            <DateField
              value={addedDate}
              onChange={(e) => onAddedDateChange(e.target.value)}
              id="added_date"
              type="date"
            />
            <InfoLabel>Due Date</InfoLabel>

            <DateField
              value={dueDate}
              onChange={(e) => onDueDateChange(e.target.value)}
              id="due_date"
              type="date"
            />

            <InfoLabel>Priority</InfoLabel>
            <DropDown id="priority" {...register('priority')}>
              {mock_priority.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </DropDown>
            <InfoLabel>Status</InfoLabel>
            <DropDown id="status" {...register('status')}>
              {mock_status.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </DropDown>
          </GridContainer>
          <FileuploadContainer>
            <Modal onClose={handleClose} open={openModal}>
              <GridContainerPhoto style={modalStyle} className={classes.paper}>
                <Photo uploadImage={onImageUploaded} />
                <Photo uploadImage={onImageUploaded} />
                <Photo uploadImage={onImageUploaded} />
                <Photo uploadImage={onImageUploaded} />
                <Photo uploadImage={onImageUploaded} />
                <Photo uploadImage={onImageUploaded} />
                <Photo uploadImage={onImageUploaded} />
                <Photo uploadImage={onImageUploaded} />
                <Photo uploadImage={onImageUploaded} />
                <Photo uploadImage={onImageUploaded} />
              </GridContainerPhoto>
            </Modal>
            <GridContainer>
              {caseImages
                .filter((url) => url !== '')
                .map((url, index) => (
                  <div key={index} style={{ margin: 10 }}>
                    <img alt="case" height={150} width={150} src={url} />
                    <Button onClick={removePhoto} data-value1={url}>
                      <DeleteTwoToneIcon fontSize="small" />
                    </Button>
                  </div>
                ))}
            </GridContainer>
          </FileuploadContainer>
        </MainContainer>
        <MainContainer>
          <GridContainer>
            <HeadingLabel>Asset Information</HeadingLabel>
            <Placeholder />
          </GridContainer>
          <GridContainer>
            <HeadingLabel></HeadingLabel>
            <Placeholder />
          </GridContainer>
        </MainContainer>
        <MainContainer>
          <div>
            <BlueLine />
          </div>
          <div></div>
        </MainContainer>
        <MainContainer>
          <GridContainer>
            <InfoLabel>Job Area</InfoLabel>
            <DropDown
              id="job_area"
              {...jobAreaFiled}
              onChange={(e) => {
                jobAreaFiled.onChange(e)
                onJobAreaChange(e)
              }}
            >
              {mock_job_area.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </DropDown>
            {jobArea !== 'common-not-asset' && (
              <>
                <InfoLabel>Category</InfoLabel>
                {jobArea === 'common-asset' ? (
                  <DropDown id="category" {...register('category')}>
                    {mock_category.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </DropDown>
                ) : (
                  <DropDown id="category" {...register('category')}>
                    {mock_apartments.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </DropDown>
                )}

                <InfoLabel>Asset</InfoLabel>
                <InputWrapper style={{ zIndex: 4 }}>
                  <Select
                    isMulti
                    onChange={onAssetChange}
                    options={mock_assets}
                  />
                </InputWrapper>
              </>
            )}
            <InfoLabel>Assigned To</InfoLabel>
            <InputWrapper style={{ zIndex: 3 }}>
              <Select
                isMulti
                onChange={onAssignedChange}
                options={mock_assigned_to}
              />
            </InputWrapper>
            <InfoLabel>Subject</InfoLabel>
            <div>
              <InputFieldSubject
                onChange={(e) => onEmailSubjectChangeText(e)}
                value={email_subject}
              ></InputFieldSubject>
              <Button
                style={{
                  border: '1px solid #ccc',
                  height: 36,
                  borderRadius: 0,
                  width: '610px',
                  position: 'relative',
                  top: -36,
                  zIndex: 1,
                  textAlign: 'right',
                }}
                ref={ref}
                onClick={handleOpenPop}
              >
                <div style={{ textAlign: 'right', width: '100%' }}>
                  <ExpandMoreTwoToneIcon
                    style={{ color: '#ccc' }}
                    sx={{ ml: 1 }}
                  />
                </div>
              </Button>
              <Popover
                anchorEl={ref.current}
                onClose={handleClosePop}
                open={isOpen}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <div style={{ width: '610px', border: '1px solid #ccc' }}>
                  <List sx={{ p: 1 }} component="nav">
                    {mock_subject.map((option) => (
                      <ListItem>
                        <Button
                          style={{
                            width: '610px',
                            justifyContent: 'flex-start',
                          }}
                          onClick={onEmailSubjectChange}
                          data-subject={option}
                        >
                          {option}
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </div>
              </Popover>
            </div>

            <InfoLabel>Descrption</InfoLabel>

            <RichEditor value={email_desc} setValue={setEmail_desc} />

            <InfoLabel>Notes</InfoLabel>

            <InputFieldNotes
              id="notes"
              {...register('notes')}
            ></InputFieldNotes>
          </GridContainer>
          <GridContainer></GridContainer>
        </MainContainer>

        <MainContainer>
          <GridContainer>
            <HeadingLabel1>Options</HeadingLabel1>
            <Placeholder />
          </GridContainer>
          <GridContainer1></GridContainer1>
          <GridContainer1>
            <InfoLabel style={{ marginLeft: 10 }}>
              Add this case to management report?
            </InfoLabel>
            <input
              type="checkbox"
              id="add_to_report"
              {...register('add_to_report')}
            />
          </GridContainer1>
          <GridContainer1></GridContainer1>
          <GridContainer1>
            <InfoLabel style={{ marginLeft: 10 }}>
              Duplicate this case across other buildings?
            </InfoLabel>
            <input
              type="checkbox"
              id="duplicate_case"
              {...register('duplicate_case')}
            />
          </GridContainer1>
          <GridContainer>
            <HeadingLabel></HeadingLabel>
            <Placeholder />
          </GridContainer>
        </MainContainer>
        <MainContainer>
          <div>
            <BlueLine />
          </div>

          <div></div>
        </MainContainer>

        <MainContainer>
          <GridContainer>
            <HeadingLabel1>Logs</HeadingLabel1>
            <Placeholder />
          </GridContainer>
          <GridContainer>
            <HeadingLabel></HeadingLabel>
            <Placeholder />
          </GridContainer>
        </MainContainer>
        <MainContainer>
          <div>
            <BlueLine />
          </div>

          <div></div>
        </MainContainer>
        <MainContainer>
          <GridContainer>
            <InfoLabel>Jobs logged by</InfoLabel>
            <InputField
              id="logged_by"
              {...register('logged_by')}
              value={'demo manager'}
            ></InputField>
          </GridContainer>
          <GridContainer1></GridContainer1>
        </MainContainer>

        <MainContainer>
          <GridContainer>
            <HeadingLabel1>Email</HeadingLabel1>
            <Placeholder />
          </GridContainer>
          <GridContainer>
            <HeadingLabel></HeadingLabel>
            <Placeholder />
          </GridContainer>
        </MainContainer>
        <MainContainer>
          <div>
            <BlueLine />
          </div>

          <div></div>
        </MainContainer>
        <MainContainer>
          <GridContainer1>
            <InfoLabel style={{ marginLeft: 10 }}>
              Send email to the following contractors?:
            </InfoLabel>
          </GridContainer1>
        </MainContainer>

        <MainContainer>
          <GridContainer></GridContainer>
          <ButtonsContainer>
            <StyledDiv
              background={'000'}
              color={'fff'}
              onClick={handleSubmit(onCancel)}
            >
              Cancel
            </StyledDiv>

            <StyledDiv
              background={'d84937'}
              color={'fff'}
              disabled={
                assignedTo.length === 0 ||
                (jobArea !== 'common-not-asset' && asset.length === 0)
              }
              onClick={handleSubmit(onSubmit)}
            >
              Save
            </StyledDiv>

            <StyledDiv
              background={'d84937'}
              color={'fff'}
              disabled={
                assignedTo.length === 0 ||
                (jobArea !== 'common-not-asset' && asset.length === 0)
              }
              onClick={handleSubmit(onAddAndReset)}
            >
              Save and Add New
            </StyledDiv>
          </ButtonsContainer>
        </MainContainer>
        <BlueHeader />
      </MainWrapper>
    </div>
  )
}

export default Create
