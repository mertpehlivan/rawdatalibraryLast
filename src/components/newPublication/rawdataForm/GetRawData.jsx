import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Chip, Divider, Grid, Stack, TextField, Typography, Checkbox } from '@mui/material';
import { AddAPhoto, AddBox, AdsClick, AdsClickOutlined, ArrowDownward, ArrowUpward, CheckBox, Delete, Edit, RawOnRounded, Save } from '@mui/icons-material';
import { useNewPublicationContext } from '../../../context/NewPublicationProvider';
import { useSpring, animated } from 'react-spring';
import CreateRawData from './CreateRawData'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  transition: theme.transitions.create(['opacity', 'box-shadow'], {
    duration: theme.transitions.duration.standard,
  }),
  '&.moving': {
    opacity: 0.8,
    boxShadow: theme.shadows[4],
  },
}));

const AnimatedTableRow = animated(StyledTableRow);

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function GetRawData({ onlyShow = false, order }) {
  const { folders, setFolders, moveRawDataDown, moveRawDataUp, removeRawData, editRawDataMode, setEditRawDataMode, updateRawData, toggleRawDataEditMode } = useNewPublicationContext();
  const [rawDatas, setRawDatas] = React.useState(folders[order]?.rawDatas || []);
  const [movingRow, setMovingRow] = React.useState(null);

  const isEmptyRawData = (rawData) => {
    return (rawData.name === "" ||
      rawData.previewImage == null ||
      rawData.rawdata == null ||
      rawData.price_suggestion == null)
  }

  React.useEffect(() => {
    if (folders[order]) {
      if (folders[order].rawDatas) {
        const hasEmptyRawData = folders[order].rawDatas.some(rawData =>
          rawData.isEditing == true
        );
        setEditRawDataMode(hasEmptyRawData);
      } else {
        setEditRawDataMode(false);
      }
      setRawDatas(folders[order]?.rawDatas || []);
    }
  }, [folders, order]);

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      setFolders(prevFolders => {
        const updatedFolders = [...prevFolders];
        const folder = updatedFolders[order];
        if (folder) {
          const updatedRawDatas = [...folder.rawDatas];
          updatedRawDatas[index] = {
            ...updatedRawDatas[index],
            [event.target.name]: file,
          };
          updatedFolders[order] = {
            ...folder,
            rawDatas: updatedRawDatas,
          };
          return updatedFolders;
        }
        return prevFolders;
      });
    }
  };

  const removeFile = (event, index) => {
    setFolders(prevFolders => {
      const updatedFolders = [...prevFolders];
      const folder = updatedFolders[order];
      if (folder) {
        const updatedRawDatas = [...folder.rawDatas];
        updatedRawDatas[index] = {
          ...updatedRawDatas[index],
          [event.target.name]: null,
        };
        updatedFolders[order] = {
          ...folder,
          rawDatas: updatedRawDatas,
        };
        return updatedFolders;
      }
      return prevFolders;
    });
  };

  const handleDownload = (event, row) => {
    const name = event.target.getAttribute('name');
    const file = row[name];
    if (file) {
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const handleUp = (index) => {
    if (index > 0) {
      setMovingRow(index);
      setTimeout(() => {
        moveRawDataUp(order, index);
        setMovingRow(null);
      }, 500);
    }
  };

  const handleDown = (index) => {
    if (index < rawDatas.length - 1) {
      setMovingRow(index);
      setTimeout(() => {
        moveRawDataDown(order, index);
        setMovingRow(null);
      }, 500);
    }
  };

  const handleFieldChange = (index, field) => (event) => {
    const newValue = event.target.value;
    const updatedRawData = { ...rawDatas[index], [field]: newValue };
    updateRawData(order, index, updatedRawData);
  };

  const handleCheckboxChange = (index) => (event) => {
    const isFree = event.target.checked;
    const updatedRawData = { ...rawDatas[index], isFree, price_suggestion: isFree ? 0 : rawDatas[index].price_suggestion };
    updateRawData(order, index, updatedRawData);
  };

  const springs = useSpring({
    from: { transform: 'translate3d(0px,0,0)', opacity: 1 },
    to: { transform: `translate3d(${movingRow ? '0px' : '0px'},0,0)`, opacity: movingRow ? 0.5 : 1 },
    config: { tension: 200, friction: 20 },
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead sx={{ position: "sticky" }}>
          <TableRow>
            <StyledTableCell align="center">Order</StyledTableCell>
            <StyledTableCell align="center">Specimen Name</StyledTableCell>
            <StyledTableCell align="center">Raw Data File</StyledTableCell>
            <StyledTableCell align="center">Preview Image</StyledTableCell>
            <StyledTableCell align="center">Comment (Optional)</StyledTableCell>
            <StyledTableCell align="center">Price Suggestion</StyledTableCell>
            {!onlyShow && <StyledTableCell align="center">Settings</StyledTableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {rawDatas.map((row, index) => (
            <AnimatedTableRow
              key={row.order}
              style={springs}
              className={movingRow === index ? 'moving' : ''}
            >
              <StyledTableCell component="th" scope="row">
                <Stack direction="row" alignItems="center">
                  <Chip label={index} />
                  {!onlyShow && <Stack>
                    <Button disabled={index === 0} size='small' onClick={() => handleUp(index)}>
                      <ArrowUpward />
                    </Button>
                    <Button disabled={index === rawDatas.length - 1} size='small' onClick={() => handleDown(index)}>
                      <ArrowDownward />
                    </Button>
                  </Stack>}
                </Stack>
              </StyledTableCell>
              {row.isEditing ? <>
                <StyledTableCell component="th" scope="row">
                  <TextField
                    label="Specimen Name"
                    value={row.name}
                    size='small'
                    onChange={handleFieldChange(index, 'name')}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Stack spacing={1}>
                    {row.rawdata == null ?
                      <Button
                        size='small'
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<AddBox />}
                      >
                        Upload Raw Data File
                        <VisuallyHiddenInput
                          name='rawdata'
                          type="file"
                          onChange={(e) => handleFileChange(e, index)}
                        />
                      </Button> :
                      <Typography
                        name='rawdata'
                        variant="body2"
                        onClick={(e) => handleDownload(e, row)}
                        style={{ cursor: 'pointer', color: 'blue' }}
                      >
                        {row.rawdata.name}
                      </Typography>}
                    {!onlyShow && row.rawdata != null && <Button
                      name='rawdata'
                      size='small'
                      color='error'
                      variant="outlined"
                      onClick={(e) => removeFile(e, index)}
                    >
                      <Delete />
                    </Button>}
                  </Stack>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Stack spacing={1}>
                    {row.previewImage == null ?
                      <Button
                        size='small'
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<AddAPhoto />}
                      >
                        Upload Preview Image
                        <VisuallyHiddenInput
                          name='previewImage'
                          type="file"
                          onChange={(e) => handleFileChange(e, index)}
                        />
                      </Button> :
                      <Typography
                        name='previewImage'
                        variant="body2"
                        onClick={(e) => handleDownload(e, row)}
                        style={{ cursor: 'pointer', color: 'blue' }}
                      >
                        {row.previewImage.name}
                      </Typography>}
                    {!onlyShow && row.previewImage != null && <Button
                      name='previewImage'
                      size='small'
                      color='error'
                      variant="outlined"
                      onClick={(e) => removeFile(e, index)}
                    >
                      <Delete />
                    </Button>}
                  </Stack>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    fullWidth
                    sx={{ minWidth: 200, maxWidth: 200 }}
                    label="Comment (Optional)"
                    size='small'
                    multiline
                    rows={3}
                    value={row.comment || ''}
                    onChange={handleFieldChange(index, 'comment')}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Stack>
                    <TextField
                      fullWidth
                      label="Price Suggestion"
                      size='small'
                      type='number'
                      value={row.isFree ? 0 : (row.price_suggestion || '')}
                      onChange={handleFieldChange(index, 'price_suggestion')}
                      disabled={row.isFree}
                    />
                    <Stack direction="row" alignItems="center">
                      <Checkbox
                        checked={row.isFree}
                        onChange={handleCheckboxChange(index)}
                        sx={{ color: "primary.main" }}
                      />
                      <Typography variant='body2'>Free raw data</Typography>
                    </Stack>
                  </Stack>
                </StyledTableCell>
              </>
                :  // not editing
                <>
                  <StyledTableCell component="th" scope="row">
                    <Typography>
                      {row.name}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography
                      name='rawdata'
                      variant="body2"
                      onClick={(e) => handleDownload(e, row)}
                      style={{ cursor: 'pointer', color: 'blue' }}
                    >
                      {row.rawdata.name} (Click view) <AdsClickOutlined />
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography
                      name='previewImage'
                      variant="body2"
                      onClick={(e) => handleDownload(e, row)}
                      style={{ cursor: 'pointer', color: 'blue' }}
                    >
                      {row.previewImage.name} (Click view) <AdsClickOutlined />
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography>{row.comment || ''}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Typography>{row.price_suggestion || 'Free'}</Typography>
                  </StyledTableCell>
                </>}
              {!onlyShow && <StyledTableCell align="center">
                <Grid container>
                  <Grid item xs={12} md={12} lg={6} xl={6}>
                    {row.isEditing ?
                      <Button
                        disabled={row.name === "" || row.previewImage == null || row.rawdata == null || row.price_suggestion == null}
                        onClick={() => toggleRawDataEditMode(order, index)} startIcon={<Save />}></Button>
                      :
                      <Button disabled={editRawDataMode} onClick={() => toggleRawDataEditMode(order, index)} startIcon={<Edit />}></Button>}
                    <Divider />
                    <Button color='error' onClick={() => removeRawData(order, index)} startIcon={<Delete />}></Button>
                  </Grid>
                </Grid>
              </StyledTableCell>}
            </AnimatedTableRow>
          ))}
        </TableBody>
      </Table>
      {!onlyShow && <Paper elevation={5}>
        <Stack p={1}>
          <CreateRawData order={order} />
        </Stack>
      </Paper>}
    </TableContainer>
  );
}
