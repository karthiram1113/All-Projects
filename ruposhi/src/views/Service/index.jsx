import DefaultLayout from "../../layouts/defaultLayout";
import Title from '../../components/Title'
import ServiceComponent from "../../components/Service-component";

function Service() {
  return (
    <>  
      <Title title="Services | Ruposhi Global">
        <DefaultLayout>
          <ServiceComponent />
        </DefaultLayout>
      </Title>
    </>
  );
}

export default Service;
