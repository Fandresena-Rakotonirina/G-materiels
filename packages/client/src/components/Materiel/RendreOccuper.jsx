import { IconButton, Typography, Grid } from '@material-ui/core'
import { PersonAdd } from '@material-ui/icons'
import { useState } from 'react'
import Dialog from '../Dialog'
import { Form as FForm, Formik } from 'formik'
import Button from '../controlles/Button'
import Select from '../controlles/Select'
import {
   RENDRE_OCCUPER_INITIAL_FORM_STATE,
   RENDRE_OCCUPER_FORM_VALIDATION
} from './Validation'
import { ADD_MATERIEL } from '../../GraphQL/Mutations'
import { useMutation, useQuery } from '@apollo/client'
import { createOptionsUser } from '../../utils'
import { LOAD_MATERIELS, LOAD_USERS } from '../../GraphQL/Queries'
import Backdrop from '../Backdrop'

function RendreOccuper({ materiel }) {
   const [isOpen, setIsOpen] = useState(false)
   const handleClick = () => {
      setIsOpen(true)
   }

   const { loading: gettingUser, data: userData } = useQuery(LOAD_USERS)

   const [addMateriel, { loading, error }] = useMutation(
      ADD_MATERIEL
   )

   const handleSubmit = (value, helpers) => {
      addMateriel({
         variables: {
            addMateriel: {
               nom: value.nom,
               userId: value.userId,
               status: 'en marche',
            }
         },
         refetchQueries: [{ query: LOAD_MATERIELS }, { query: LOAD_USERS }]
      })
      setIsOpen(false)
      helpers.resetForm()
   }

   const optionsUser = createOptionsUser(userData?.users)

   if (loading) return <Backdrop loading={loading} />
   if (error) return <p>An error occured</p>

   return (
      <>
         <IconButton onClick={handleClick}>
            <PersonAdd />
         </IconButton>
         <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
            <Typography variant="h6">Donnsvdgdsger {materiel.serie} à :</Typography>
            <Formik
               initialValues={{ ...RENDRE_OCCUPER_INITIAL_FORM_STATE }}
               validationSchema={RENDRE_OCCUPER_FORM_VALIDATION}
               onSubmit={handleSubmit}
            >
               <FForm autoComplete="off">
                  <Grid container spacing={2}>
                     <Grid item xs={12}>
                        <Select
                           required
                           label="utilisateur"
                           name="userId"
                           options={
                              gettingUser
                                 ? [{ id: null, value: 'loading...' }]
                                 : optionsUser
                           }
                           autoFocus
                        />
                     </Grid>
                     <Grid item xs={12} sm={12}>
                        <Button variant="outlined">OHK</Button>
                     </Grid>
                  </Grid>
               </FForm>
            </Formik>
         </Dialog>
      </>
   )
}

export default RendreOccuper
