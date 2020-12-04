import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import api from '../../Services/api';
import { Grid, Paper } from '@material-ui/core';
// import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

interface IConsulta {
  id: string;
  nome: string;
  descricao: string;
  especialidade: string;
  inicioConsulta: Date;
  fimConsulta: Date;
}
interface IParamsProps {
  id: string;
}

const useStyles = makeStyles((Theme) => ({
  root: {
    width: 800,
    marginBottom: 30,
    margin: '0 auto',
    padding: 20,
    marginTop: 50,
  },
  cardStyle: {
    width: 500,
    marginBottom: 30,
    margin: '0 auto',
    padding: 20,
  },
  align: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  colorTitle: {
    color: '#26a69a',
    marginLeft: 8,
  },
}));

export default function Consultas() {
  const classes = useStyles();
  const [consultas, setConsultas] = useState<IConsulta[]>([]);
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const { id } = useParams<IParamsProps>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    loadConsultas();
  }, []);

  async function loadConsultas() {
    const response = await api.get('/Consultas');
    setConsultas(response.data);
  }

  function newConsulta() {
    history.push('/cadastro');
  }
  // function formatDate(date: Date) {
  //   return moment(date).format('HH:mm[hs]');
  // }

  async function deleteConsulta(id: string) {
    await api.delete(`/Consultas/id/${id}`);

    setOpen(false);
    loadConsultas();
  }

  function editConsulta(id: string) {
    history.push(`/edit/${id}`);
  }

  return (
    <div>
      <div className={classes.align}>
        <Button variant='contained' color='primary' onClick={newConsulta}>
          Adicionar Novo
        </Button>
      </div>
      <Paper elevation={3} className={classes.root}>
        <Typography
          variant='h2'
          align='center'
          component='div'
          gutterBottom
          className={classes.colorTitle}
        >
          Consultas Agendadas
        </Typography>
        <Grid container direction='column'>
          {consultas.map((consulta) => (
            <Card key={consulta.id} className={classes.cardStyle}>
              <div hidden>{consulta.id}</div>
              <Grid>
                <strong className={classes.colorTitle}>Nome:</strong>{' '}
                {consulta.nome}
                <strong className={classes.colorTitle}>
                  Especialidade:
                </strong>{' '}
                {consulta.especialidade}
                <strong className={classes.colorTitle}>Inicio:</strong>{' '}
                {consulta.inicioConsulta}
                <strong className={classes.colorTitle}>Fim:</strong>{' '}
                {consulta.fimConsulta}
              </Grid>
              <CardContent>
                <div>
                  <strong className={classes.colorTitle}>Descrição:</strong>{' '}
                  {consulta.descricao}
                </div>
              </CardContent>
              <div className={classes.align}>
                <IconButton aria-label='delete' onClick={handleClickOpen}>
                  <DeleteIcon color='error' />
                </IconButton>
                <IconButton
                  aria-label='editar'
                  onClick={() => editConsulta(consulta.id)}
                >
                  <EditIcon className={classes.colorTitle} />
                </IconButton>
              </div>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
              >
                <DialogTitle id='alert-dialog-title'>
                  {'Voce quer deletar essa consulta?'}
                </DialogTitle>

                <DialogActions>
                  <Button onClick={handleClose} color='secondary'>
                    Cancelar
                  </Button>
                  <Button
                    onClick={() => deleteConsulta(consulta.id)}
                    color='primary'
                    autoFocus
                  >
                    Deletar
                  </Button>
                </DialogActions>
              </Dialog>
            </Card>
          ))}
        </Grid>
      </Paper>
    </div>
  );
}
