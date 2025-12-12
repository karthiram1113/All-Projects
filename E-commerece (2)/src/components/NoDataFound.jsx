function NoDataFounded() {
  return (
      <div
          className="d-flex flex-column justify-content-center align-items-center"
      >
          <img

              src="/assets/images/nodata.jpg"
              alt="nodata"
              style={{ objectFit: 'contain', height: "150px" }} // optional: keeps image aspect ratio
          />
          <h4 style={{ textAlign: "center"}}>
              NO DATA FOUND
          </h4>
      </div>
  );
}
export default NoDataFounded;