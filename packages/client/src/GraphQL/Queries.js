import { gql } from '@apollo/client';

export const LOAD_USERS = gql`
  {
    users {
      id
      nom
      prenom
      fonction
      email
      password
      level
      materiels {
        id
        serie
        nombre
        detail {
          id
          type
          marque
          total
        }
      }
    }
  }
`;

export const LOAD_MATERIELS = gql`
  {
    materiels {
      id
      serie
      nombre
      status
      detail {
        type
        marque
        total
      }
      user {
        id
        nom
        prenom
      }
      technicien {
        id
        nom
        prenom
        contact
      }
    }
  }
`;

export const LOAD_DETAILS = gql`
  {
    details {
      id
      type
      marque
      total
      materiels {
        id
        serie
        nombre
        detail {
          id
          type
          marque
          total
        }
        user {
          id
          nom
          prenom
        }
        technicien {
          id
          nom
          prenom
          contact
        }
      }
    }
  }
`;

export const LOAD_TECHNICIENS = gql`
  {
    techniciens {
      id
      nom
      prenom
      contact
      maintenances {
        id
        serie
        nombre
        detail {
          id
          type
          marque
        }
      }
    }
  }
`;

export const COMPTER_MATERIEL_PAR_STATUS = gql`
   query CountOccupiedAndBrokenMaterielsByDetail($detailId: ID!) {
      materielOccuper: materiels(
         where: { status: "en marche", userId: { _is_null: false }, detailId: $detailId }
      ) {
         totalCount
      }
      materielEnPanne: materiels(
         where: { status: "en panne", technicienId: { _is_null: false }, detailId: $detailId }
      ) {
         totalCount
      }
   }
`;
