import {
   CardActions,
   CardContent,
   IconButton,
   Grid,
   Card as MCard,
   Typography
} from '@material-ui/core'
import { useState } from "react";
import { PersonAdd, NotInterested } from '@material-ui/icons'
import { Form as FForm, Formik } from 'formik'
import Button from '../controlles/Button'
import Select from '../controlles/Select'
import TextField from '../controlles/TextField'
import Dialog from "../Dialog";
import Backdrop from '../Backdrop'
import { INITIAL_FORM_STATE1, FORM_VALIDATION1, RENDRE_EN_PANNE_INITIAL_FORM_STATE, RENDRE_EN_PANNE_FORM_VALIDATION } from './Validation'
import { ADD_MATERIEL } from '../../GraphQL/Mutations'
import { useMutation, useQuery } from '@apollo/client'
import { createOptionsUser, createOptionsTechnicien } from '../../utils'
import { LOAD_MATERIELS, LOAD_USERS, LOAD_DETAILS, LOAD_TECHNICIENS } from '../../GraphQL/Queries'

function CardHome({ detail, navigateToTab }) {

   const [isOpen, setIsOpen] = useState(false);
   const [isOpenEnPanne, setIsOpenEnPanne] = useState(false)

   const handleOpenOccuper = () => {
      setIsOpen(true);
   };
   const handleCloseOccuper = () => {
      setIsOpen(false);
   };
   const handleOpenEnPanne = () => {
      setIsOpenEnPanne(true);
   }
   const handleCloseEnPanne = () => {
      setIsOpenEnPanne(false);
   }

   // Naviguer vers un TabPanel
   const handleNavigation = (index) => {
      navigateToTab(index);
   };

   const { loading: gettingUser, data: userData } = useQuery(LOAD_USERS)
   const { loading: gettingTechnicien, data: technicienData } = useQuery(LOAD_TECHNICIENS)

   const [addMateriel, { loading: loadingMateriel, error }] = useMutation(
      ADD_MATERIEL,
      {
         update(cache, { data }) {
            const newMaterielFromResponse = data?.addMateriel
            const existingMateriel = cache.readQuery({ query: LOAD_MATERIELS })
            cache.writeQuery({
               query: LOAD_MATERIELS,
               data: {
                  materiels: [...existingMateriel?.materiels, newMaterielFromResponse]
               }
            })
         }
      }
   )

   const handleSubmit = (value, helpers) => {
      addMateriel({
         variables: {
            addMaterielFields: {
               serie: value.serie,
               nombre: value.nombre,
               detailId: detail.id,
               userId: value.userId
            }
         },
         refetchQueries: [{ query: LOAD_DETAILS }, { query: LOAD_USERS }]
      })
         .then(response => {
            console.log("Réponse après ajout de matériel occupé:", response);
            helpers.resetForm();
            handleCloseOccuper();
            handleNavigation(1);
         })
         .catch(error => {
            console.error("Erreur lors de l'ajout de matériel occupé:", error);
         });
   }

   const handleSubmitEnPanne = (value, helpers) => {
      addMateriel({
         variables: {
            addMaterielFields: {
               serie: value.serie,
               nombre: value.nombre,
               detailId: detail.id,
               technicienId: value.technicienId,
               status: 'en panne',
            }
         },
         refetchQueries: [{ query: LOAD_DETAILS }, { query: LOAD_TECHNICIENS }]
      })
         .then(response => {
            console.log("Réponse après ajout de matériel en panne:", response);
            helpers.resetForm();
            handleCloseEnPanne();
            handleNavigation(2);
         })
         .catch(error => {
            console.error("Erreur lors de l'ajout de matériel en panne:", error);
         });
   }

   const optionsUser = createOptionsUser(userData?.users)
   const optionsTechnicien = createOptionsTechnicien(technicienData?.techniciens)

   const totalMateriels = detail.total; // Utilisation de detail.total pour obtenir le total des matériels d'un type spécifique
   // Calcul de la somme des nombres de matériels en marche
   const materielOccupe = detail.materiels
      .filter(materiel => materiel.user && materiel.user.id)
      .reduce((total, materiel) => total + parseInt(materiel.nombre, 10), 0);
   // Calcul de la somme des nombres de matériels en panne
   const materielEnPanne = detail.materiels
      .filter(materiel => materiel.technicien && materiel.technicien.id)
      .reduce((total, materiel) => total + parseInt(materiel.nombre, 10), 0);

   const materielLibre = totalMateriels - (materielOccupe + materielEnPanne);

   if (loadingMateriel) return <Backdrop loading={gettingUser} />
   if (error) return <p>An error occured {error}</p>

   return (
      <>
         <MCard variant="outlined" style={{ position: 'relative', minWidth: 250 }}>
            <CardContent>
               <Typography variant="h7">{detail.type}</Typography>
               <Typography variant="caption" component="p">
                  Marque: {detail.marque}
               </Typography>
               <Typography variant="caption" component="p">
                  Libre: {materielLibre}
               </Typography>
               <Typography variant="caption" component="p">
                  Occupé: {materielOccupe}
               </Typography>
               <Typography variant="caption" component="p">
                  En panne: {materielEnPanne}
               </Typography>
            </CardContent>
            <CardActions>
               <IconButton
                  aria-label="add Material"
                  onClick={handleOpenOccuper}
               >
                  <PersonAdd />
               </IconButton>
               <IconButton
                  aria-label="Repare materiall"
                  onClick={handleOpenEnPanne}
               >
                  <NotInterested />
               </IconButton>
            </CardActions>
         </MCard>

         {/* Modal pour rendre occuper un materiel */}
         <Dialog isOpen={isOpen} setIsOpen={setIsOpen} >
            <Typography variant="h6">Donner un {detail.type} ({detail.marque}) à :</Typography><br />
            <Formik
               initialValues={{ ...INITIAL_FORM_STATE1 }}
               validationSchema={FORM_VALIDATION1}
               onSubmit={handleSubmit}
            >
               <FForm autoComplete="off">
                  <Grid container spacing={2}>
                     <Grid item xs={6}>
                        <Select
                           required
                           label="utilisateur"
                           name="userId"
                           options={
                              gettingUser
                                 ? [{ id: null, value: 'Loading...' }]
                                 : optionsUser
                           }
                           autoFocus
                        />
                     </Grid>
                     <Grid item xs={6} sm={6}>
                        <TextField required label="Serie du materiel" name="serie" autoFocus />
                     </Grid>
                     <Grid item xs={6} sm={6}>
                        <TextField required label="Nombre" type="number" name="nombre" autoFocus />
                     </Grid>
                     <Grid item xs={12} sm={12}>
                        <Button variant="outlined">OK</Button>
                     </Grid>
                  </Grid>
               </FForm>
            </Formik>
         </Dialog>

         {/* Modal rendre en panne un materiel */}
         <Dialog isOpen={isOpenEnPanne} setIsOpen={setIsOpenEnPanne}>
            <Typography variant="h6">Confier un {detail.type} ({detail.marque}) à :</Typography>
            <Formik
               initialValues={{ ...RENDRE_EN_PANNE_INITIAL_FORM_STATE }}
               validationSchema={RENDRE_EN_PANNE_FORM_VALIDATION}
               onSubmit={handleSubmitEnPanne}
            >
               <FForm autoComplete="off">
                  <Grid container spacing={2}>
                     <Grid item xs={6}>
                        <Select
                           required
                           label="technicien"
                           name="technicienId"
                           options={
                              gettingTechnicien
                                 ? [{ id: null, value: 'Loading...' }]
                                 : optionsTechnicien
                           }
                           autoFocus
                        />
                     </Grid>
                     <Grid item xs={6} sm={6}>
                        <TextField required label="Serie du materiel" name="serie" autoFocus />
                     </Grid>
                     <Grid item xs={6} sm={6}>
                        <TextField required label="Nombre" type="number" name="nombre" autoFocus />
                     </Grid>
                     <Grid item xs={12} sm={12}>
                        <Button variant="outlined">OK</Button>
                     </Grid>
                  </Grid>
               </FForm>
            </Formik>
         </Dialog>
      </>
   )
}

export default CardHome;
