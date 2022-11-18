const Shortlist = (props) => {
  return (
    <>
      <h1>Shortlisted</h1>
      <p>Total Faves : {props.shortlist.length || 0}</p>
      {props.shortlist?.map(item => <p>{'#' + item.id + ' = ' + item.title}</p>)}
    </>
  )
}

export default Shortlist