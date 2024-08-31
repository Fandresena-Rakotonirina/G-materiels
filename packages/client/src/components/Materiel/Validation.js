import * as Yup from 'yup'

// formik validation
export const INITIAL_FORM_STATE1 = { serie: ' ', nombre: '' }
export const INITIAL_FORM_STATE = { serie: '', detailId: '' }
export const FORM_VALIDATION = Yup.object().shape({
  serie: Yup.string()
    .min(3, 'Trois (03) caractères minimum')
    .required('Le serie du materiel est vide'),
  detailId: Yup.string()
    .min(3, 'Trois (03) caractères minimum')
    .required('Le type du materiel est vide')
})
export const FORM_VALIDATION1 = Yup.object().shape({
  serie: Yup.string()
    .min(3, 'Trois (03) caractères minimum')
    .required('Le serie du materiel est vide '),
  nombre: Yup.string()
    .required('Le nombre du materiel est vide '),
  userId: Yup.string()
    .required('L"utilisateur est vide')
})

// formik validation
export const RENDRE_OCCUPER_INITIAL_FORM_STATE = { userId: '' }
export const RENDRE_OCCUPER_FORM_VALIDATION = Yup.object().shape({
  userId: Yup.string().required('Le utilisateur est vide')
})

// formik validation
export const RENDRE_EN_PANNE_INITIAL_FORM_STATE = { technicienId: '' }
export const RENDRE_EN_PANNE_FORM_VALIDATION = Yup.object().shape({
  technicienId: Yup.string().required('Le technicien est vide'),
  serie: Yup.string()
    .min(3, 'Trois (03) caractères minimum')
    .required('Le serie du materiel est vide'),
})
