import CardHome from './CardHome'

function MaterielListHome({ details ,navigateToTab}) {
   return (
      <>
        {details.map((detail, index) => (
          <CardHome key={index} detail={detail} navigateToTab={navigateToTab} />
        ))}
      </>
    )
}

export default MaterielListHome
