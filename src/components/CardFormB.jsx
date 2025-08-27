import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { TextField, Button, CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme();

const validationSchema = yup.object({
  cardholderName: yup.string().required('El nombre del titular es necesario'),
  cardNumber: yup.string()
    .matches(/^\d{16}$/, 'El número de tarjeta debe tener 16 dígitos y ser numérico')
    .required('El número de tarjeta es obligatorio'),
  expiryDate: yup.date().min(new Date(), 'La tarjeta está expirada').required('La fecha de expiración es necesaria'),
  cvc: yup.string().matches(/^\d{3}$/, 'El CVC debe tener 3 dígitos').required('El CVC es obligatorio'),
});

const CardFormB = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Formik
      initialValues={{
        cardholderName: '',
        cardNumber: '',
        expiryDate: '',
        cvc: ''
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, isValid, validateForm }) => {
        validateForm().then(errors => {
          if (Object.keys(errors).length) {
            alert('Por favor, corrija los errores antes de enviar.');
          } else {
            alert(JSON.stringify(values, null, 2));
            // Aquí se enviarían los datos a un backend
          }
          setSubmitting(false);
        });
      }}
    >
      <Form>
        <Field
          as={TextField}
          name="cardholderName"
          type="text"
          label="Nombre del Titular"
          fullWidth
          margin="normal"
        />
        <ErrorMessage name="cardholderName" component="div" />

        <Field
          as={TextField}
          name="cardNumber"
          type="text"
          label="Número de Tarjeta"
          fullWidth
          margin="normal"
        />
        <ErrorMessage name="cardNumber" component="div" />

        <Field
          as={TextField}
          name="expiryDate"
          type="text"
          label="Fecha de Expiración (MM/AA)"
          fullWidth
          margin="normal"
        />
        <ErrorMessage name="expiryDate" component="div" />

        <Field
          as={TextField}
          name="cvc"
          type="text"
          label="CVC"
          fullWidth
          margin="normal"
        />
        <ErrorMessage name="cvc" component="div" />

        <Button type="submit" color="primary" variant="contained">
          Enviar
        </Button>
      </Form>
    </Formik>
  </ThemeProvider>
);

export default CardFormB;
