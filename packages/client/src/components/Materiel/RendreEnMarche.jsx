import React from 'react'
import { IconButton } from '@material-ui/core'
import { Check } from '@material-ui/icons'
import Backdrop from '../Backdrop'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useMutation } from '@apollo/client'
import { DELETE_MATERIEL } from '../../GraphQL/Mutations'
import { LOAD_DETAILS, LOAD_MATERIELS } from '../../GraphQL/Queries'

function RendreEnMarche(props) {
   
   const [open, setOpen] = React.useState(false);

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };
   const [deleteMateriel, { loading, error }] = useMutation(DELETE_MATERIEL, {
      update(cache, { data }) {
         // add a new user to the existing array
         const deletedMaterielFromResponse = data?.deleteMateriel
         const existingMateriel = cache.readQuery({ query: LOAD_MATERIELS })
         cache.writeQuery({
            query: LOAD_MATERIELS,
            data: {
               materiels: existingMateriel?.materiels.filter(
                  (materiel) => materiel.id !== deletedMaterielFromResponse
               )
            }
         })
      }
   })

   if (loading) return <Backdrop loading={loading} />

   if (error) return <p>Error occured {error}</p>

   return (
      <>
         <IconButton
            style={props.style}
            onClick={handleClickOpen}
         /* onClick={() =>
            updateMateriel({
               variables: {
                  id: materiel.id,
                  updateMaterielFields: {
                     status: 'en marche',
                     technicienId: null
                  }
               },
               refetchQueries: [
                  { query: LOAD_MATERIELS },
                  { query: LOAD_TECHNICIENS }
               ]
            })
         } */
         >
            <Check />
         </IconButton>
         <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
         ><br /><br />
            <DialogTitle id="alert-dialog-title">{"Voulez-vous rendre en marche ce materiel ? "}</DialogTitle>
            {/* <DialogContent>
            <DialogContentText id="alert-dialog-description">
               Vous voulez bien rendre libre ce materiel ? 
            </DialogContentText>
         </DialogContent> */}
            <DialogActions>
            <  Button
                  variant="outlined"
                  color="primary"
                  onClick={() =>
                     deleteMateriel({
                        variables: {
                           id: props.id
                        },
                        refetchQueries: [{ query: LOAD_DETAILS }]
                     })
                  }
               >
                  OUI
               </Button>
               <Button onClick={handleClose} variant="outlined" color="primary" autoFocus>
                  NON
               </Button>
            </DialogActions>
         </Dialog>
      </>
   )
}

export default RendreEnMarche
