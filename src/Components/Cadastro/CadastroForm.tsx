import React, { useState, ChangeEvent, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import api from '../../Services/api';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
// import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    marginBottom: 30,
    margin: '0 auto',
    padding: 20,
    marginTop: 50,
  },
  colorTitle: {
    color: '#26a69a',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(6, 0, 2),
  },
}));

interface IConsulta {
  nome: string;
  descricao: string;
  especialidade: string;
  inicioConsulta: string;
  fimConsulta: string;
}
interface IParamsProps {
  id: string;
}

const CadastroForm: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams<IParamsProps>();

  useEffect(() => {
    console.log(id);

    if (id !== undefined) {
      findConsulta(id);
    }
  }, [id]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [model, setModel] = useState<IConsulta>({
    nome: '',
    descricao: '',
    especialidade: '',
    inicioConsulta: '',
    fimConsulta: '',
  });

  function updateModel(e: ChangeEvent<HTMLInputElement>) {
    setModel({
      ...model,
      [e.target.name]: e.target.value,
    });
  }
  function back() {
    history.goBack();
  }

  async function findConsulta(id: string) {
    const response = await api.get(`Consultas/id/${id}`);
    console.log(response);

    setModel({
      nome: response.data.nome,
      descricao: response.data.descricao,
      especialidade: response.data.especialidade,
      fimConsulta: response.data.fimConsulta,
      inicioConsulta: response.data.inicioConsulta,
    });
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id !== undefined) {
      const response = await api.put('/Consultas', model);
    } else {
      const response = await api.post('/Consultas', model);
    }

    back();
  }

  // function formatDate(date: Date) {
  //   return moment(date).format('HH:mm[hs]');
  // }

  return (
    <Container component='main' maxWidth='xs'>
      <Paper elevation={3} className={classes.root}>
        <div className={classes.paper}>
          <Typography
            component='h1'
            variant='h2'
            className={classes.colorTitle}
          >
            Cadastro
          </Typography>
          <form className={classes.form} noValidate onSubmit={onSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField
                  name='nome'
                  value={model.nome}
                  variant='outlined'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateModel(e)
                  }
                  required
                  fullWidth
                  label='Nome'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateModel(e)
                  }
                  required
                  fullWidth
                  label='Especialidade'
                  name='especialidade'
                  value={model.especialidade}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='time'
                  label='Início'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateModel(e)
                  }
                  name='inicioConsulta'
                  type='text'
                  value={model.inicioConsulta}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='time'
                  label='Fim'
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateModel(e)
                  }
                  name='fimConsulta'
                  type='text'
                  value={model.fimConsulta}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    updateModel(e)
                  }
                  name='descricao'
                  value={model.descricao}
                  label='Descrição'
                  type='text'
                  multiline
                  rows='3'
                />
              </Grid>
            </Grid>

            <Grid container justify='space-around'>
              <Grid item>
                <Button
                  type='submit'
                  size='large'
                  variant='contained'
                  color='secondary'
                  className={classes.submit}
                  onClick={handleClickOpen}
                >
                  Cancelar
                </Button>
              </Grid>
              <Grid item>
                <Button
                  type='submit'
                  size='large'
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                >
                  Salvar
                </Button>
              </Grid>
            </Grid>
          </form>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
          >
            <DialogTitle id='alert-dialog-title'>
              {'Deseja cancelar a consulta?'}
            </DialogTitle>

            <DialogActions>
              <Button onClick={handleClose} color='secondary' autoFocus>
                Não
              </Button>
              <Button onClick={back} color='primary' autoFocus>
                Sim
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Paper>
    </Container>
  );
};

export default CadastroForm;
