import { useQuery } from '@apollo/client'
import useTitle from '../../hooks/useTitle'
import { LOAD_MATERIELS , LOAD_DETAILS} from '../../GraphQL/Queries'
import Add from '../../components/Materiel/Add'
import MaterielList from '../../components/Materiel/MaterielList'
import MaterielListHome from '../../components/Materiel/MaterielListHome'
import { Tab, Tabs } from '@material-ui/core'
import TabPanel from '../../components/TabPanel'
import { useState } from 'react'
import Layout from '../../components/Layout'
import Backdrop from '../../components/Backdrop'

function Materiel() {
   useTitle('Materiels')
   const { error: error1, loading: loading1, data: data1 } = useQuery(LOAD_MATERIELS);
   const { error: error2, loading: loading2, data: data2 } = useQuery(LOAD_DETAILS);

   const [value, setValue] = useState(0)

   const handleChange = (event, newValue) => {
      setValue(newValue)
   }
   const navigateToTab = (index) => {
      setValue(index);
   };
   return (
      <Layout>
         <div
            style={{
               paddingTop: 24,
               position: 'relative',
               height: 'inherit'
            }}
         >
            <Tabs
               value={value}
               onChange={handleChange}
               variant="scrollable"
               scrollButtons="auto"
               aria-label="materiels tabs"
               style={{
                  position: 'sticky',
                  top: 12,
                  zIndex: 1,
                  backgroundColor: '#f1f1f1'
               }}
            >
               <Tab label="Materiel Libre" />
               <Tab label="Materiel Occuper" />
               <Tab label="Materiel en panne" />
            </Tabs>
            <TabPanel value={value} index={0}>
               <div
                  style={{
                     display: 'flex',
                     gap: 8,
                     padding: '24px 0',
                     flexWrap: 'wrap'
                  }}
               >
                  {loading2 ? (
                     <Backdrop loading={loading2} />
                  ) : error2 ? (
                     <p>An error occured</p>
                  ) : (
                     <>
                        <MaterielListHome details={data2.details} navigateToTab={navigateToTab} />
                        {/* <Add /> */}
                     </>
                  )}
               </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
               <div
                  style={{
                     display: 'flex',
                     gap: 8,
                     padding: '24px 0',
                     flexWrap: 'wrap'
                  }}
               >
                  {loading1 ? (
                     <Backdrop loading={loading1} />
                  ) : error1 ? (
                     <p>An error occured</p>
                  ) : (
                     <>
                        <MaterielList materiels={data1.materiels} isLibre={false} navigateToTab={navigateToTab}/>
                     </>
                  )}
               </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
               <div
                  style={{
                     display: 'flex',
                     gap: 8,
                     padding: '24px 0',
                     flexWrap: 'wrap'
                  }}
               >
                  {loading1 ? (
                     <Backdrop loading={loading1} />
                  ) : error1 ? (
                     <p>An error occured</p>
                  ) : (
                     <>
                        <MaterielList materiels={data1.materiels} isEnPanne={true} />
                     </>
                  )}
               </div>
            </TabPanel>
         </div>
      </Layout>
   )
}

export default Materiel
