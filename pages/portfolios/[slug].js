const PortfolioDetail = ({query}) => {
  const {slug} = query
  return (
    <h1>I am Detail Page with ID: {slug}</h1>
  );
};

PortfolioDetail.getInitialProps = ({query}) => {
  return {query}
}

  export default PortfolioDetail;