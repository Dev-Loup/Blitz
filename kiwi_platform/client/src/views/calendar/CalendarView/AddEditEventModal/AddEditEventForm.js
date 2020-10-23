import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import {
  Box,
  Typography,
  TextField,
  // TextBox,
  Button,
  IconButton,
  Divider,
  // FormControlLabel,
  FormHelperText,
  // Switch,
  SvgIcon,
  makeStyles,
  Checkbox,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import { Trash as TrashIcon } from 'react-feather';
import wait from 'src/utils/wait';
import axios from 'src/utils/axios';
const useStyles = makeStyles((theme) => ({
  root: {},
  confirmButton: {
    marginLeft: theme.spacing(2)
  }
}));

function AddEditEventForm({
  event,
  mode,
  onAdd,
  onCancel,
  onDelete,
  onEdit
}) {
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useSelector((state) => state.account);

  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };


  return (
    <Formik
      initialValues={{
        // allDay: event.allDay || false,
        color: event.color || '',
        limit: event.limit || '',
        end: event.end || moment(),
        start: event.start || 852076800000,
        title: event.title || '',
        id: event._id || null,
      }}
      validationSchema={Yup.object().shape({
        // allDay: Yup.bool(),
        // description: Yup.string().max(5000),
        // end: Yup.date()
        //   .when(
        //     'start',
        //     (start, schema) => (start && schema.min(start, 'End date must be later than start date')),
        //   ),
        // start: Yup.date(),
        // title: Yup.string().max(255).required('Title is required')
        limit: Yup.string().max(3),
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          const data = {
            ...values
          };
          console.log(data);
          // Make API request depending on mode type
          // If editting an event, here should make a patch request
          // else a post request
          await wait(200);

          // On post request server should return an ID
          const token = 'Bearer ' + window.localStorage.getItem('accessToken');
          if (mode === 'add') {
            const date_S = new Date(data.start);
            const date_E = new Date(data.end);
            console.log(data.start);
            data.start = date_S.getTime();
            data.end = date_E.getTime();
            console.log(data.limit)
            axios.post(`${process.env.REACT_APP_LOCALHOST}/calendar/events`, data, { headers: { accessToken: token } })
              .then(function (success) {
                if (success.status === 200 || 201) {
                  console.log(success)
                  enqueueSnackbar('Save Success', {
                                  variant: 'success'
                    });
                }
              })
              .catch(function (error) {
                if (error.response) {
                  enqueueSnackbar(`Can't do this, ${user.username}!`, {
                                  variant: 'error'
                    });
                }
              });
          } else {
            console.log(data.start);
            axios.patch(`${process.env.REACT_APP_LOCALHOST}/calendar/events`, data, {headers: {accessToken: token}})
              .then(function (success) {
                if (success.status === 200 || 201) {
                  console.log(success)
                  enqueueSnackbar('Save Success', {
                                  variant: 'success'
                    });
                }
              })
              .catch(function (error) {
                if (error.response) {
                  enqueueSnackbar(`Can't do this, ${user.username}!`, {
                                  variant: 'error'
                    });
                }
              });
          }


          resetForm();
          setStatus({ success: true });
          setSubmitting(false);

          if (mode === 'add') {
            onAdd(data);
          } else {
            onEdit(data);
          }
        } catch (error) {
          setStatus({ success: false });
          setErrors({ submit: error.message });
          setSubmitting(false);
          enqueueSnackbar('Can\'t save nothing', {
            variant: 'error'
          });
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldTouched,
        setFieldValue,
        touched,
        values
      }) => (
        <form onSubmit={handleSubmit}>
          <Box p={3}>
            <Typography
              align="center"
              gutterBottom
              variant="h3"
              color="textPrimary"
            >
              {mode === 'add' ? 'Add socket :V' : 'Edit socket :D'}
            </Typography>
          </Box>
          <Box p={3}>
              {/* <TextField
              error={Boolean(touched.title && errors.title)}
              fullWidth
              helperText={touched.title && errors.title}
              label="Title"
              name="title"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.title}
              variant="outlined"
            /> */}
            <Box mt={2}>
              <TextField
                error={Boolean(touched.limit && errors.limit)}
                fullWidth
                helperText={touched.limit && errors.limit}
                label="Limit"
                name="limit"
                onBlur={handleBlur}
                onChange={handleChange}
                // value={values.limit}
                variant="outlined"
              />
            </Box>
            <Box mt={2}>
              {/* <FormControlLabel
                control={(
                  <Switch
                    checked={values.allDay}
                    name="allDay"
                    onChange={handleChange}
                  />
                )}
                label="All day"
              /> */}
            </Box>
            <Box mt={2}>
              <DateTimePicker
                fullWidth
                inputVariant="outlined"
                label="Socket Start"
                name="start"
                onClick={() => setFieldTouched('end')}
                onChange={(date) => setFieldValue('start', date)}
                value={values.start}
                minutesStep={60}
                disablePast= 'false'
              />
            </Box>
            <Box mt={2}>
              <List dense className={classes.root}>
                {[0, 1, 2, 3].map((value) => {
                  const labelId = `checkbox-list-secondary-label-${value}`;
                  return (
                    <ListItem key={value} button>
                      <ListItemAvatar>
                        <Avatar
                          className={classes.avatar}
                          src={user.avatar}
                        />
                      </ListItemAvatar>
                      <ListItemText id={labelId} primary={`${user.username} has suscribed`} />
                      <ListItemSecondaryAction>
                        <Checkbox
                          edge="end"
                          onChange={handleToggle(value)}
                          checked={checked.indexOf(value) !== -1}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
                {/* <ListItem key={12} button>
                <ListItemAvatar>
                  <Avatar
                    alt={'Hola'}
                    src={`/static/images/avatars/avatar_12.png`}
                  />
                </ListItemAvatar>
                <ListItemText id={123} primary={`hola`} />
              </ListItem> */}
                {/* <DateTimePicker
                fullWidth
                inputVariant="outlined"
                label="End date"
                name="end"
                onClick={() => setFieldTouched('end')}
                onChange={(date) => setFieldValue('end', date)}
                value={values.end}
              /> */}
            </Box>
            {Boolean(touched.end && errors.end) && (
              <Box mt={2}>
                <FormHelperText error>
                  {errors.end}
                </FormHelperText>
              </Box>
            )}
          </Box>
          <Divider />
          <Box
            p={2}
            display="flex"
            alignItems="center"
          >
            {mode === 'edit' && (
              <IconButton onClick={() => onDelete(event._id)}>
                <SvgIcon>
                  <TrashIcon />
                </SvgIcon>
              </IconButton>
            )}
            <Box flexGrow={1} />
            <Button onClick={onCancel}>
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              color="secondary"
              className={classes.confirmButton}
            >
              Confirm
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

AddEditEventForm.propTypes = {
  event: PropTypes.object,
  mode: PropTypes.oneOf(['add', 'edit']).isRequired,
  onAdd: PropTypes.func,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func
};

AddEditEventForm.defaultProps = {
  event: {},
  onAdd: () => {},
  onCancel: () => {},
  onDelete: () => {},
  onEdit: () => {}
};

export default AddEditEventForm;
